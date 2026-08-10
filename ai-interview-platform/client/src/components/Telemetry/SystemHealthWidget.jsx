import React, { useEffect, useState } from 'react';

export function SystemHealthWidget() {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDiagnostics = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/health/diagnostics');
      const data = await res.json();
      if (data.success) {
        setHealthData(data.data.diagnostics);
      } else {
        setError('Failed to load telemetry data');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiagnostics();
    const interval = setInterval(fetchDiagnostics, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !healthData) {
    return <div style={{ padding: '16px', background: '#111', color: '#888', borderRadius: '8px' }}>Loading system telemetry...</div>;
  }

  if (error) {
    return <div style={{ padding: '16px', background: '#2a1215', color: '#ff6b6b', borderRadius: '8px' }}>Telemetry Error: {error}</div>;
  }

  const { status, system, database } = healthData || {};

  return (
    <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '20px', color: '#fff', margin: '16px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>System Health & Performance Diagnostics</h3>
        <span style={{
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '600',
          background: status === 'healthy' ? '#1c3d27' : '#4d2a12',
          color: status === 'healthy' ? '#4ade80' : '#fb923c'
        }}>
          {status ? status.toUpperCase() : 'UNKNOWN'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#181818', padding: '12px', borderRadius: '6px', border: '1px solid #2a2a2a' }}>
          <div style={{ color: '#888', fontSize: '12px', marginBottom: '4px' }}>Database Status</div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: database?.state === 'connected' ? '#4ade80' : '#fb923c' }}>
            {database?.state || 'N/A'} ({database?.host || 'local'})
          </div>
        </div>

        <div style={{ background: '#181818', padding: '12px', borderRadius: '6px', border: '1px solid #2a2a2a' }}>
          <div style={{ color: '#888', fontSize: '12px', marginBottom: '4px' }}>Heap Memory</div>
          <div style={{ fontSize: '14px', fontWeight: '600' }}>
            {system?.heapUsedMb || 0} MB / {system?.heapTotalMb || 0} MB
          </div>
        </div>

        <div style={{ background: '#181818', padding: '12px', borderRadius: '6px', border: '1px solid #2a2a2a' }}>
          <div style={{ color: '#888', fontSize: '12px', marginBottom: '4px' }}>Process Uptime</div>
          <div style={{ fontSize: '14px', fontWeight: '600' }}>
            {system?.uptimeSeconds ? `${Math.floor(system.uptimeSeconds / 60)} min` : '0 min'}
          </div>
        </div>

        <div style={{ background: '#181818', padding: '12px', borderRadius: '6px', border: '1px solid #2a2a2a' }}>
          <div style={{ color: '#888', fontSize: '12px', marginBottom: '4px' }}>CPU Cores / Runtime</div>
          <div style={{ fontSize: '14px', fontWeight: '600' }}>
            {system?.cpuCount || 1} Cores ({system?.nodeVersion || 'Node'})
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemHealthWidget;
