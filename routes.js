import express from 'express';
import crypto from 'crypto';
import { db } from './db.js';
import { generateStructuredChallenge, matchStartupsForChallenge, generateProcurementDecisionPack } from './aiEngine.js';

const router = express.Router();
const sessions = new Map();
const legacyPasswords = {
  'officer@mohua.gov.in': 'officer123',
  'ananya@ecovision.ai': 'startup123',
  'evaluator@iisc.ac.in': 'evaluator123',
  'validator@qci.org.in': 'validator123',
  'admin@startupsetu.gov.in': 'admin123'
};

const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) => ({
  salt,
  hash: crypto.scryptSync(password, salt, 64).toString('hex')
});

const passwordMatches = (password, user) => {
  if (user.passwordHash && user.passwordSalt) {
    const expected = Buffer.from(user.passwordHash, 'hex');
    const actual = crypto.scryptSync(password, user.passwordSalt, 64);
    return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
  }
  return legacyPasswords[user.email?.toLowerCase()] === password;
};

const requireAdmin = (req, res, next) => {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  const session = token && sessions.get(token);
  if (!session || session.role !== 'Admin') {
    return res.status(403).json({ error: 'Administrator authorization is required.' });
  }
  req.admin = session;
  next();
};

// Auth Endpoints
router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  const users = db.get('users');
  let user = users.find(u => typeof u.email === 'string' && u.email.toLowerCase() === email.trim().toLowerCase());
  
  if (!user) {
    return res.status(401).json({ error: 'No account was found for this email address.' });
  }
  if (typeof password !== 'string' || !passwordMatches(password, user)) {
    return res.status(401).json({ error: 'Incorrect password.' });
  }

  db.logAudit(user.name, user.role, 'User Logged In', `Session initialized for ${user.email}`);
  const token = `token_${user.id}_${Date.now()}`;
  sessions.set(token, { id: user.id, email: user.email, role: user.role, name: user.name });
  res.json({ success: true, user, token });
});

router.post('/auth/register', (req, res) => {
  const { name, email, role, organization, designation, password } = req.body;
  if (typeof name !== 'string' || !name.trim() || typeof email !== 'string' || !email.trim() || !role) {
    return res.status(400).json({ error: 'Name, Email, and Role are required for registration.' });
  }
  if (role !== 'Startup') {
    return res.status(403).json({ error: 'Self-registration is available only for startup accounts.' });
  }
  if (typeof password !== 'string' || password.length < 4) {
    return res.status(400).json({ error: 'Password must be at least 4 characters long.' });
  }

  const users = db.get('users');
  const existingUser = users.find(u => typeof u.email === 'string' && u.email.toLowerCase() === email.trim().toLowerCase());

  let user;
  if (existingUser) {
    user = existingUser;
  } else {
    const credentials = hashPassword(password);
    user = db.add('users', {
      name,
      email,
      role,
      organization: organization || 'GovTech Portal User',
      designation: designation || 'Official Delegate',
      passwordHash: credentials.hash,
      passwordSalt: credentials.salt,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      createdAt: new Date().toISOString().substring(0, 10)
    });
  }

  db.logAudit(user.name, user.role, 'User Account Registered', `New user registered with ${user.email} as ${user.role}`);
  res.json({ success: true, user, token: `token_${user.id}_${Date.now()}` });
});

router.post('/admin/users', requireAdmin, (req, res) => {
  const { name, email, role, organization, designation, password } = req.body;
  const managedRoles = ['Government Officer', 'Evaluator', 'Validator'];
  if (!managedRoles.includes(role)) {
    return res.status(400).json({ error: 'Admins can generate Government Officer, Evaluator, or Validator accounts only.' });
  }
  if (![name, email, password].every(value => typeof value === 'string' && value.trim())) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Generated passwords must be at least 8 characters long.' });
  }
  const users = db.get('users');
  if (users.some(user => user.email?.toLowerCase() === email.trim().toLowerCase())) {
    return res.status(409).json({ error: 'An account with this email already exists.' });
  }
  const credentials = hashPassword(password);
  const user = db.add('users', {
    name: name.trim(),
    email: email.trim(),
    role,
    organization: organization?.trim() || 'StartupSetu Government Network',
    designation: designation?.trim() || 'Authorized Delegate',
    passwordHash: credentials.hash,
    passwordSalt: credentials.salt,
    avatar: null,
    createdAt: new Date().toISOString().substring(0, 10),
    provisionedBy: req.admin.email
  });
  db.logAudit(req.admin.name, 'Admin', 'Official Account Generated', `${role} account generated for ${user.email}`);
  res.status(201).json({ success: true, user, temporaryPassword: password });
});

router.get('/auth/me', (req, res) => {
  const users = db.get('users');
  res.json({ user: users[0] });
});

// Challenges Endpoints
router.get('/challenges', (req, res) => {
  const challenges = db.get('challenges');
  res.json(challenges);
});

router.get('/challenges/:id', (req, res) => {
  const challenge = db.getById('challenges', req.params.id);
  if (!challenge) return res.status(404).json({ error: 'Challenge not found' });
  res.json(challenge);
});

router.post('/challenges', (req, res) => {
  const challengeData = req.body;
  const newChallenge = db.add('challenges', {
    ...challengeData,
    status: 'Open for Proposals',
    applicantCount: 0,
    createdAt: new Date().toISOString().substring(0, 10)
  });
  const startups = db.get('startups');
  const matches = matchStartupsForChallenge(newChallenge, startups);
  const startupUsers = db.get('users').filter(user => user.role === 'Startup');
  startupUsers.forEach(user => {
    const match = matches.find(item => item.startupId === user.startupId);
    const notification = {
      type: 'challenge-published',
      recipientEmail: user.email,
      recipientRole: user.role,
      title: 'New government challenge published',
      message: `${newChallenge.title} is now open. Your AI suitability score is ${match?.matchScore || 0}%.`,
      challengeId: newChallenge.id,
      matchScore: match?.matchScore || 0,
      createdAt: new Date().toISOString(),
      read: false
    };
    db.add('notifications', notification);
    db.add('emailOutbox', {
      to: user.email,
      subject: `New StartupSetu challenge: ${newChallenge.title}`,
      body: notification.message,
      status: 'queued',
      createdAt: notification.createdAt
    });
  });

  db.logAudit(
    challengeData.publishedBy || 'Government Officer',
    'Government Officer',
    'Challenge Created & Published',
    `Challenge #${newChallenge.id}: ${newChallenge.title}`
  );

  res.status(201).json(newChallenge);
});

router.get('/notifications', (req, res) => {
  const email = typeof req.query.email === 'string' ? req.query.email.toLowerCase() : '';
  res.json(db.get('notifications').filter(item => !email || item.recipientEmail?.toLowerCase() === email));
});

// AI endpoints
router.post('/ai/generate-challenge', (req, res) => {
  const { problemStatement } = req.body;
  if (typeof problemStatement !== 'string' || !problemStatement.trim()) {
    return res.status(400).json({ error: 'Problem statement is required' });
  }

  const structured = generateStructuredChallenge(problemStatement);
  res.json(structured);
});

router.post('/ai/match-startups', (req, res) => {
  const { challengeId } = req.body;
  const challenge = db.getById('challenges', challengeId);
  const startups = db.get('startups');

  if (!challenge) {
    return res.status(404).json({ error: 'Challenge not found' });
  }

  const matched = matchStartupsForChallenge(challenge, startups);

  db.logAudit(
    'StartupSetu AI Engine',
    'System / AI',
    'AI Startup Matching Executed',
    `Matched ${matched.length} startups for Challenge #${challengeId}`
  );

  res.json({ challenge, matches: matched });
});

// Startups Endpoints
router.get('/startups', (req, res) => {
  const startups = db.get('startups');
  res.json(startups);
});

router.get('/startups/:id', (req, res) => {
  const startup = db.getById('startups', req.params.id);
  if (!startup) return res.status(404).json({ error: 'Startup not found' });
  res.json(startup);
});

// Proposals Endpoints
router.get('/proposals', (req, res) => {
  let proposals = db.get('proposals');
  if (req.query.challengeId) {
    proposals = proposals.filter(p => p.challengeId === req.query.challengeId);
  }
  if (req.query.startupId) {
    proposals = proposals.filter(p => p.startupId === req.query.startupId);
  }
  res.json(proposals);
});

router.post('/proposals', (req, res) => {
  const proposalData = req.body;
  if (!proposalData.challengeId || !proposalData.startupId) {
    return res.status(400).json({ error: 'Challenge and startup are required.' });
  }
  if (!db.getById('challenges', proposalData.challengeId)) {
    return res.status(404).json({ error: 'Challenge not found' });
  }

  const newProposal = db.add('proposals', {
    ...proposalData,
    status: 'Submitted',
    submittedAt: new Date().toISOString().substring(0, 10)
  });

  // Increment applicant count on challenge
  const challenge = db.getById('challenges', proposalData.challengeId);
  if (challenge) {
    db.update('challenges', challenge.id, { applicantCount: (challenge.applicantCount || 0) + 1 });
  }

  db.logAudit(
    proposalData.startupName || 'Startup Founder',
    'Startup',
    'Proposal Submitted',
    `Proposal #${newProposal.id} for Challenge #${proposalData.challengeId}`
  );

  res.status(201).json(newProposal);
});

// Evaluations Endpoints
router.get('/evaluations', (req, res) => {
  const evaluations = db.get('evaluations');
  res.json(evaluations);
});

router.post('/evaluations', (req, res) => {
  const evalData = req.body;
  const newEval = db.add('evaluations', {
    ...evalData,
    submittedAt: new Date().toISOString().substring(0, 10)
  });

  // Update proposal status
  if (evalData.proposalId) {
    db.update('proposals', evalData.proposalId, { status: 'Under Evaluation' });
  }

  db.logAudit(
    evalData.evaluatorName || 'Technical Evaluator',
    'Evaluator',
    'Proposal Evaluated',
    `Evaluation Score: ${evalData.totalScore}/100 for Proposal #${evalData.proposalId}`
  );

  res.status(201).json(newEval);
});

// Pilots Endpoints
router.get('/pilots', (req, res) => {
  const pilots = db.get('pilots');
  res.json(pilots);
});

router.get('/pilots/:id', (req, res) => {
  const pilot = db.getById('pilots', req.params.id);
  if (!pilot) return res.status(404).json({ error: 'Pilot not found' });
  res.json(pilot);
});

router.post('/pilots', (req, res) => {
  const pilotData = req.body;
  const newPilot = db.add('pilots', {
    ...pilotData,
    pilotNumber: `PIL-GOV-${Date.now().toString().slice(-4)}`,
    status: 'Pilot Running',
    currentStageIndex: 0,
    startDate: new Date().toISOString().substring(0, 10)
  });

  db.logAudit(
    pilotData.governmentOfficer || 'Government Officer',
    'Government Officer',
    'Controlled Pilot Approved & Launched',
    `Pilot #${newPilot.pilotNumber} assigned to ${pilotData.startupName}`
  );

  res.status(201).json(newPilot);
});

router.put('/pilots/:id/milestones/:milestoneId', (req, res) => {
  const { id, milestoneId } = req.params;
  const { status, verifiedBy } = req.body;

  const pilot = db.getById('pilots', id);
  if (!pilot) return res.status(404).json({ error: 'Pilot not found' });

  const updatedMilestones = pilot.milestones.map(m => {
    if (m.id === milestoneId) {
      return { ...m, status, verifiedBy, releaseDate: new Date().toISOString().substring(0, 10) };
    }
    return m;
  });
  if (!pilot.milestones.some(m => m.id === milestoneId)) {
    return res.status(404).json({ error: 'Milestone not found' });
  }

  const updatedPilot = db.update('pilots', id, { milestones: updatedMilestones });

  db.logAudit(
    verifiedBy || 'Officer',
    'Government Officer',
    'Pilot Milestone Released',
    `Milestone ${milestoneId} payout authorized for Pilot #${pilot.pilotNumber}`
  );

  res.json(updatedPilot);
});

// KPIs Endpoints
router.get('/kpis', (req, res) => {
  let kpis = db.get('kpis');
  if (req.query.pilotId) {
    kpis = kpis.filter(k => k.pilotId === req.query.pilotId);
  }
  res.json(kpis);
});

// Evidence Endpoints
router.get('/evidence', (req, res) => {
  let evidence = db.get('evidence');
  if (req.query.pilotId) {
    evidence = evidence.filter(e => e.pilotId === req.query.pilotId);
  }
  res.json(evidence);
});

router.post('/evidence', (req, res) => {
  const evidenceData = req.body;
  const newEvidence = db.add('evidence', {
    ...evidenceData,
    uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
    status: 'Pending Review',
    hash: `0x${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`
  });

  db.logAudit(
    evidenceData.uploadedBy || 'User',
    'Startup',
    'Evidence Uploaded to Passport',
    `Evidence #${newEvidence.id}: ${newEvidence.title}`
  );

  res.status(201).json(newEvidence);
});

router.put('/evidence/:id', (req, res) => {
  const { id } = req.params;
  const { status, validatorName, verificationNotes } = req.body;
  const evidence = db.getById('evidence', id);
  if (!evidence) {
    return res.status(404).json({ error: 'Evidence not found' });
  }
  if (!status) {
    return res.status(400).json({ error: 'Evidence status is required.' });
  }

  const updated = db.update('evidence', id, { status, validatorName, verificationNotes });

  db.logAudit(
    validatorName || 'Validator',
    'Validator',
    `Evidence Verification ${status}`,
    `Evidence #${id} status changed to ${status}`
  );

  res.json(updated);
});

// Validations Endpoints
router.get('/validations', (req, res) => {
  const validations = db.get('validations');
  res.json(validations);
});

router.post('/validations', (req, res) => {
  const valData = req.body;
  const newVal = db.add('validations', {
    ...valData,
    signedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
    digitalSignature: `SIG-QCI-${Date.now().toString().slice(-6)}-VAL`
  });

  // Update pilot status
  if (valData.pilotId) {
    db.update('pilots', valData.pilotId, { status: 'Completed Validation', currentStageIndex: 5 });
  }

  db.logAudit(
    valData.validatorName || 'Dr. Meera Nambiar',
    'Validator',
    'Independent Validation Sign-Off Granted',
    `Validation Signed for Pilot #${valData.pilotId}`
  );

  res.status(201).json(newVal);
});

// Decisions Endpoints (Procurement Decision Pack)
router.get('/decisions', (req, res) => {
  const decisions = db.get('scaleDecisions');
  res.json(decisions);
});

router.post('/decisions/generate', (req, res) => {
  const { pilotId } = req.body;
  if (!pilotId) {
    return res.status(400).json({ error: 'Pilot ID is required.' });
  }
  const pilot = db.getById('pilots', pilotId);
  if (!pilot) {
    return res.status(404).json({ error: 'Pilot not found' });
  }
  const kpis = db.get('kpis').filter(k => k.pilotId === pilotId);
  const validations = db.get('validations').filter(v => v.pilotId === pilotId);
  const evidenceList = db.get('evidence').filter(e => e.pilotId === pilotId);

  const pack = generateProcurementDecisionPack(pilot, kpis, validations, evidenceList);

  res.json(pack);
});

router.post('/decisions', (req, res) => {
  const decisionData = req.body;
  const newDecision = db.add('scaleDecisions', {
    ...decisionData,
    decidedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
  });

  // Update pilot if recommended for scale
  if (decisionData.humanOfficerDecision === 'Recommended for Scale') {
    db.update('pilots', decisionData.pilotId, { status: 'Scaled / Recommended' });
    
    // Add to Scale Engine Catalog if not present
    const scaleItems = db.get('scaleEngineItems');
    if (!scaleItems.some(item => item.startupName === decisionData.startupName)) {
      db.add('scaleEngineItems', {
        startupName: decisionData.startupName,
        solutionTitle: decisionData.challengeTitle,
        sector: 'Smart City',
        pilotScore: `${decisionData.overallPilotScore || 92}%`,
        kpiAchievement: decisionData.kpiAchievement || '95%',
        validationStatus: 'Validated ✓',
        riskLevel: 'Low Risk',
        scaleRecommendation: 'Recommended ✓',
        originalDepartment: decisionData.departmentName || 'Government Department',
        adoptableBy: 'All Government Departments & ULBs',
        estimatedDeployTime: '30 Days',
        provenMetrics: `${decisionData.citizenImpact || 'Validated Impact'} | Audit Ready`
      });
    }
  }

  db.logAudit(
    decisionData.decidedBy || 'Government Officer',
    'Government Officer',
    `Procurement Decision Executed: ${decisionData.humanOfficerDecision}`,
    `Decision for Pilot #${decisionData.pilotId} - Status: ${decisionData.humanOfficerDecision}`
  );

  res.status(201).json(newDecision);
});

// Scale Engine Endpoints
router.get('/scale-engine', (req, res) => {
  const items = db.get('scaleEngineItems');
  res.json(items);
});

// Audit Logs Endpoint
router.get('/audit-logs', (req, res) => {
  const logs = db.get('auditLogs');
  res.json(logs);
});

// Admin Stats
router.get('/admin/stats', (req, res) => {
  res.json({
    totalChallenges: db.get('challenges').length,
    totalStartups: db.get('startups').length,
    activePilots: db.get('pilots').filter(p => p.status === 'Pilot Running').length,
    completedPilots: db.get('pilots').filter(p => p.status === 'Completed Validation' || p.status === 'Scaled / Recommended').length,
    scaledSolutions: db.get('scaleEngineItems').length,
    totalProposals: db.get('proposals').length,
    auditEventCount: db.get('auditLogs').length
  });
});

export default router;
