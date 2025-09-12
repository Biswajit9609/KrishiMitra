# KrishiMitra - Smart Crop Advisory System

A comprehensive full-stack farming solution built with React.js and Node.js, featuring AI-powered crop advisory, weather insights, pest detection, and market price tracking.

## 🌾 Features

- **Soil & Fertilizer Advisory**: Personalized soil health reports and fertilizer recommendations
- **Weather-based Alerts**: Real-time weather updates and farming alerts
- **Pest Detection**: AI-powered pest and disease identification through image upload
- **Market Price Tracking**: Live mandi prices and market trends
- **Multilingual Support**: Available in multiple regional languages
- **Voice Interaction**: Voice commands and audio responses
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Tech Stack

### Frontend
- **React.js** with Vite
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Framer Motion** for animations
- **Lucide React** for icons
- **Axios** for API calls

### Backend
- **Node.js** with Express.js
- **Multer** for file uploads
- **CORS** for cross-origin requests
- **dotenv** for environment variables

## 📁 Project Structure

```
krishiMitra/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utility functions
│   │   └── hooks/         # Custom hooks
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Node.js backend
│   ├── server.js          # Main server file
│   ├── package.json
│   └── .env              # Environment variables
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   # Copy .env file and update with your API keys
   PORT=5000
   NODE_ENV=development
   WEATHER_API_KEY=your_weather_api_key_here
   MARKET_API_KEY=your_market_api_key_here
   JWT_SECRET=your_jwt_secret_here
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   # Create .env file in client directory
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=KrishiMitra
   VITE_WEATHER_API_KEY=your_weather_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP for login
- `POST /api/auth/verify-otp` - Verify OTP and authenticate

### Weather
- `GET /api/weather` - Get current weather and forecast

### Soil Analysis
- `POST /api/soil-analysis` - Get soil recommendations

### Pest Detection
- `POST /api/pest-detection` - Upload image for pest detection

### Market Prices
- `GET /api/market-prices` - Get current market prices

## 📱 Pages & Features

### 1. Landing Page
- Hero section with app introduction
- Feature showcase grid
- Call-to-action buttons

### 2. Authentication
- Phone/Email login with OTP
- Secure authentication flow

### 3. Dashboard
- Weather overview
- Soil health status
- Quick action buttons
- Market price summary

### 4. Soil Advisory
- Soil type and crop selection
- Personalized fertilizer recommendations
- Nutrient analysis display

### 5. Weather Insights
- Current weather conditions
- 7-day forecast
- Weather alerts and warnings

### 6. Pest Detection
- Image upload interface
- AI-powered pest identification
- Treatment recommendations

### 7. Market Prices
- Real-time price tracking
- Market trends and analysis
- Selling recommendations

### 8. Profile & Settings
- User profile management
- Language preferences
- App settings and notifications

## 🎨 Design System

### Colors
- Primary: Green (#16A34A)
- Secondary: Blue gradients
- Accent: Earthy browns and sky blues

### Typography
- Large headings (text-2xl font-semibold)
- Clear readable body text
- Consistent spacing and hierarchy

### Components
- Rounded corners (rounded-lg, rounded-2xl)
- Soft shadows (shadow-sm, shadow-lg)
- Hover effects and smooth transitions

## 🔧 Development

### Available Scripts

#### Frontend (client/)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

#### Backend (server/)
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 🚀 Deployment

### Frontend Deployment
1. Build the project:
   ```bash
   cd client && npm run build
   ```

2. Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Deploy to services like Heroku, Railway, or DigitalOcean
3. Update the `VITE_API_URL` in frontend environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- shadcn/ui for the beautiful component library
- Lucide React for the icon set
- Framer Motion for smooth animations
- Tailwind CSS for the utility-first styling approach

## 📞 Support

For support and questions, please open an issue in the GitHub repository or contact the development team.

---

**KrishiMitra** - Empowering farmers with smart technology for better yields and sustainable farming practices.