import { ShieldAlert, Clock, User, CheckCircle2 } from 'lucide-react';

const ScopeAuditLog = () => {
  const auditLogs = [
    { id: 'l-1', user: 'sarah.hr@company.com', role: 'HRCoordinator', scope: 'evaluations:export', status: 'DENIED', timestamp: '10:14 AM' },
    { id: 'l-2', user: 'aris.lead@company.com', role: 'LeadRecruiter', scope: 'interviews:create', status: 'ALLOWED', timestamp: '10:10 AM' }
  ];

  return (
    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <ShieldAlert size={14} className="text-blue-400" /> RBAC Permission Scope Audit Log
        </h4>
        <span className="text-[10px] text-slate-500 font-mono">Live Scope Enforcement</span>
      </div>

      <div className="space-y-2">
        {auditLogs.map((log) => (
          <div key={log.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-white">{log.user} ({log.role})</span>
              <span className="font-mono text-[10px] text-slate-400 block">Attempted Scope: {log.scope}</span>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
              log.status === 'ALLOWED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}>
              {log.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScopeAuditLog;
