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
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-green-600 via-green-500 to-blue-600 text-white overflow-hidden">
        {/* Background Illustration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-4 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center">
            <Cloud className="h-8 w-8 sm:h-10 sm:w-10" />
          </div>
          <div className="absolute top-20 right-4 sm:right-20 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center">
            <Sun className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <div className="absolute bottom-20 left-1/4 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center">
            <Leaf className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div className="absolute bottom-10 right-1/3 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center">
            <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7" />
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <div className="flex justify-center mb-6">
            <div className="p-3 sm:p-4 bg-white/20 rounded-full backdrop-blur-sm">
              <Leaf className="h-12 w-12 sm:h-16 sm:w-16" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">KrishiMitra</h1>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">Smart farming solutions for better yields and sustainable agriculture</p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto font-semibold shadow-lg">
                Get Started
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="border-2 text-green-600 border-white  hover:bg-gray-100 hover:text-green-600 text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto font-semibold">
                Login
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Empowering Farmers with Technology</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">Comprehensive farming solutions designed to increase productivity and sustainability</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-md">
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-gradient-to-br from-green-100 to-blue-100">
                        {feature.icon}
                      </div>
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-center text-gray-600 leading-relaxed">
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
      <section className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">Ready to Transform Your Farming?</h2>
          <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">Join thousands of farmers already using KrishiMitra to improve their agricultural practices</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/login" className="w-full sm:w-auto">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto font-semibold shadow-lg">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="border-2 text-green-600 border-white  hover:bg-gray-100 hover:text-green-600 text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto font-semibold">
                View Demo
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8  bg-white">
        <div className="max-w-6xl mx-auto pb-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-2">10K+</div>
              <div className="text-sm sm:text-base text-gray-600">Active Farmers</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-2">25%</div>
              <div className="text-sm sm:text-base text-gray-600">Yield Increase</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-sm sm:text-base text-gray-600">Crops Supported</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-sm sm:text-base text-gray-600">Support Available</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage