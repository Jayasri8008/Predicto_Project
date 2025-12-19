const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '127.0.0.1';

app.use(cors());
app.use(express.json());

// In-memory stores for local testing only
const users = new Map();
const otps = new Map(); // Store OTPs: { email: { code, expiryTime } }

// Helper: simple token generator
function generateToken() {
  return uuidv4();
}

// Helper: generate 6-digit OTP
function generateOtp() {
  return String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
}

// Register endpoint - sends OTP
app.post('/api/auth/register', (req, res) => {
  const { firstName, lastName, email, password, phone, company } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  if (users.has(email)) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const user = {
    id: uuidv4(),
    firstName: firstName || '',
    lastName: lastName || '',
    email,
    password, // plain text only for mock; DO NOT DO THIS IN PRODUCTION
    phone: phone || '',
    company: company || '',
    emailVerified: false,
  };
  users.set(email, user);

  // Generate OTP
  const otp = generateOtp();
  const expiryTime = Date.now() + (10 * 60 * 1000); // Valid for 10 minutes
  otps.set(email, { code: otp, expiryTime });

  console.log(`[OTP SENT] Email: ${email}, OTP: ${otp}`);

  return res.status(201).json({ 
    message: 'User registered successfully. OTP sent to email.',
    user: { id: user.id, email: user.email },
    note: 'For development: Check console or use OTP: ' + otp
  });
});

// Verify OTP and login
app.post('/api/auth/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  const user = users.get(email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const otpRecord = otps.get(email);
  if (!otpRecord || otpRecord.code !== otp) {
    return res.status(401).json({ message: 'Invalid OTP' });
  }

  if (Date.now() > otpRecord.expiryTime) {
    otps.delete(email); // Remove expired OTP
    return res.status(401).json({ message: 'OTP expired. Please request a new one.' });
  }

  // Mark user as verified and generate token
  user.emailVerified = true;
  otps.delete(email); // Remove used OTP

  const token = generateToken();
  const refreshToken = generateToken();
  user.__token = token;

  return res.json({ 
    token, 
    refreshToken,
    user: { 
      id: user.id, 
      email: user.email, 
      firstName: user.firstName, 
      lastName: user.lastName 
    } 
  });
});

// Resend OTP
app.post('/api/auth/resend-otp', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const user = users.get(email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Generate new OTP
  const otp = generateOtp();
  const expiryTime = Date.now() + (10 * 60 * 1000); // Valid for 10 minutes
  otps.set(email, { code: otp, expiryTime });

  console.log(`[OTP RESENT] Email: ${email}, OTP: ${otp}`);

  return res.json({ 
    message: 'OTP resent successfully',
    note: 'For development: Check console or use OTP: ' + otp
  });
});

// Legacy login (for already verified users)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  const user = users.get(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  if (!user.emailVerified) {
    return res.status(403).json({ message: 'Email not verified. Please verify with OTP.' });
  }

  const token = generateToken();
  const refreshToken = generateToken();
  user.__token = token;
  return res.json({ 
    token, 
    refreshToken,
    user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName } 
  });
});

// Analytics tracking endpoint removed to allow backend Java service to handle /api/analytics/track requests
// app.post('/api/analytics/track', (req, res) => {
//   // Accept any payload and respond 200
//   console.log('Analytics track:', req.body);
//   res.json({ ok: true });
// });

// Basic health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Mock user dashboard endpoints
app.get('/api/users/projects', (req, res) => {
  // Mock projects data
  const projects = [
    {
      id: 1,
      name: 'Mobile App Development',
      description: 'iOS and Android app',
      status: 'in_progress',
      cost: 50000,
      duration: 12,
      teamSize: 5,
      createdAt: '2025-11-18T15:45:00',
      updatedAt: '2025-11-18T15:45:00'
    }
  ];
  res.json(projects);
});

app.get('/api/users/activity', (req, res) => {
  // Mock activity data
  const activity = [
    {
      id: 1,
      type: 'project_created',
      description: 'New project created',
      details: 'Created project: Mobile App Development',
      createdAt: '2025-11-18T15:45:00'
    }
  ];
  res.json(activity);
});

app.get('/api/users/billing', (req, res) => {
  // Mock billing data
  const billing = {
    currentPlan: 'Professional',
    monthlyCost: 99.00,
    billingCycle: 'Monthly',
    nextBillingDate: '2025-12-03T00:00:00',
    paymentMethod: '**** **** **** 4242',
    totalSpent: 495.00,
    usage: {
      estimatesCreated: 15,
      estimatesLimit: 50,
      storageUsed: 2.5,
      storageLimit: 10.0,
      apiCalls: 5420,
      apiCallsLimit: 10000
    }
  };
  res.json(billing);
});

app.get('/api/users/profile', (req, res) => {
  // Mock profile data
  const profile = {
    id: 1,
    email: 'user@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1234567890',
    company: 'Acme Corp',
    createdAt: '2025-11-18T10:30:00',
    updatedAt: '2025-11-18T14:20:00',
    lastLoginAt: '2025-11-18T14:20:00',
    emailVerified: true
  };
  res.json(profile);
});

const server = app.listen(PORT, HOST, () => {
  console.log(`Mock API server running on http://${HOST}:${PORT}`);
});

server.on('error', (err) => {
  console.error('Mock API server failed to start:', err && err.message ? err.message : err);
  if (err && err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. If you have a backend running, stop it or set a different PORT.`);
  }
  process.exit(1);
});
