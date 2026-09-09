import React from 'react';
import { Building2, Calendar, CheckCircle2, FileText, IndianRupee } from 'lucide-react';

export default function GovernmentProposals({ proposals, challenges }) {
  const challengeTitles = new Map((challenges || []).map(challenge => [challenge.id, challenge.title]));

  return (
    <div className="space-y-6 pb-16">
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-6 text-white shadow-lg sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-300">Government Proposal Desk</p>
        <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">Startup Proposals Received</h1>
        <p className="mt-2 text-sm text-slate-300">
          Review proposals submitted by startups against challenges published by your department.
        </p>
      </div>

      {!proposals?.length ? (
        <div className="gov-card p-10 text-center">
          <FileText className="mx-auto h-10 w-10 text-slate-300" />
          <h2 className="mt-3 font-extrabold text-slate-900">No proposals received yet</h2>
          <p className="mt-1 text-xs text-slate-500">Startup submissions will appear here after they apply to a challenge.</p>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {proposals.map((proposal) => (
            <article key={proposal.id} className="gov-card space-y-4 p-5">
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">{proposal.id}</p>
                  <h2 className="mt-1 text-base font-extrabold text-slate-900">{proposal.solutionTitle}</h2>
                </div>
                <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-800">
                  {proposal.status || 'Submitted'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="block text-[10px] font-semibold uppercase text-slate-400">Startup</span>
                  <span className="mt-1 flex items-center gap-1 font-bold text-slate-800"><Building2 className="h-3.5 w-3.5 text-blue-600" /> {proposal.startupName}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-semibold uppercase text-slate-400">Submitted</span>
                  <span className="mt-1 flex items-center gap-1 font-bold text-slate-800"><Calendar className="h-3.5 w-3.5 text-slate-500" /> {proposal.submittedAt}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-semibold uppercase text-slate-400">Budget</span>
                  <span className="mt-1 flex items-center gap-1 font-bold text-emerald-700"><IndianRupee className="h-3.5 w-3.5" /> {proposal.budget}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-semibold uppercase text-slate-400">Match score</span>
                  <span className="mt-1 flex items-center gap-1 font-bold text-blue-700"><CheckCircle2 className="h-3.5 w-3.5" /> {proposal.matchScore || 'Pending'}{proposal.matchScore ? '/100' : ''}</span>
                </div>
              </div>

              <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
                <span className="block text-[10px] font-semibold uppercase text-slate-400">Government challenge</span>
                <span className="mt-1 block font-semibold text-slate-800">{challengeTitles.get(proposal.challengeId) || proposal.challengeId}</span>
              </div>

              <p className="line-clamp-3 text-xs leading-relaxed text-slate-600">{proposal.proposedSolution}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
