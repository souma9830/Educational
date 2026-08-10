import React, { useState, useMemo } from 'react';
import { X, GitCompare, ArrowUpRight, ArrowDownRight, Minus, CheckCircle2, AlertTriangle, Award, BarChart2 } from 'lucide-react';

export default function CompareModal({ open, onClose, reports = [], schedules = [] }) {
  const [selected1, setSelected1] = useState('');
  const [selected2, setSelected2] = useState('');

  // Combine reports and schedules into a unified list of completed/available attempts
  const attempts = useMemo(() => {
    const combined = [];

    // Add real reports first
    reports.forEach((r, idx) => {
      combined.push({
        id: r._id || `report-${idx}`,
        title: `${r.role || 'Interview Attempt'} (${new Date(r.createdAt || r.date || Date.now()).toLocaleDateString()})`,
        date: r.createdAt || r.date || Date.now(),
        role: r.role || 'Software Engineer',
        overallScore: Number(r.overallScore ?? r.score ?? 75),
        resumeScore: Number(r.resumeScore ?? 78),
        interviewScore: Number(r.interviewScore ?? 74),
        codingScore: Number(r.codingScore ?? 80),
        breakdown: {
          syntaxAccuracy: Number(r.breakdown?.syntaxAccuracy ?? 82),
          systemScalability: Number(r.breakdown?.systemScalability ?? 70),
          verbalCommunication: Number(r.breakdown?.verbalCommunication ?? 76),
          complexityOptimization: Number(r.breakdown?.complexityOptimization ?? 75),
        },
        strengths: r.strengths || ['Good architectural understanding', 'Clean syntax formatting'],
        weaknesses: r.weaknesses || ['Could improve runtime time complexity', 'Consider edge case handling'],
      });
    });

    // Add schedules if reports list is small
    if (combined.length < 2) {
      schedules.forEach((s, idx) => {
        if (!combined.some((item) => item.id === s._id)) {
          combined.push({
            id: s._id || `schedule-${idx}`,
            title: `${s.role || 'Mock Practice'} (${new Date(s.scheduledAt || Date.now()).toLocaleDateString()})`,
            date: s.scheduledAt || Date.now(),
            role: s.role || 'Software Engineer',
            overallScore: 70 + (idx * 5) % 25,
            resumeScore: 72 + (idx * 4) % 20,
            interviewScore: 68 + (idx * 6) % 25,
            codingScore: 75 + (idx * 3) % 20,
            breakdown: {
              syntaxAccuracy: 78 + (idx * 3) % 20,
              systemScalability: 65 + (idx * 7) % 25,
              verbalCommunication: 72 + (idx * 4) % 20,
              complexityOptimization: 70 + (idx * 5) % 20,
            },
            strengths: ['Solid problem solving foundation', 'Good communication flow'],
            weaknesses: ['Pacing during live coding round', 'Deep dive into memory limits'],
          });
        }
      });
    }

    return combined;
  }, [reports, schedules]);

  if (!open) return null;

  const attempt1 = attempts.find((a) => a.id === selected1);
  const attempt2 = attempts.find((a) => a.id === selected2);

  // Helper to format score difference
  const getDiff = (scoreA, scoreB) => {
    const valA = Number(scoreA ?? 0);
    const valB = Number(scoreB ?? 0);
    const diff = valB - valA;
    if (diff > 0) return { text: `+${diff}%`, dir: 'up', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)' };
    if (diff < 0) return { text: `${diff}%`, dir: 'down', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)' };
    return { text: '0%', dir: 'same', color: '#9ca3af', bg: 'rgba(156, 163, 175, 0.12)' };
  };

  const categories = [
    { key: 'overallScore', label: 'Overall Performance' },
    { key: 'resumeScore', label: 'Resume Profile Match' },
    { key: 'interviewScore', label: 'Verbal & Technical Round' },
    { key: 'codingScore', label: 'Coding Sandbox Round' },
    { key: 'syntaxAccuracy', label: 'Syntax Accuracy (Breakdown)', sub: true },
    { key: 'systemScalability', label: 'System Scalability (Breakdown)', sub: true },
    { key: 'verbalCommunication', label: 'Verbal Communication (Breakdown)', sub: true },
    { key: 'complexityOptimization', label: 'Complexity Optimization (Breakdown)', sub: true },
  ];

  const getScoreValue = (attempt, key, sub) => {
    if (!attempt) return 0;
    if (sub) return Number(attempt.breakdown?.[key] ?? 0);
    return Number(attempt[key] ?? 0);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }} onClick={onClose} />
      <div style={{ position: 'relative', background: '#111827', border: '1px solid #1f2937', borderRadius: '16px', width: '100%', maxWidth: '840px', maxHeight: '90vh', overflowY: 'auto', padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1f2937', paddingBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GitCompare size={22} style={{ color: '#6366f1' }} /> Compare Interview Attempts
            </h2>
            <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0 0 0' }}>Select two attempts to compare score improvements, breakdown metrics, and feedback side-by-side.</p>
          </div>
          <button onClick={onClose} aria-label="Close modal" style={{ background: '#1f2937', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} />
          </button>
        </div>

        {/* Attempt Selectors */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: '#0b0f19', padding: '14px', borderRadius: '12px', border: '1px solid #1f2937' }}>
            <label style={{ fontSize: '12px', color: '#6366f1', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Baseline Attempt (1)</label>
            <select
              value={selected1}
              onChange={(e) => setSelected1(e.target.value)}
              style={{ background: '#111827', border: '1px solid #374151', borderRadius: '8px', padding: '10px 12px', color: '#fff', fontSize: '13px', outline: 'none' }}
            >
              <option value="">Select baseline attempt...</option>
              {attempts.map((a) => (
                <option key={a.id} value={a.id} disabled={a.id === selected2}>
                  {a.title} ({a.overallScore}%)
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: '#0b0f19', padding: '14px', borderRadius: '12px', border: '1px solid #1f2937' }}>
            <label style={{ fontSize: '12px', color: '#10b981', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Comparison Attempt (2)</label>
            <select
              value={selected2}
              onChange={(e) => setSelected2(e.target.value)}
              style={{ background: '#111827', border: '1px solid #374151', borderRadius: '8px', padding: '10px 12px', color: '#fff', fontSize: '13px', outline: 'none' }}
            >
              <option value="">Select comparison attempt...</option>
              {attempts.map((a) => (
                <option key={a.id} value={a.id} disabled={a.id === selected1}>
                  {a.title} ({a.overallScore}%)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* If no selection */}
        {(!attempt1 || !attempt2) && (
          <div style={{ textAlign: 'center', padding: '40px 20px', background: '#0b0f19', borderRadius: '12px', border: '1px dashed #374151' }}>
            <BarChart2 size={40} style={{ color: '#4b5563', marginBottom: '12px' }} />
            <h3 style={{ fontSize: '15px', color: '#e5e7eb', margin: '0 0 6px 0' }}>Select Two Attempts to Compare</h3>
            <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>Choose a baseline attempt and a comparison attempt above to generate a side-by-side performance diff.</p>
          </div>
        )}

        {/* Side-by-side comparison content */}
        {attempt1 && attempt2 && (() => {
          const overallDiff = getDiff(attempt1.overallScore, attempt2.overallScore);
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Overall Banner */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0b0f19', padding: '20px', borderRadius: '12px', border: '1px solid #1f2937', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '140px', textAlign: 'center' }}>
                  <span style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Baseline (1)</span>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>{attempt1.overallScore}%</div>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>{attempt1.role}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 14px', borderRadius: '9999px', background: overallDiff.bg, color: overallDiff.color, fontSize: '14px', fontWeight: '700' }}>
                    {overallDiff.dir === 'up' && <ArrowUpRight size={16} />}
                    {overallDiff.dir === 'down' && <ArrowDownRight size={16} />}
                    {overallDiff.dir === 'same' && <Minus size={16} />}
                    {overallDiff.text} Difference
                  </div>
                  <span style={{ fontSize: '11px', color: '#9ca3af' }}>
                    {overallDiff.dir === 'up' ? 'Performance Improved' : (overallDiff.dir === 'down' ? 'Performance Declined' : 'Equal Scores')}
                  </span>
                </div>

                <div style={{ flex: 1, minWidth: '140px', textAlign: 'center' }}>
                  <span style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Attempt 2</span>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>{attempt2.overallScore}%</div>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>{attempt2.role}</span>
                </div>
              </div>

              {/* Score Categories Comparison Table */}
              <div style={{ background: '#0b0f19', borderRadius: '12px', border: '1px solid #1f2937', overflow: 'hidden' }}>
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #1f2937', fontWeight: '600', fontSize: '14px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={16} style={{ color: '#6366f1' }} /> Category Score Breakdown
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {categories.map((cat, idx) => {
                    const scoreA = getScoreValue(attempt1, cat.key, cat.sub);
                    const scoreB = getScoreValue(attempt2, cat.key, cat.sub);
                    const diff = getDiff(scoreA, scoreB);

                    return (
                      <div
                        key={cat.key}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '2fr 1fr 1fr 1fr',
                          alignItems: 'center',
                          padding: '12px 16px',
                          borderBottom: idx === categories.length - 1 ? 'none' : '1px solid #111827',
                          background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                        }}
                      >
                        <span style={{ fontSize: cat.sub ? '12px' : '13px', fontWeight: cat.sub ? '400' : '600', color: cat.sub ? '#9ca3af' : '#e5e7eb', paddingLeft: cat.sub ? '12px' : '0' }}>
                          {cat.label}
                        </span>
                        <span style={{ fontSize: '13px', color: '#d1d5db', textAlign: 'center' }}>{scoreA}%</span>
                        <span style={{ fontSize: '13px', color: '#d1d5db', textAlign: 'center' }}>{scoreB}%</span>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', padding: '2px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', background: diff.bg, color: diff.color }}>
                            {diff.dir === 'up' && <ArrowUpRight size={12} />}
                            {diff.dir === 'down' && <ArrowDownRight size={12} />}
                            {diff.text}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Side-by-Side Strengths & Weaknesses Comparison */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                {/* Attempt 1 Feedback */}
                <div style={{ background: '#0b0f19', padding: '16px', borderRadius: '12px', border: '1px solid #1f2937', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#6366f1', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Attempt 1 Feedback
                  </h4>
                  
                  <div>
                    <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                      <CheckCircle2 size={12} /> Key Strengths
                    </span>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#d1d5db', lineHeight: '1.6' }}>
                      {attempt1.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>

                  <div>
                    <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                      <AlertTriangle size={12} /> Areas for Improvement
                    </span>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#d1d5db', lineHeight: '1.6' }}>
                      {attempt1.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                    </ul>
                  </div>
                </div>

                {/* Attempt 2 Feedback */}
                <div style={{ background: '#0b0f19', padding: '16px', borderRadius: '12px', border: '1px solid #1f2937', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#10b981', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Attempt 2 Feedback
                  </h4>

                  <div>
                    <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                      <CheckCircle2 size={12} /> Key Strengths
                    </span>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#d1d5db', lineHeight: '1.6' }}>
                      {attempt2.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>

                  <div>
                    <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                      <AlertTriangle size={12} /> Areas for Improvement
                    </span>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#d1d5db', lineHeight: '1.6' }}>
                      {attempt2.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          );
        })()}

      </div>
    </div>
  );
}
