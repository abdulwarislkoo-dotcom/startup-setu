import React from 'react';
import { BarChart3, CheckCircle2, ClipboardList, Clock, FileText } from 'lucide-react';

export default function EvaluatorHome({ proposals, onNavigate }) {
  const proposalList = proposals || [];
  const pending = proposalList.filter(proposal => ['Submitted', 'Under Evaluation'].includes(proposal.status)).length;
  const evaluated = proposalList.filter(proposal => ['Shortlisted', 'Pilot Selected', 'Pilot Running', 'Completed Validation'].includes(proposal.status)).length;

  return (
    <div className="space-y-8 pb-16">
      <div className="rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 p-6 text-white shadow-lg sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-purple-300">Evaluator Workspace</p>
        <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">Evaluation Committee Dashboard</h1>
        <p className="mt-2 text-sm text-slate-300">Track committee workload and open the dedicated scoring workspace when you are ready to evaluate proposals.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Total submissions', value: proposalList.length, icon: FileText, color: 'text-blue-600 bg-blue-50' },
          { label: 'Pending evaluation', value: pending, icon: Clock, color: 'text-amber-600 bg-amber-50' },
          { label: 'Evaluated', value: evaluated, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Committee scorecard', value: '6 criteria', icon: BarChart3, color: 'text-purple-600 bg-purple-50' }
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="gov-card p-4">
            <div className={`mb-3 inline-flex rounded-lg p-2 ${color}`}><Icon className="h-4 w-4" /></div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
            <p className="mt-1 text-2xl font-black text-slate-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="gov-card space-y-4 p-6">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="flex items-center gap-2 text-base font-extrabold text-slate-900"><ClipboardList className="h-5 w-5 text-purple-600" /> Committee workload</h2>
            <p className="mt-1 text-xs text-slate-500">Quick view of recent startup submissions awaiting committee action.</p>
          </div>
          <button type="button" onClick={() => onNavigate('evaluator-scoring')} className="gov-btn-primary text-xs font-bold">
            Open Evaluation Workspace
          </button>
        </div>

        {proposalList.length ? (
          <div className="divide-y divide-slate-100">
            {proposalList.slice(0, 5).map(proposal => (
              <div key={proposal.id} className="flex flex-col gap-2 py-3 text-xs sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bold text-slate-900">{proposal.startupName}</p>
                  <p className="text-slate-500">{proposal.solutionTitle}</p>
                </div>
                <span className="w-fit rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">{proposal.status || 'Submitted'}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-6 text-center text-xs text-slate-500">No proposal submissions are available yet.</p>
        )}
      </div>
    </div>
  );
}
