/**
 * Multi-Agent AI Persona Orchestration Service
 */

export const orchestratePanelResponse = ({ candidateAnswer = '', activePersona = 'TechArchitect' }) => {
  const personas = {
    TechArchitect: {
      name: 'Dr. Aris (Staff Architect)',
      question: 'How do you handle lock contention when scaling redis distributed locks under 50k QPS?'
    },
    HRManager: {
      name: 'Sarah Chen (People Lead)',
      question: 'Can you describe how you communicated this architectural change to non-technical stakeholders?'
    },
    ProductManager: {
      name: 'Alex Rivera (VP of Product)',
      question: 'What business metrics were impacted by optimizing this system latency?'
    }
  };

  const nextPersona = activePersona === 'TechArchitect' ? 'HRManager' : activePersona === 'HRManager' ? 'ProductManager' : 'TechArchitect';

  return {
    currentResponse: personas[activePersona],
    nextPersona: personas[nextPersona]
  };
};
