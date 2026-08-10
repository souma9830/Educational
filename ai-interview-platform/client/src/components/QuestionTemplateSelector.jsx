import React, { useEffect, useState } from 'react';
import { Sliders, CheckCircle2, BookOpen } from 'lucide-react';

const ROLE_PRESETS = [
  { id: 'Frontend Engineer', name: 'Frontend Engineer', focus: 'React, CSS, Performance, DOM' },
  { id: 'Backend Engineer', name: 'Backend Engineer', focus: 'Distributed Systems, SQL, API Security' },
  { id: 'Full Stack Engineer', name: 'Full Stack Engineer', focus: 'End-to-End System Design & State' },
  { id: 'DevOps Engineer', name: 'DevOps Engineer', focus: 'Docker, Kubernetes, CI/CD, Infrastructure' }
];

export default function QuestionTemplateSelector({ selectedRole, onSelectRole, onSelectBank }) {
  const [customBanks, setCustomBanks] = useState([]);

  useEffect(() => {
    fetch('/api/questions/banks')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.banks) {
          setCustomBanks(data.data.banks);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div style={{ margin: '16px 0', background: '#0d0d0d', border: '1px solid #222', borderRadius: '12px', padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#fff', fontSize: '14px', fontWeight: '600' }}>
        <Sliders size={16} color="#60a5fa" />
        <span>Interview Evaluation Template Presets</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
        {ROLE_PRESETS.map((preset) => {
          const isSelected = selectedRole === preset.id;
          return (
            <div
              key={preset.id}
              onClick={() => onSelectRole(preset.id)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: `1px solid ${isSelected ? '#3b82f6' : '#222'}`,
                background: isSelected ? 'rgba(59, 130, 246, 0.08)' : '#141414',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: isSelected ? '#60a5fa' : '#e0e0e0' }}>
                  {preset.name}
                </span>
                {isSelected && <CheckCircle2 size={14} color="#60a5fa" />}
              </div>
              <p style={{ fontSize: '11px', color: '#888', margin: 0 }}>{preset.focus}</p>
            </div>
          );
        })}
      </div>

      {customBanks.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', color: '#a1a1aa', fontSize: '12px' }}>
            <BookOpen size={14} />
            <span>Custom Question Templates</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {customBanks.map((bank) => (
              <button
                key={bank._id}
                onClick={() => onSelectBank && onSelectBank(bank)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: '#1f2937',
                  border: '1px solid #374151',
                  color: '#9ca3af',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }}
              >
                {bank.title} ({bank.category})
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
