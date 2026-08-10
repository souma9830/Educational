import RecruiterRole from '../models/RecruiterRole.js';

export const getRolePermissions = async (req, res, next) => {
  try {
    let roles = await RecruiterRole.find({});

    if (roles.length === 0) {
      const defaultRoles = [
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
            { scope: 'interviews:create', isAllowed: false }
          ]
        }
      ];
      roles = await RecruiterRole.insertMany(defaultRoles);
    }

    res.status(200).json({ success: true, roles });
  } catch (error) {
    next(error);
  }
};

export const updateRoleScope = async (req, res, next) => {
  try {
    const { roleName } = req.params;
    const { scope, isAllowed } = req.body;

    const roleDoc = await RecruiterRole.findOne({ roleName });
    if (!roleDoc) return res.status(404).json({ success: false, message: 'Role not found' });

    const match = roleDoc.scopes.find(s => s.scope === scope);
    if (match) match.isAllowed = isAllowed;
    else roleDoc.scopes.push({ scope, isAllowed });

    await roleDoc.save();

    res.status(200).json({ success: true, message: `Scope "${scope}" updated`, roleDoc });
  } catch (error) {
    next(error);
  }
};
