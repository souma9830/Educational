import RecruiterRole from '../models/RecruiterRole.js';

export const checkScope = (requiredScope) => {
  return async (req, res, next) => {
    try {
      if (!req.user) return res.status(401).json({ success: false, message: 'Authentication required' });
      if (req.user.role === 'admin' || req.user.role === 'LeadRecruiter') return next();

      const roleDoc = await RecruiterRole.findOne({ roleName: req.user.role || 'HRCoordinator' });
      const scopeMatch = roleDoc?.scopes.find(s => s.scope === requiredScope);

      if (!scopeMatch || !scopeMatch.isAllowed) {
        return res.status(403).json({
          success: false,
          requiredScope,
          message: `Forbidden: Missing scope permission "${requiredScope}"`
        });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
