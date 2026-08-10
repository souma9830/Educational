
const CustomQuestionSet = require('../models/CustomQuestionSet');

exports.fetchQuestionSets = async (userId) => {
  if (!userId) return [];
  return await CustomQuestionSet.find({ userId, isActive: true }).sort({ createdAt: -1 }).lean();
};

exports.createQuestionSet = async (userId, data) => {
  const { title, role, questions } = data;
  return await CustomQuestionSet.create({
    userId,
    title,
    role: role || 'General Technical',
    questions: questions || []
  });
};

exports.deleteQuestionSet = async (userId, setId) => {
  return await CustomQuestionSet.findOneAndUpdate(
    { _id: setId, userId },
    { isActive: false },
    { new: true }
  );
};
