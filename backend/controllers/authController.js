import { createUser, getUserByEmail } from '../database/models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_secret_key';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await getUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await createUser({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered', userId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
