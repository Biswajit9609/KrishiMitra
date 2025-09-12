import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Camera, Bug, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dropzone } from '@/components/ui/dropzone'
import { useTranslation, convertNumbers } from '@/lib/translations'
import axios from 'axios'

const PestDetection = ({ language = 'en' }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const t = useTranslation(language)

  const handleImageSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (files) => {
    if (files[0]) {
      setSelectedImage(files[0])
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(files[0])
    }
  }

  const handleAnalyze = async () => {
    if (!selectedImage) return

    setLoading(true)
    const formData = new FormData()
    formData.append('image', selectedImage)

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/pest-detection`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setResult(response.data)
    } catch (error) {
      console.error('Error analyzing image:', error)
    }
    setLoading(false)
  }

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('pestAndDiseaseDetection')}</h1>
          <p className="text-gray-600">{t('uploadCropImages')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="h-5 w-5 text-blue-600" />
                  <span>{t('uploadCropImage')}</span>
                </CardTitle>
                <CardDescription>
                  {t('takeClearPhoto')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Dropzone
                    onDrop={(files) => {
                      if (files[0]) {
                        const event = { target: { files } }
                        handleImageSelect(event)
                      }
                    }}
                  />
                </label>

                {imagePreview && (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt={t('preview')}
                        className="w-full h-64 object-cover rounded-lg border"
                      />
                    </div>
                    <Button 
                      onClick={handleAnalyze}
                      disabled={loading}
                      className="w-full"
                    >
                      {loading ? t('analyzing') : t('analyzeImage')}
                    </Button>
                  </div>
                )}
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
                  <CardTitle className="flex items-center space-x-2">
                    <Bug className="h-5 w-5 text-red-600" />
                    <span>{t('detectionResults')}</span>
                  </CardTitle>
                  <CardDescription>
                    {t('aiAnalysisCompleted')} {convertNumbers(result.confidence, language)}% {t('confidence')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <h4 className="font-medium text-red-900">{t('detectedIssue')}</h4>
                    </div>
                    <p className="text-red-800 font-medium">{result.detected}</p>
                  </div>

                  <div className={`p-3 rounded-lg border ${getSeverityColor(result.severity)}`}>
                    <h4 className="font-medium mb-1">{t('severityLevel')}</h4>
                    <p className="capitalize">{result.severity}</p>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h4 className="font-medium text-green-900">{t('recommendedTreatment')}</h4>
                    </div>
                    <p className="text-green-800">{result.treatment}</p>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">{t('preventionTips')}</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• {t('tipRegularMonitoring')}</li>
                      <li>• {t('tipFieldHygiene')}</li>
                      <li>• {t('tipResistantVarieties')}</li>
                      <li>• {t('tipIPM')}</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center">
                  <Bug className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">{t('uploadToGetStarted')}</p>
                  <p className="text-sm text-gray-400">{t('aiWillAnalyze')}</p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>{t('photographyTips')}</CardTitle>
              <CardDescription>{t('getBetterResults')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-green-600">✓ {t('do')}</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• {t('doGoodLighting')}</li>
                    <li>• {t('doFocusAffected')}</li>
                    <li>• {t('doMultipleAngles')}</li>
                    <li>• {t('doClearSharp')}</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-red-600">✗ {t('dont')}</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• {t('dontBlurryDark')}</li>
                    <li>• {t('dontTooMuchBackground')}</li>
                    <li>• {t('dontFarAway')}</li>
                    <li>• {t('dontFiltered')}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default PestDetection