import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Leaf, Cloud, Bug, TrendingUp, Globe, Mic, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const LandingPage = () => {
  const features = [
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: 'Soil & Fertilizer Advisory',
      description: 'Get personalized soil health reports and fertilizer recommendations'
    },
    {
      icon: <Cloud className="h-8 w-8 text-blue-600" />,
      title: 'Weather-based Alerts',
      description: 'Receive timely weather updates and farming alerts'
    },
    {
      icon: <Bug className="h-8 w-8 text-red-600" />,
      title: 'Pest Detection',
      description: 'Upload crop images for AI-powered pest and disease detection'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      title: 'Market Price Tracking',
      description: 'Stay updated with real-time mandi prices and trends'
    },
    {
      icon: <Globe className="h-8 w-8 text-indigo-600" />,
      title: 'Multilingual Support',
      description: 'Available in multiple regional languages'
    },
    {
      icon: <Mic className="h-8 w-8 text-orange-600" />,
      title: 'Voice Interaction',
      description: 'Ask questions and get answers through voice commands'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-r from-green-600 to-blue-600 text-white overflow-hidden">
        {/* Background Illustration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <Cloud className="h-10 w-10" />
          </div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <Sun className="h-8 w-8" />
          </div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <Leaf className="h-6 w-6" />
          </div>
          <div className="absolute bottom-10 right-1/3 w-14 h-14 bg-white rounded-full flex items-center justify-center">
            <TrendingUp className="h-7 w-7" />
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
              <Leaf className="h-16 w-16" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6">KrishiMitra</h1>
          <p className="text-xl mb-8 opacity-90">Smart farming, smarter yields</p>
          <div className="space-x-4">
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-3">
                Login
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Empowering Farmers with Technology</h2>
            <p className="text-lg text-gray-600">Comprehensive farming solutions at your fingertips</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Transform Your Farming?</h2>
          <p className="text-lg text-gray-600 mb-8">Join thousands of farmers already using KrishiMitra</p>
          <Link to="/login">
            <Button size="lg" className="text-lg px-8 py-3">
              Login with Phone/Email
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

export default LandingPage