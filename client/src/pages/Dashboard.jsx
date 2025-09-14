import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Cloud, Leaf, Bug, TrendingUp, ArrowRight, Thermometer, Droplets } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTranslation, convertNumbers } from '@/lib/translations'
import axios from 'axios'

const Dashboard = ({ language = 'en' }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [marketData, setMarketData] = useState(null)
  const [loading, setLoading] = useState(true)
  const t = useTranslation(language)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [weatherRes, marketRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/weather`),
          axios.get(`${import.meta.env.VITE_API_URL}/market-prices`)
        ])
        
        setWeatherData(weatherRes.data)
        setMarketData(marketRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  const dashboardCards = [
    {
      title: t('weatherToday'),
      icon: <Cloud className="h-6 w-6 text-blue-600" />,
      content: weatherData ? (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Thermometer className="h-4 w-4 text-red-500" />
            <span>{convertNumbers(weatherData.temperature, language)}°C</span>
          </div>
          <div className="flex items-center space-x-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <span>{convertNumbers(weatherData.humidity, language)}% {t('humidity')}</span>
          </div>
          <p className="text-sm text-gray-600">{convertNumbers(weatherData.rainfall, language)}% {t('chanceOfRain')}</p>
        </div>
      ) : t('loading'),
      link: '/weather',
      linkText: t('viewDetails')
    },
    {
      title: t('soilHealth'),
      icon: <Leaf className="h-6 w-6 text-green-600" />,
      content: (
        <div className="space-y-2">
          <p className="text-sm">{t('lastAnalysis')}: {convertNumbers('2', language)} {t('daysAgo')}</p>
          <p className="text-sm text-gray-600">Nitrogen: Medium, pH: {convertNumbers('6.5', language)}</p>
          <p className="text-sm font-medium text-green-600">{t('fertilizerDue')} {convertNumbers('3', language)} {t('days')}</p>
        </div>
      ),
      link: '/soil-advisory',
      linkText: t('getAdvisory')
    },
    {
      title: t('pestDetection'),
      icon: <Bug className="h-6 w-6 text-red-600" />,
      content: (
        <div className="space-y-2">
          <p className="text-sm">{t('uploadCropImages')}</p>
          <p className="text-sm text-gray-600">{t('aiPoweredIdentification')}</p>
        </div>
      ),
      link: '/pest-detection',
      linkText: t('uploadImage')
    },
    {
      title: t('marketPrices'),
      icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
      content: marketData ? (
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">{t('wheat')}</span>
            <span className="text-sm font-medium">₹{convertNumbers(marketData.wheat.price, language)}/{t('quintal')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">{t('rice')}</span>
            <span className="text-sm font-medium">₹{convertNumbers(marketData.rice.price, language)}/{t('quintal')}</span>
          </div>
        </div>
      ) : t('loading'),
      link: '/market-prices',
      linkText: t('viewAllPrices')
    }
  ]

  return (
    <div className="min-h-screen pt-20 pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{t('dashboard')}</h1>
          <p className="text-gray-600 text-sm sm:text-base">{t('welcomeBack')}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {dashboardCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 bg-white border-0 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base sm:text-lg font-medium">{card.title}</CardTitle>
                  <div className="p-2 rounded-full bg-gradient-to-br from-green-100 to-blue-100">
                    {card.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 text-sm sm:text-base">
                    {card.content}
                  </div>
                  <Link to={card.link}>
                    <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm hover:bg-green-50">
                      {card.linkText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{t('quickActions')}</CardTitle>
              <CardDescription>{t('frequentlyUsed')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <Link to="/soil-advisory">
                  <Button variant="outline" className="w-full h-16 sm:h-20 flex flex-col hover:bg-green-50 hover:border-green-200 transition-colors">
                    <Leaf className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2 text-green-600" />
                    <span className="text-xs font-medium">{t('soilTest')}</span>
                  </Button>
                </Link>
                <Link to="/weather">
                  <Button variant="outline" className="w-full h-16 sm:h-20 flex flex-col hover:bg-blue-50 hover:border-blue-200 transition-colors">
                    <Cloud className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2 text-blue-600" />
                    <span className="text-xs font-medium">{t('weather')}</span>
                  </Button>
                </Link>
                <Link to="/pest-detection">
                  <Button variant="outline" className="w-full h-16 sm:h-20 flex flex-col hover:bg-red-50 hover:border-red-200 transition-colors">
                    <Bug className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2 text-red-600" />
                    <span className="text-xs font-medium">{t('pestCheck')}</span>
                  </Button>
                </Link>
                <Link to="/market-prices">
                  <Button variant="outline" className="w-full h-16 sm:h-20 flex flex-col hover:bg-purple-50 hover:border-purple-200 transition-colors">
                    <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2 text-purple-600" />
                    <span className="text-xs font-medium">{t('prices')}</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Farmer Tips Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 sm:mt-8"
        >
          <Card className="bg-white border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">{t('dailyTips')}</CardTitle>
              <CardDescription className="text-sm sm:text-base">{t('expertAdvice')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 sm:p-6 rounded-lg border border-green-100">
                <p className="text-sm sm:text-base font-medium text-green-800 mb-2 sm:mb-3">💡 {t('todaysTip')}</p>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">Apply organic compost 2-3 weeks before sowing to improve soil fertility and water retention capacity. This practice enhances nutrient availability and promotes healthy root development.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard