import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Newspaper, Calendar, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/translations'
import axios from 'axios'

const News = ({ language = 'en' }) => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const t = useTranslation(language)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/news`)
        setNews(response.data)
      } catch (error) {
        console.error('Error fetching news:', error)
      }
      setLoading(false)
    }

    fetchNews()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen pt-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <Newspaper className="h-16 w-16 text-gray-300 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-500">{t('loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('agricultureNews')}</h1>
          <p className="text-gray-600">{t('latestUpdates')}</p>
        </motion.div>

        {news.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-12"
          >
            <Newspaper className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">{t('noNewsAvailable')}</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {news.map((article, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                {article.image && (
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                  <CardDescription className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{t('publishedOn')} {new Date(article.publishedAt).toLocaleDateString()}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3 mb-4">{article.description}</p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open(article.url, '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {t('readMore')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default News