import React, { useState } from 'react';
import { 
  Users, 
  Building2, 
  FileText, 
  Activity, 
  CheckCircle2, 
  TrendingUp, 
  ShieldAlert, 
  Settings, 
  Search,
  Check,
  X,
  KeyRound,
  Copy,
  ShieldCheck
} from 'lucide-react';

export default function AdminDashboard({ activeTab, startups, users, challenges, pilots, currentUser, onNavigate }) {
  const [startupList, setStartupList] = useState(
    startups || [
      { id: 'st-1', name: 'EcoVision AI', sector: 'Smart City', verified: true, dpiit: 'DPIIT-89412' },
      { id: 'st-2', name: 'SmartTech Solutions', sector: 'IoT', verified: true, dpiit: 'DPIIT-67123' },
      { id: 'st-3', name: 'UrbanSense', sector: 'CleanTech', verified: true, dpiit: 'DPIIT-99214' },
      { id: 'st-4', name: 'WasteX', sector: 'Smart City', verified: true, dpiit: 'DPIIT-41290' }
    ]
  );
  const [accountForm, setAccountForm] = useState({
    name: '',
    email: '',
    role: 'Evaluator',
    organization: '',
    designation: '',
    password: ''
  });
  const [accountMessage, setAccountMessage] = useState('');
  const [generatedAccount, setGeneratedAccount] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleVerify = (id) => {
    setStartupList(startupList.map(s => s.id === id ? { ...s, verified: !s.verified } : s));
  };

  const handleGenerateAccount = async (event) => {
    event.preventDefault();
    setAccountMessage('');
    setGeneratedAccount(null);
    setIsGenerating(true);
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser?.token || ''}`
        },
        body: JSON.stringify(accountForm)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unable to generate account.');
      }
      setGeneratedAccount(data);
      setAccountForm({ name: '', email: '', role: accountForm.role, organization: '', designation: '', password: '' });
    } catch (error) {
      setAccountMessage(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg space-y-2 border border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-blue-300 text-xs font-semibold uppercase tracking-wider">
          <Settings className="w-4 h-4 text-blue-400" />
          <span>National Platform Operations</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">StartupSetu Admin Command Center</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Manage system users, verify DPIIT startup compliance, oversee department allocations, and audit platform security logs.
        </p>
      </div>

      {activeTab === 'admin-users' && <div className="gov-card p-6 space-y-5 border-blue-200">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900">Generate Official Login</h2>
            <p className="text-xs text-slate-500 mt-1">Only administrators can provision accounts for evaluators, government officers, and validators. The credentials are not self-registered.</p>
          </div>
        </div>
        <form onSubmit={handleGenerateAccount} className="grid sm:grid-cols-2 gap-3">
          <input required value={accountForm.name} onChange={e => setAccountForm({ ...accountForm, name: e.target.value })} placeholder="Full name" className="p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg" />
          <input required type="email" value={accountForm.email} onChange={e => setAccountForm({ ...accountForm, email: e.target.value })} placeholder="Official email ID" className="p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg" />
          <select value={accountForm.role} onChange={e => setAccountForm({ ...accountForm, role: e.target.value })} className="p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg">
            <option>Evaluator</option>
            <option>Government Officer</option>
            <option>Validator</option>
          </select>
          <input required type="password" minLength="8" value={accountForm.password} onChange={e => setAccountForm({ ...accountForm, password: e.target.value })} placeholder="Temporary password (8+ characters)" className="p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg" />
          <input value={accountForm.organization} onChange={e => setAccountForm({ ...accountForm, organization: e.target.value })} placeholder="Department / organization" className="p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg" />
          <input value={accountForm.designation} onChange={e => setAccountForm({ ...accountForm, designation: e.target.value })} placeholder="Designation" className="p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg" />
          <button disabled={isGenerating} className="sm:col-span-2 gov-btn-primary text-xs py-2.5 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" /> {isGenerating ? 'Generating...' : 'Generate Login Credentials'}
          </button>
        </form>
        {accountMessage && <p className="text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg p-3">{accountMessage}</p>}
        {generatedAccount && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-950 space-y-1">
            <p className="font-bold">Account generated successfully. Share these credentials securely:</p>
            <p>Email: <strong>{generatedAccount.user.email}</strong></p>
            <p>Temporary password: <strong>{generatedAccount.temporaryPassword}</strong></p>
          </div>
        )}
      </div>}

      {/* TOP STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="gov-card p-4 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Registered Startups</span>
          <div className="text-2xl font-black text-slate-900">{startupList.length}</div>
        </div>
        <div className="gov-card p-4 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Active Challenges</span>
          <div className="text-2xl font-black text-blue-700">{challenges ? challenges.length : 5}</div>
        </div>
        <div className="gov-card p-4 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Active & Scaled Pilots</span>
          <div className="text-2xl font-black text-emerald-700">{pilots ? pilots.length : 2}</div>
        </div>
        <div className="gov-card p-4 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Audit Events Sealed</span>
          <div className="text-2xl font-black text-amber-600">142</div>
        </div>
      </div>

      {/* STARTUP VERIFICATION TABLE */}
      {activeTab !== 'admin-departments' && <div className="gov-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            DPIIT Startup Verification Directory
          </h3>
          <span className="text-xs text-slate-500 font-medium">Toggle verification badges</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Startup Name</th>
                <th className="p-3">Sector</th>
                <th className="p-3">DPIIT Reg #</th>
                <th className="p-3">Trust Badge Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {startupList.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{s.name}</td>
                  <td className="p-3 text-slate-600">{s.sector}</td>
                  <td className="p-3 font-mono text-slate-700">{s.dpiit}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      s.verified ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {s.verified ? 'Verified Startup ✓' : 'Unverified'}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => toggleVerify(s.id)}
                      className={`text-xs py-1 px-3 rounded font-bold ${
                        s.verified ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {s.verified ? 'Revoke Verification' : 'Verify Startup ✓'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>}

    </div>
  );
}
