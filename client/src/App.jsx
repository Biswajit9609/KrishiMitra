import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import SoilAdvisory from './pages/SoilAdvisory'
import WeatherInsights from './pages/WeatherInsights'
import PestDetection from './pages/PestDetection'
import MarketPrices from './pages/MarketPrices'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Help from './pages/Help'
import VoiceBar from './components/VoiceBar'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true) // Set to true for demo
  const [user, setUser] = useState({ name: 'Farmer Name', phone: '+91 9876543210' })
  const [language, setLanguage] = useState('en')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Navbar 
          user={user} 
          language={language} 
          setLanguage={setLanguage}
          setSidebarOpen={setSidebarOpen}
        />
        
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} language={language} />
          
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
            <Route path="/dashboard" element={<div className="flex-1 lg:pl-72"><Dashboard language={language} /></div>} />
            <Route path="/soil-advisory" element={<div className="flex-1 lg:pl-72"><SoilAdvisory language={language} /></div>} />
            <Route path="/weather" element={<div className="flex-1 lg:pl-72"><WeatherInsights language={language} /></div>} />
            <Route path="/pest-detection" element={<div className="flex-1 lg:pl-72"><PestDetection language={language} /></div>} />
            <Route path="/market-prices" element={<div className="flex-1 lg:pl-72"><MarketPrices language={language} /></div>} />
            <Route path="/profile" element={<div className="flex-1 lg:pl-72"><Profile user={user} language={language} /></div>} />
            <Route path="/settings" element={<div className="flex-1 lg:pl-72"><Settings language={language} /></div>} />
            <Route path="/help" element={<div className="flex-1 lg:pl-72"><Help language={language} /></div>} />
          </Routes>
        </div>

        {isAuthenticated && <VoiceBar />}
      </div>
    </Router>
  )
}

export default App