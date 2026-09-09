import React, { useState } from 'react';
import { 
  CheckSquare, 
  SlidersHorizontal, 
  CheckCircle2, 
  Building2, 
  FileText, 
  Sparkles, 
  AlertCircle, 
  Send, 
  Paperclip,
  Award,
  Layers
  ,Search
} from 'lucide-react';

export default function EvaluatorDashboard({ proposals, challenges, onNavigate }) {
  const proposalList = proposals || [
    {
      id: 'prop-1',
      startupName: 'EcoVision AI',
      solutionTitle: 'EcoVision AI TrashCam Telematics Suite',
      budget: '₹ 14,200,000',
      timeline: '6 Months',
      matchScore: 94,
      techScore: 29,
      innovScore: 19,
      costScore: 14,
      scaleScore: 14,
      teamScore: 9,
      planScore: 9
    },
    {
      id: 'prop-2',
      startupName: 'SmartTech Solutions',
      solutionTitle: 'FleetPulse Civic IoT Route Engine',
      budget: '₹ 14,800,000',
      timeline: '6 Months',
      matchScore: 89,
      techScore: 26,
      innovScore: 17,
      costScore: 13,
      scaleScore: 13,
      teamScore: 8,
      planScore: 8
    }
  ];
  const [selectedProposal, setSelectedProposal] = useState(proposalList[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [ministryFilter, setMinistryFilter] = useState('all');

  const [scores, setScores] = useState({
    technicalSolution: 29, // max 30
    innovation: 19,        // max 20
    cost: 14,              // max 15
    scalability: 14,       // max 15
    teamCapability: 9,     // max 10
    pilotPlan: 9          // max 10
  });

  const [evaluatorComments, setEvaluatorComments] = useState(
    'Exceptional proposal with proven computer vision hardware and strong track record in Indore. Dual camera fill verification adds distinct value over plain GPS loggers. Highly recommended for pilot approval.'
  );

  const [submitted, setSubmitted] = useState(false);

  const totalScore = scores.technicalSolution + scores.innovation + scores.cost + scores.scalability + scores.teamCapability + scores.pilotPlan;
  const challengeById = new Map((challenges || []).map(challenge => [challenge.id, challenge]));
  const getChallenge = (proposal) => challengeById.get(proposal.challengeId) || {};
  const sectorOptions = [...new Set(proposalList.map(proposal => getChallenge(proposal).sector || proposal.sector).filter(Boolean))];
  const ministryOptions = [...new Set(proposalList.map(proposal => getChallenge(proposal).departmentName || proposal.ministry).filter(Boolean))];
  const filteredProposals = proposalList.filter(proposal => {
    const challenge = getChallenge(proposal);
    const sector = challenge.sector || proposal.sector || '';
    const ministry = challenge.departmentName || proposal.ministry || '';
    const searchContent = `${proposal.startupName} ${proposal.solutionTitle}`.toLowerCase();
    return (
      searchContent.includes(searchTerm.toLowerCase().trim()) &&
      (sectorFilter === 'all' || sector === sectorFilter) &&
      (ministryFilter === 'all' || ministry === ministryFilter)
    );
  });

  const selectProposal = (proposal) => {
    setSelectedProposal(proposal);
    setScores({
      technicalSolution: proposal.techScore || 28,
      innovation: proposal.innovScore || 18,
      cost: proposal.costScore || 14,
      scalability: proposal.scaleScore || 14,
      teamCapability: proposal.teamScore || 9,
      pilotPlan: proposal.planScore || 9
    });
    setSubmitted(false);
  };

  const handleSubmitEvaluation = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg space-y-2 border border-purple-800/40">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-800/60 text-purple-200 text-xs font-semibold uppercase tracking-wider">
          <CheckSquare className="w-4 h-4 text-purple-300" />
          <span>Technical Evaluation Committee</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Evaluator Scoring & Side-by-Side Comparison</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Independently score proposal submissions across 6 weighted evaluation criteria. Override AI recommendations with explicit human technical justification.
        </p>
      </div>

      {/* OVERRIDE NOTICE */}
      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-purple-900 font-medium">
          <Sparkles className="w-5 h-5 text-purple-600 shrink-0" />
          <span>
            <strong>AI Assist Active:</strong> AI suggests {selectedProposal?.matchScore || 0}/100 for {selectedProposal?.startupName || 'the selected startup'}. Evaluators have full authority to override AI criteria scores.
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-200 text-purple-900 px-2.5 py-1 rounded">
          Human Authority Override
        </span>
      </div>

      {/* SIDE-BY-SIDE COMPARISON CARDS */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-purple-600" />
          Side-by-Side Proposal Comparison
        </h3>
        <div className="gov-card grid gap-3 p-4 md:grid-cols-[minmax(0,1.5fr)_1fr_1fr]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
              placeholder="Search startup or proposal..."
              aria-label="Search startup or proposal"
              className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-xs outline-none focus:ring-2 focus:ring-purple-500"
            />
          </label>
          <select value={sectorFilter} onChange={event => setSectorFilter(event.target.value)} aria-label="Filter by sector" className="rounded-lg border border-slate-300 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-purple-500">
            <option value="all">All sectors</option>
            {sectorOptions.map(sector => <option key={sector} value={sector}>{sector}</option>)}
          </select>
          <select value={ministryFilter} onChange={event => setMinistryFilter(event.target.value)} aria-label="Filter by ministry" className="rounded-lg border border-slate-300 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-purple-500">
            <option value="all">All ministries</option>
            {ministryOptions.map(ministry => <option key={ministry} value={ministry}>{ministry}</option>)}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredProposals.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              onClick={() => selectProposal(p)}
              className={`gov-card w-full p-6 text-left border-2 transition-all space-y-4 ${
                selectedProposal?.id === p.id
                  ? 'border-purple-500 ring-2 ring-purple-200'
                  : 'border-slate-200 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100 uppercase tracking-wider">
                    Candidate #{idx + 1}
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-base mt-1">{p.startupName}</h4>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-lg">
                    {p.matchScore}%
                  </span>
                  <span className="block text-[9px] text-slate-400 font-semibold">AI Match</span>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="font-bold text-slate-800">{p.solutionTitle}</div>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div>Budget: <strong className="text-emerald-700">{p.budget}</strong></div>
                  <div>Timeline: <strong className="text-slate-900">{p.timeline}</strong></div>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                <div className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">Scoring Overview:</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-600 text-[11px]">
                  <span>Tech Solution: <strong>{p.techScore || 28}/30</strong></span>
                  <span>Innovation: <strong>{p.innovScore || 18}/20</strong></span>
                  <span>Cost Compatibility: <strong>{p.costScore || 14}/15</strong></span>
                  <span>Scalability: <strong>{p.scaleScore || 14}/15</strong></span>
                </div>
              </div>
              <div className="text-xs font-bold text-purple-700">
                {selectedProposal?.id === p.id ? 'Selected for evaluation' : 'Click to evaluate this proposal →'}
              </div>
            </button>
          ))}
        </div>
        {!filteredProposals.length && (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-xs text-slate-500">
            No proposals match the current search and filters.
          </div>
        )}
      </div>

      {/* EVALUATION FORM */}
      <form onSubmit={handleSubmitEvaluation} className="gov-card p-6 sm:p-8 space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg">Official Committee Scoring Form</h3>
            <p className="text-xs text-slate-500">
              {selectedProposal
                ? `Evaluating Submission by ${selectedProposal.startupName}`
                : 'Select a proposal above to begin evaluation.'}
            </p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-extrabold text-purple-700">{totalScore} / 100</span>
            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Calculated Total</span>
          </div>
        </div>

        {/* 6 Criteria Sliders */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Tech Solution */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-800">1. Technical Solution (Weight: 30%)</label>
              <span className="font-extrabold text-blue-700 text-sm">{scores.technicalSolution} / 30</span>
            </div>
            <input 
              type="range" min="0" max="30"
              value={scores.technicalSolution}
              onChange={(e) => setScores({ ...scores, technicalSolution: Number(e.target.value) })}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          {/* Innovation */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-800">2. Innovation & IP (Weight: 20%)</label>
              <span className="font-extrabold text-blue-700 text-sm">{scores.innovation} / 20</span>
            </div>
            <input 
              type="range" min="0" max="20"
              value={scores.innovation}
              onChange={(e) => setScores({ ...scores, innovation: Number(e.target.value) })}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          {/* Cost */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-800">3. Cost & ROI Fit (Weight: 15%)</label>
              <span className="font-extrabold text-blue-700 text-sm">{scores.cost} / 15</span>
            </div>
            <input 
              type="range" min="0" max="15"
              value={scores.cost}
              onChange={(e) => setScores({ ...scores, cost: Number(e.target.value) })}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          {/* Scalability */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-800">4. Scalability Potential (Weight: 15%)</label>
              <span className="font-extrabold text-blue-700 text-sm">{scores.scalability} / 15</span>
            </div>
            <input 
              type="range" min="0" max="15"
              value={scores.scalability}
              onChange={(e) => setScores({ ...scores, scalability: Number(e.target.value) })}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          {/* Team Capability */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-800">5. Team Capability (Weight: 10%)</label>
              <span className="font-extrabold text-blue-700 text-sm">{scores.teamCapability} / 10</span>
            </div>
            <input 
              type="range" min="0" max="10"
              value={scores.teamCapability}
              onChange={(e) => setScores({ ...scores, teamCapability: Number(e.target.value) })}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          {/* Pilot Plan */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-800">6. Pilot Methodology Plan (Weight: 10%)</label>
              <span className="font-extrabold text-blue-700 text-sm">{scores.pilotPlan} / 10</span>
            </div>
            <input 
              type="range" min="0" max="10"
              value={scores.pilotPlan}
              onChange={(e) => setScores({ ...scores, pilotPlan: Number(e.target.value) })}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

        </div>

        {/* Evaluator Comments */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">Evaluator Technical Rationale & Comments</label>
          <textarea 
            rows={3}
            value={evaluatorComments}
            onChange={(e) => setEvaluatorComments(e.target.value)}
            placeholder="Add detailed technical remarks justifying score..."
            className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-600 font-medium"
          />
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl text-center text-xs font-bold text-emerald-900 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Evaluation Score ({totalScore}/100) Recorded into Audit Trail Ledger!
          </div>
        ) : (
          <div className="flex justify-end pt-4 border-t border-slate-200">
            <button type="submit" className="gov-btn-primary bg-purple-700 hover:bg-purple-800 text-xs px-6 py-2.5 font-bold shadow-md">
              <Send className="w-4 h-4" /> Submit Committee Evaluation
            </button>
          </div>
        )}

      </form>

    </div>
  );
}
