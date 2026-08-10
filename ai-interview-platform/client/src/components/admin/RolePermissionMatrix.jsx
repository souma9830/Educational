import { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Check, X, RefreshCw } from 'lucide-react';

const RolePermissionMatrix = () => {
  const [roles, setRoles] = useState([
    {
      roleName: 'LeadRecruiter',
      scopes: [
        { scope: 'candidates:read', isAllowed: true },
        { scope: 'interviews:create', isAllowed: true },
        { scope: 'evaluations:export', isAllowed: true }
      ]
    },
    {
      roleName: 'HRCoordinator',
      scopes: [
        { scope: 'candidates:read', isAllowed: true },
        { scope: 'interviews:create', isAllowed: false },
        { scope: 'evaluations:export', isAllowed: false }
      ]
    }
  ]);

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black">Zero-Trust Recruiter RBAC Matrix</h2>
          <p className="text-xs text-slate-400">Configure recruiter API scopes with dynamic middleware checks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role) => (
          <div key={role.roleName} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <ShieldCheck size={18} className="text-blue-400" /> {role.roleName}
            </h3>

            <div className="space-y-2">
              {role.scopes.map((s) => (
                <div key={s.scope} className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                  s.isAllowed ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}>
                  <span className="font-mono font-bold">{s.scope}</span>
                  <span className="font-black text-[10px] uppercase">{s.isAllowed ? 'ALLOWED' : 'DENIED'}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RolePermissionMatrix;
