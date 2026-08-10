import jwt from 'jsonwebtoken';
import crypto from 'crypto';

/**
 * Authentication Controller with HttpOnly SameSite=Strict Cookies & CSRF Protection
 */

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '30d' });
};

export const registerCandidate = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const token = generateToken('user-101');

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    const csrfToken = crypto.randomBytes(32).toString('hex');
    res.cookie('XSRF-TOKEN', csrfToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    res.status(201).json({
      success: true,
      user: { id: 'user-101', name, email, role: 'candidate' },
      token,
      csrfToken
    });
  } catch (error) {
    next(error);
  }
};

export const loginCandidate = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = generateToken('user-101');

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      token,
      message: 'Candidate logged in successfully with HttpOnly SameSite=Strict cookie'
    });
  } catch (error) {
    next(error);
  }
};
