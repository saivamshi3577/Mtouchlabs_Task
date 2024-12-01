

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 7777;
const JWT_SECRET = 'your_jwt_secret_key';

let users = [];

app.use(cors());
app.use(bodyParser.json());

app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Email and password are required' });
  }

  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
  const newUser = { email, password, token };
  users.push(newUser);

  return res.status(201).json({ token, msg: 'Signup successful' });
});

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  try {
    const decoded = jwt.verify(user.token, JWT_SECRET);
    if (decoded.email !== email) {
      throw new Error('Token mismatch');
    }
    return res.status(200).json({ token: user.token, message: 'Login successful' });
  } catch (err) {
    return res.status(401).json({ message: 'Token validation failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

