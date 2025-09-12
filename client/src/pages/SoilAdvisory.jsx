import { useState } from 'react'
import { motion } from 'framer-motion'
import { Leaf, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useTranslation } from '@/lib/translations'
import axios from 'axios'

const SoilAdvisory = ({ language = 'en' }) => {
  const [formData, setFormData] = useState({
    soilType: '',
    cropType: '',
    location: ''
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const t = useTranslation(language)

  const soilTypes = [
    'Clay', 'Sandy', 'Loamy', 'Silt', 'Peaty', 'Chalky'
  ]

  const cropTypes = [
    'Wheat', 'Rice', 'Corn', 'Barley', 'Sugarcane', 'Cotton', 'Soybean', 'Potato'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.soilType || !formData.cropType || !formData.location) return

    setLoading(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/soil-analysis`, formData)
      setResult(response.data)
    } catch (error) {
      console.error('Error analyzing soil:', error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('soilAdvisory')}</h1>
          <p className="text-gray-600">{t('provideDetails')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  <span>{t('soilAnalysisForm')}</span>
                </CardTitle>
                <CardDescription>
                  {t('provideDetails')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('soilType')}</label>
                    <Select value={formData.soilType} onValueChange={(value) => setFormData({...formData, soilType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        {soilTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('cropType')}</label>
                    <Select value={formData.cropType} onValueChange={(value) => setFormData({...formData, cropType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop type" />
                      </SelectTrigger>
                      <SelectContent>
                        {cropTypes.map((crop) => (
                          <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('location')}</label>
                    <Input
                      placeholder={t('enterLocation')}
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={loading || !formData.soilType || !formData.cropType || !formData.location}
                  >
                    {loading ? t('analyzing') : t('getSoilAdvisory')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {result ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Soil Analysis Results</CardTitle>
                  <CardDescription>
                    Based on {result.soilType} soil and {result.cropType} crop
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900">Nitrogen</h4>
                      <p className="text-blue-700">{result.nitrogen}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900">Phosphorus</h4>
                      <p className="text-green-700">{result.phosphorus}</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-900">Potassium</h4>
                      <p className="text-purple-700">{result.potassium}</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <h4 className="font-medium text-orange-900">pH Level</h4>
                      <p className="text-orange-700">{result.ph}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-900 mb-2">Recommendation</h4>
                    <p className="text-green-800">{result.recommendation}</p>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF Report
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center">
                  <Leaf className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Fill out the form to get your soil analysis results</p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SoilAdvisory