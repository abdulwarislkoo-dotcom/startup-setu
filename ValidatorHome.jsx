import React from 'react';
import { Activity, CheckCircle2, ClipboardCheck, FileCheck, ShieldCheck } from 'lucide-react';

export default function ValidatorHome({ pilots, evidenceList, onNavigate }) {
  const evidence = evidenceList || [];
  const verified = evidence.filter(item => item.status === 'Verified').length;
  const pending = evidence.filter(item => item.status === 'Pending Review').length;

  return (
    <div className="space-y-8 pb-16">
      <div className="rounded-2xl bg-gradient-to-r from-amber-950 via-slate-900 to-emerald-950 p-6 text-white shadow-lg sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">Validator Workspace</p>
        <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">Validation Operations Dashboard</h1>
        <p className="mt-2 text-sm text-slate-300">Monitor assigned pilots, evidence readiness, and validation workload before issuing an independent sign-off.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Assigned pilots', value: pilots?.length || 0, icon: Activity, color: 'text-blue-600 bg-blue-50' },
          { label: 'Evidence items', value: evidence.length, icon: ShieldCheck, color: 'text-purple-600 bg-purple-50' },
          { label: 'Verified evidence', value: verified, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Pending review', value: pending, icon: ClipboardCheck, color: 'text-amber-600 bg-amber-50' }
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="gov-card p-4">
            <div className={`mb-3 inline-flex rounded-lg p-2 ${color}`}><Icon className="h-4 w-4" /></div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
            <p className="mt-1 text-2xl font-black text-slate-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="gov-card flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="flex items-center gap-2 text-base font-extrabold text-slate-900"><FileCheck className="h-5 w-5 text-amber-600" /> Ready for independent validation?</h2>
          <p className="mt-1 text-xs text-slate-500">Review evidence claims and issue the digital validation certificate from the dedicated sign-off workspace.</p>
        </div>
        <button type="button" onClick={() => onNavigate('validator-signoff')} className="gov-btn-primary bg-amber-600 text-xs font-bold hover:bg-amber-700">
          Open Validation Sign-off
        </button>
      </div>
    </div>
  );
}
