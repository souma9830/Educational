import React, { useState, useEffect } from 'react';
import { Search, Compass, Code, LayoutDashboard, Settings, FileText, Sun, Moon } from 'lucide-react';
import './CommandPalette.css';
import { DEFAULT_COMMANDS, filterCommands } from '../../utils/commandRegistry';

export default function CommandPalette({ isOpen, onClose, onSelectTab }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = filterCommands(DEFAULT_COMMANDS, query);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          onSelectTab(filteredCommands[selectedIndex].tab);
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onSelectTab, onClose]);

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '15vh', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div style={{ background: '#111', border: '1px solid #222', borderRadius: '12px', width: '100%', maxWidth: '520px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.8)', color: '#fff' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #222', gap: '10px' }}>
          <Search size={18} style={{ color: '#666' }} />
          <input
            type="text"
            placeholder="Type a command or search page..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', fontSize: '14px', outline: 'none' }}
          />
        </div>
        <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '8px' }}>
          {filteredCommands.length === 0 ? (
            <div style={{ padding: '16px', color: '#666', fontSize: '13px', textAlign: 'center' }}>No matching commands</div>
          ) : (
            filteredCommands.map((cmd, idx) => (
              <div
                key={cmd.id}
                onClick={() => { onSelectTab(cmd.tab); onClose(); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  background: idx === selectedIndex ? '#222' : 'transparent',
                  color: idx === selectedIndex ? '#fff' : '#aaa'
                }}
              >
                <span>{cmd.label}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
