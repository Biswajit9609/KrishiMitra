import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Phone, Mail, MapPin, Globe, LogOut, Edit, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTranslation } from '@/lib/translations'

const Profile = ({ user, language = 'en' }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || 'Farmer Name',
    phone: user?.phone || '+91 9876543210',
    email: 'farmer@example.com',
    location: 'Village, District, State',
    language: 'en',
    crops: ['wheat', 'rice']
  })
  const t = useTranslation(language)

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ' }
  ]

  const cropOptions = [
    'wheat', 'rice', 'corn', 'barley', 'sugarcane', 'cotton', 'soybean', 'potato', 'tomato', 'onion'
  ]

  const handleSave = () => {
    // Save profile data
    setIsEditing(false)
  }

  const handleLogout = () => {
    // Handle logout
    window.location.href = '/'
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('profileSettings')}</h1>
          <p className="text-gray-600">{t('manageAccount')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <CardTitle>{formData.name}</CardTitle>
                <CardDescription>{t('farmer')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{formData.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{formData.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{formData.location}</span>
                </div>
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('logout')}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{t('personalInformation')}</CardTitle>
                    <CardDescription>{t('updateProfileDetails')}</CardDescription>
                  </div>
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  >
                    {isEditing ? (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {t('save')}
                      </>
                    ) : (
                      <>
                        <Edit className="mr-2 h-4 w-4" />
                        {t('edit')}
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('fullName')}</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('phoneNumber')}</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('emailAddress')}</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('location')}</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    disabled={!isEditing}
                    placeholder={t('villageDistrictState')}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('preferredLanguage')}</label>
                  <Select 
                    value={formData.language} 
                    onValueChange={(value) => setFormData({...formData, language: value})}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <Globe className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('cropsOfInterest')}</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {cropOptions.map((crop) => (
                      <label key={crop} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.crops.includes(crop)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                crops: [...formData.crops, crop]
                              })
                            } else {
                              setFormData({
                                ...formData,
                                crops: formData.crops.filter(c => c !== crop)
                              })
                            }
                          }}
                          disabled={!isEditing}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm capitalize">{crop}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* App Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>{t('appPreferences')}</CardTitle>
              <CardDescription>{t('customizeExperience')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{t('weatherNotifications')}</h4>
                    <p className="text-sm text-gray-600">{t('receiveWeatherAlerts')}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{t('marketPriceAlerts')}</h4>
                    <p className="text-sm text-gray-600">{t('getPriceNotifications')}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{t('voiceAssistant')}</h4>
                    <p className="text-sm text-gray-600">{t('enableVoiceCommands')}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile