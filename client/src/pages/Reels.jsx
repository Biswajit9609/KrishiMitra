import { useState, useEffect, useRef } from 'react'
import { Video, Upload, Play, Pause, Heart, MessageCircle, Share, Bookmark, Download, Plus, Volume2, VolumeX, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useTranslation } from '@/lib/translations'
import axios from 'axios'

const Reels = ({ language = 'en' }) => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    file: null
  })
  const videoRefs = useRef([])
  const containerRef = useRef(null)
  const t = useTranslation(language)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/reels`)
      setVideos(response.data)
    } catch (error) {
      console.error('Error fetching videos:', error)
    }
    setLoading(false)
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('video/')) {
      setUploadForm({ ...uploadForm, file })
    }
  }

  const handleUpload = async () => {
    if (!uploadForm.file || !uploadForm.title) return

    setUploading(true)
    const formData = new FormData()
    formData.append('video', uploadForm.file)
    formData.append('title', uploadForm.title)
    formData.append('description', uploadForm.description)

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/reels/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      
      setUploadForm({ title: '', description: '', file: null })
      setUploadDialogOpen(false)
      fetchVideos()
    } catch (error) {
      console.error('Error uploading video:', error)
    }
    setUploading(false)
  }

  const handleScroll = () => {
    if (!containerRef.current) return
    const container = containerRef.current
    const scrollTop = container.scrollTop
    const videoHeight = window.innerHeight - 64
    const newIndex = Math.round(scrollTop / videoHeight)
    
    if (newIndex !== currentVideoIndex && newIndex < videos.length && newIndex >= 0) {
      setCurrentVideoIndex(newIndex)
    }
  }

  const togglePlayPause = (index) => {
    const video = videoRefs.current[index]
    if (video) {
      if (video.paused) {
        video.play()
        setIsPlaying(true)
      } else {
        video.pause()
        setIsPlaying(false)
      }
    }
  }

  const toggleMute = (index) => {
    const video = videoRefs.current[index]
    if (video) {
      video.muted = !video.muted
      setIsMuted(video.muted)
    }
  }

  const downloadVideo = async (videoUrl, title) => {
    try {
      const response = await fetch(videoUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${title}.mp4`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideoIndex) {
          video.currentTime = 0
          video.play().catch(console.error)
          setIsPlaying(true)
        } else {
          video.pause()
        }
      }
    })
  }, [currentVideoIndex])

  return (
    <div className="h-screen bg-black">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Video className="h-16 w-16 text-gray-300 animate-pulse" />
        </div>
      ) : videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-white">
          <Video className="h-24 w-24 text-gray-300 mb-4" />
          <p className="text-lg">{t('noVideosAvailable')}</p>
        </div>
      ) : (
        <div 
          ref={containerRef}
          className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          {videos.map((video, index) => (
            <div key={index} className="relative w-full snap-start flex items-center justify-center" style={{ height: 'calc(100vh - 4rem)' }}>
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={video.url}
                className="w-full object-cover"
                style={{ height: 'calc(100vh - 4rem)' }}
                loop
                muted={isMuted}
                playsInline
                preload="metadata"
                crossOrigin="anonymous"
                onClick={() => togglePlayPause(index)}
                onError={(e) => console.error('Video error:', e)}
              />
              
              {/* Video Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex items-end justify-between">
                  <div className="flex-1 mr-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{video.title}</h3>
                    <p className="text-gray-300 text-sm">{video.description}</p>
                    <div className="flex items-center text-gray-300 text-xs mt-2">
                      <Eye className="h-3 w-3 mr-1" />
                      <span>{video.views} {t('views')}</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col items-center space-y-4">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full bg-white/20 text-white hover:bg-white/30"
                    >
                      <Heart className="h-6 w-6" />
                    </Button>
                    
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full bg-white/20 text-white hover:bg-white/30"
                    >
                      <MessageCircle className="h-6 w-6" />
                    </Button>
                    
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full bg-white/20 text-white hover:bg-white/30"
                    >
                      <Share className="h-6 w-6" />
                    </Button>
                    
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full bg-white/20 text-white hover:bg-white/30"
                    >
                      <Bookmark className="h-6 w-6" />
                    </Button>
                    
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full bg-white/20 text-white hover:bg-white/30"
                      onClick={() => downloadVideo(video.url, video.title)}
                    >
                      <Download className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Play/Pause Button */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full bg-white/20 text-white hover:bg-white/30 w-16 h-16"
                    onClick={() => togglePlayPause(index)}
                  >
                    <Play className="h-8 w-8" />
                  </Button>
                </div>
              )}
              
              {/* Mute Button */}
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-4 right-4 rounded-full bg-white/20 text-white hover:bg-white/30"
                onClick={() => toggleMute(index)}
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            </div>
          ))}
        </div>
      )}
      
      {/* Floating Upload Button */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('uploadYourVideo')}</DialogTitle>
            <DialogDescription>{t('shareKnowledge')}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
            />
            <Input
              value={uploadForm.title}
              onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
              placeholder={t('videoTitle')}
            />
            <Textarea
              value={uploadForm.description}
              onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
              placeholder={t('videoDescription')}
              rows={3}
            />
            <Button 
              onClick={handleUpload} 
              disabled={!uploadForm.file || !uploadForm.title || uploading}
              className="w-full"
            >
              {uploading ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                  {t('uploadingVideo')}
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  {t('uploadVideo')}
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default Reels