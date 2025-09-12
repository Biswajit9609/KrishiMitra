import { motion } from 'framer-motion'
import { HelpCircle, Phone, Mail, MessageCircle, Book, Video } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const Help = () => {
  const faqItems = [
    {
      question: "How do I get soil recommendations?",
      answer: "Go to Soil Advisory, select your soil type and crop, then submit for personalized fertilizer recommendations."
    },
    {
      question: "How accurate is the pest detection?",
      answer: "Our AI model has 85%+ accuracy. Take clear, well-lit photos of affected crop areas for best results."
    },
    {
      question: "How often are market prices updated?",
      answer: "Market prices are updated every 4 hours from major mandis across the country."
    },
    {
      question: "Can I use the app offline?",
      answer: "Some features work offline, but weather, market prices, and pest detection require internet connection."
    }
  ]

  const supportOptions = [
    {
      icon: <Phone className="h-6 w-6 text-green-600" />,
      title: "Phone Support",
      description: "Call our helpline for immediate assistance",
      action: "Call: 1800-123-4567",
      available: "24/7 Available"
    },
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: "Email Support",
      description: "Send us your queries via email",
      action: "Email: support@krishimitra.com",
      available: "Response within 24 hours"
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-purple-600" />,
      title: "Live Chat",
      description: "Chat with our support team",
      action: "Start Chat",
      available: "9 AM - 6 PM"
    }
  ]

  const resources = [
    {
      icon: <Book className="h-6 w-6 text-orange-600" />,
      title: "User Guide",
      description: "Complete guide to using KrishiMitra"
    },
    {
      icon: <Video className="h-6 w-6 text-red-600" />,
      title: "Video Tutorials",
      description: "Step-by-step video instructions"
    }
  ]

  return (
    <div className="min-h-screen pt-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
          <p className="text-gray-600">Get help with KrishiMitra features and find answers to common questions</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="h-5 w-5" />
                  <span>Frequently Asked Questions</span>
                </CardTitle>
                <CardDescription>Find quick answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <h4 className="font-medium text-gray-900 mb-2">{item.question}</h4>
                      <p className="text-sm text-gray-600">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Support Options */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Get in touch with our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportOptions.map((option, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0">
                        {option.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{option.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                        <p className="text-sm font-medium text-primary">{option.action}</p>
                        <p className="text-xs text-gray-500">{option.available}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Resources</CardTitle>
                <CardDescription>Tutorials and guides to help you get started</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {resources.map((resource, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start h-auto p-4"
                    >
                      <div className="flex items-center space-x-3">
                        {resource.icon}
                        <div className="text-left">
                          <div className="font-medium">{resource.title}</div>
                          <div className="text-sm text-gray-600">{resource.description}</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* App Version Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-sm text-gray-500">
                <p>KrishiMitra Version 1.0.0</p>
                <p>© 2024 KrishiMitra. All rights reserved.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Help