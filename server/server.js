const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Mock data
const mockWeatherData = {
  temperature: 28,
  humidity: 65,
  rainfall: 20,
  forecast: [
    { day: 'Today', temp: 28, condition: 'Sunny' },
    { day: 'Tomorrow', temp: 26, condition: 'Cloudy' },
    { day: 'Day 3', temp: 24, condition: 'Rainy' }
  ]
};

const mockMarketPrices = {
  wheat: { price: 2100, trend: 'up', change: '+50' },
  rice: { price: 3200, trend: 'down', change: '-30' },
  corn: { price: 1800, trend: 'stable', change: '0' }
};

const mockSoilData = {
  nitrogen: 'Medium',
  phosphorus: 'Low',
  potassium: 'High',
  ph: 6.5,
  recommendation: 'Apply NPK fertilizer 10:26:26 at 200kg/hectare'
};

// Routes
app.get('/api/weather', (req, res) => {
  res.json(mockWeatherData);
});

app.get('/api/market-prices', (req, res) => {
  res.json(mockMarketPrices);
});

app.post('/api/soil-analysis', (req, res) => {
  const { soilType, cropType, location } = req.body;
  res.json({
    ...mockSoilData,
    soilType,
    cropType,
    location
  });
});

app.post('/api/pest-detection', upload.single('image'), (req, res) => {
  // Mock pest detection response
  res.json({
    detected: 'Aphids',
    confidence: 85,
    treatment: 'Apply neem oil spray every 3 days for 2 weeks',
    severity: 'Medium'
  });
});

app.post('/api/auth/send-otp', (req, res) => {
  const { phone } = req.body;
  res.json({
    success: true,
    message: 'OTP sent successfully',
    otp: '123456' // Mock OTP
  });
});

app.post('/api/auth/verify-otp', (req, res) => {
  const { phone, otp } = req.body;
  if (otp === '123456') {
    res.json({
      success: true,
      token: 'mock-jwt-token',
      user: { phone, name: 'Farmer Name' }
    });
  } else {
    res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});