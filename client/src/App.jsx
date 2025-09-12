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
          
          <main className="flex-1 lg:pl-72">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
              <Route path="/dashboard" element={<Dashboard language={language} />} />
              <Route path="/soil-advisory" element={<SoilAdvisory language={language} />} />
              <Route path="/weather" element={<WeatherInsights language={language} />} />
              <Route path="/pest-detection" element={<PestDetection language={language} />} />
              <Route path="/market-prices" element={<MarketPrices language={language} />} />
              <Route path="/profile" element={<Profile user={user} language={language} />} />
              <Route path="/settings" element={<Settings language={language} />} />
              <Route path="/help" element={<Help language={language} />} />
            </Routes>
          </main>
        </div>

        {isAuthenticated && <VoiceBar />}
      </div>
    </Router>
  )
}

export default App