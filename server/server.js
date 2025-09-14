const express = require('express');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const PORT = process.env.PORT || 3001;

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

const mockNews = [
  {
    title: 'New Drought-Resistant Wheat Variety Released',
    description: 'Scientists have developed a new wheat variety that can withstand drought conditions and produce higher yields.',
    url: 'https://example.com/news/1',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
    publishedAt: new Date().toISOString()
  },
  {
    title: 'Government Announces New Subsidy for Organic Farming',
    description: 'The agriculture ministry has announced increased subsidies for farmers transitioning to organic farming practices.',
    url: 'https://example.com/news/2',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400',
    publishedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    title: 'Smart Irrigation Technology Reduces Water Usage by 40%',
    description: 'New IoT-based irrigation systems are helping farmers save water while maintaining crop productivity.',
    url: 'https://example.com/news/3',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    publishedAt: new Date(Date.now() - 172800000).toISOString()
  }
];

let mockVideos = [
  {
    id: 1,
    title: 'Proper Wheat Sowing Technique',
    description: 'Learn the correct method for sowing wheat seeds for maximum yield.',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=400&fit=crop',
    duration: 45,
    views: 1250,
    uploadedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Organic Pest Control Methods',
    description: 'Natural ways to control pests without harmful chemicals.',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=400&fit=crop',
    duration: 60,
    views: 890,
    uploadedAt: new Date(Date.now() - 86400000).toISOString()
  }
];

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

// News endpoints
app.get('/api/news', (req, res) => {
  res.json(mockNews);
});

// Reels endpoints
app.get('/api/reels', (req, res) => {
  res.json(mockVideos);
});

app.post('/api/reels/upload', upload.single('video'), async (req, res) => {
  const { title, description } = req.body;
  const file = req.file;
  
  if (!file || !title) {
    return res.status(400).json({ error: 'Video file and title are required' });
  }
  
  try {
    // Upload video to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'video',
          folder: 'krishi-mitra/reels',
          transformation: [
            { width: 400, height: 600, crop: 'fill' },
            { quality: 'auto' },
            { format: 'mp4' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(file.buffer);
    });
    
    const newVideo = {
      id: mockVideos.length + 1,
      title,
      description: description || '',
      url: result.secure_url,
      thumbnail: result.secure_url.replace(/\.(mp4|mov|avi)$/i, '.jpg'),
      duration: Math.floor(result.duration || 30),
      views: 0,
      uploadedAt: new Date().toISOString(),
      cloudinaryId: result.public_id
    };
    
    mockVideos.unshift(newVideo);
    
    res.json({
      success: true,
      message: 'Video uploaded successfully',
      video: newVideo
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ error: 'Failed to upload video' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});