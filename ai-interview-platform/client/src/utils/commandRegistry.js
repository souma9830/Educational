/**
 * Command Palette Navigation & Action Registry
 */

const DEFAULT_COMMANDS = [
  { id: 'dashboard', label: 'Go to Dashboard Overview', category: 'Navigation', tab: 'dashboard' },
  { id: 'setup', label: 'Launch New Interview Setup', category: 'Actions', tab: 'setup' },
  { id: 'interview', label: 'Go to Active Interview Session', category: 'Navigation', tab: 'interview' },
  { id: 'coding', label: 'Go to Interactive Coding Test', category: 'Navigation', tab: 'coding' },
  { id: 'result', label: 'View Assessment & Feedback Report', category: 'Navigation', tab: 'result' },
  { id: 'schedule', label: 'Schedule Upcoming Interview Session', category: 'Actions', tab: 'schedule' },
  { id: 'audit', label: 'View Security Audit Logs', category: 'Admin', tab: 'audit' },
];

function filterCommands(commands, query) {
  if (!query || typeof query !== 'string') return commands;
  const cleanQuery = query.toLowerCase().trim();
  return commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(cleanQuery) ||
    cmd.category.toLowerCase().includes(cleanQuery)
  );
}

module.exports = {
  DEFAULT_COMMANDS,
  filterCommands
};
