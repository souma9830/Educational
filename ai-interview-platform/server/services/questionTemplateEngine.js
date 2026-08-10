const QuestionBank = require('../models/QuestionBank');
const logger = require('./logger');

class QuestionTemplateEngine {
  async getTemplatesByCategory(category, difficulty) {
    const query = {};
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;

    return await QuestionBank.find(query).sort({ createdAt: -1 }).lean();
  }

  async createQuestionBank(data, userId) {
    try {
      const bank = await QuestionBank.create({
        ...data,
        createdBy: userId,
      });
      logger.info(`New QuestionBank created: ${bank.title}`);
      return bank;
    } catch (error) {
      logger.error(`Error creating QuestionBank: ${error.message}`);
      throw error;
    }
  }

  selectRandomQuestions(questionBank, count = 5) {
    if (!questionBank || !questionBank.questions || questionBank.questions.length === 0) {
      return [];
    }
    const shuffled = [...questionBank.questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}

module.exports = new QuestionTemplateEngine();
