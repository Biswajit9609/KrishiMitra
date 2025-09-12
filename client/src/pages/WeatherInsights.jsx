import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cloud, Sun, CloudRain, Thermometer, Droplets, Wind, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslation } from '@/lib/translations'
import axios from 'axios'

const WeatherInsights = ({ language = 'en' }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const t = useTranslation(language)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/weather`)
        setWeatherData(response.data)
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
      setLoading(false)
    }

    fetchWeatherData()
  }, [])

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="h-8 w-8 text-yellow-500" />
      case 'cloudy':
        return <Cloud className="h-8 w-8 text-gray-500" />
      case 'rainy':
        return <CloudRain className="h-8 w-8 text-blue-500" />
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <Cloud className="h-16 w-16 text-gray-300 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-500">Loading weather data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('weatherInsights')}</h1>
          <p className="text-gray-600">{t('stayInformed')}</p>
        </motion.div>

        {/* Current Weather */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl">{t('currentWeather')}</CardTitle>
              <CardDescription className="text-blue-100">
                {t('realTimeConditions')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-4">
                  <Thermometer className="h-12 w-12" />
                  <div>
                    <p className="text-3xl font-bold">{weatherData?.temperature}°C</p>
                    <p className="text-blue-100">{t('temperature')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Droplets className="h-12 w-12" />
                  <div>
                    <p className="text-3xl font-bold">{weatherData?.humidity}%</p>
                    <p className="text-blue-100">{t('humidity')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <CloudRain className="h-12 w-12" />
                  <div>
                    <p className="text-3xl font-bold">{weatherData?.rainfall}%</p>
                    <p className="text-blue-100">{t('rainChance')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 7-Day Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>{t('sevenDayForecast')}</CardTitle>
              <CardDescription>{t('planActivities')}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Temperature Chart */}
              <div className="mb-6">
                <div className="h-32 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                  <div className="w-full h-full flex items-end justify-between">
                    {weatherData?.forecast?.map((day, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="text-xs mb-1 text-gray-600">{day.temp}°C</div>
                        <div
                          className="w-6 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t transition-all duration-500"
                          style={{ height: `${((day.temp - 20) / 15) * 100}%` }}
                        />
                        <span className="text-xs mt-2 text-gray-600">{day.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Weather Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {weatherData?.forecast?.map((day, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{day.day}</h4>
                      {getWeatherIcon(day.condition)}
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{day.temp}°C</p>
                    <p className="text-sm text-gray-600">{day.condition}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weather Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <span>{t('weatherAlerts')}</span>
              </CardTitle>
              <CardDescription>{t('importantWarnings')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Heavy Rain Expected</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Heavy rainfall expected tomorrow. Consider postponing irrigation and protect crops from waterlogging.
                      </p>
                      <p className="text-xs text-yellow-600 mt-2">Valid until: Tomorrow 6:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Wind className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">Strong Winds Advisory</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Wind speeds up to 25 km/h expected. Secure loose farming equipment and check crop support structures.
                      </p>
                      <p className="text-xs text-blue-600 mt-2">Valid until: Day after tomorrow 12:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default WeatherInsights