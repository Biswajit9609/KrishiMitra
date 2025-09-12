import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, Search, IndianRupee } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useTranslation, convertNumbers } from '@/lib/translations'
import axios from 'axios'

const MarketPrices = ({ language = 'en' }) => {
  const [marketData, setMarketData] = useState(null)
  const [selectedCrop, setSelectedCrop] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const t = useTranslation(language)

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/market-prices`)
        setMarketData(response.data)
      } catch (error) {
        console.error('Error fetching market data:', error)
      }
      setLoading(false)
    }

    fetchMarketData()
  }, [])

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-600'
      case 'down': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const crops = ['all', 'wheat', 'rice', 'corn', 'barley', 'sugarcane']

  if (loading) {
    return (
      <div className="min-h-screen pt-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-500">Loading market prices...</p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('marketPricesPage')}</h1>
          <p className="text-gray-600">{t('stayUpdatedPrices')}</p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder={t('searchCrops')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map((crop) => (
                      <SelectItem key={crop} value={crop}>
                        {crop === 'all' ? t('allCrops') : crop.charAt(0).toUpperCase() + crop.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Price Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {marketData && Object.entries(marketData).map(([crop, data], index) => (
            <Card key={crop} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="capitalize">{crop}</CardTitle>
                  {getTrendIcon(data.trend)}
                </div>
                <CardDescription>{t('perQuintal')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <IndianRupee className="h-5 w-5 text-gray-600" />
                    <span className="text-2xl font-bold">₹{convertNumbers(data.price, language)}</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${getTrendColor(data.trend)}`}>
                    {getTrendIcon(data.trend)}
                    <span className="text-sm font-medium">
                      {data.change > 0 ? '+' : ''}{data.change}
                    </span>
                    <span className="text-sm">{t('fromYesterday')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Market Advisory */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Market Advisory</span>
              </CardTitle>
              <CardDescription>Best selling recommendations based on current trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Best Time to Sell</h4>
                  <p className="text-sm text-green-800 mb-3">
                    Wheat prices are trending upward. Consider selling within the next 3-5 days for maximum profit.
                  </p>
                  <div className="text-xs text-green-700">
                    Expected price range: ₹2,150 - ₹2,200 per quintal
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Market Insights</h4>
                  <p className="text-sm text-blue-800 mb-3">
                    Rice demand is stable with seasonal variations. Monitor prices for the next week.
                  </p>
                  <div className="text-xs text-blue-700">
                    Recommended action: Hold for better prices
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Price Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Price Trends</CardTitle>
              <CardDescription>7-day price movement for wheat (₹/quintal)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-50 rounded-lg p-4">
                <div className="w-full h-full flex items-end justify-between">
                  {[
                    { day: 'Mon', price: 2050 },
                    { day: 'Tue', price: 2080 },
                    { day: 'Wed', price: 2070 },
                    { day: 'Thu', price: 2100 },
                    { day: 'Fri', price: 2120 },
                    { day: 'Sat', price: 2110 },
                    { day: 'Sun', price: 2130 }
                  ].map((point, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="text-xs mb-1 text-gray-600">₹{point.price}</div>
                      <div
                        className="w-8 bg-primary rounded-t transition-all duration-500"
                        style={{ height: `${((point.price - 2000) / 200) * 100}%` }}
                      />
                      <span className="text-xs mt-2 text-gray-600">{point.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default MarketPrices