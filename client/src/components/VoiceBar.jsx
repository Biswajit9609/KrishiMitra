import { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, Send, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'

const VoiceBar = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const inactivityTimer = useRef(null)

  const resetInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current)
    }
    
    if (isExpanded) {
      inactivityTimer.current = setTimeout(() => {
        setIsExpanded(false)
      }, 10000)
    }
  }

  const handleExpand = () => {
    setIsExpanded(true)
    resetInactivityTimer()
  }

  const handleCollapse = () => {
    setIsExpanded(false)
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current)
    }
  }

  const handleVoiceToggle = () => {
    setIsListening(!isListening)
    resetInactivityTimer()
    
    if (!isListening) {
      setTimeout(() => {
        setMessage('What is the weather forecast for today?')
        setIsListening(false)
        resetInactivityTimer()
      }, 2000)
    }
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      setResponse('Today\'s weather: 28°C, partly cloudy with 20% chance of rain. Good day for farming activities.')
      setMessage('')
      resetInactivityTimer()
    }
  }

  const handleInputChange = (e) => {
    setMessage(e.target.value)
    resetInactivityTimer()
  }

  useEffect(() => {
    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current)
      }
    }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {!isExpanded ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={handleExpand}
              size="icon"
              className="w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
            >
              <Mic className="h-6 w-6" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-80"
          >
            <Card className="p-4 bg-white/95 backdrop-blur-sm border shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-sm">Voice Assistant</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCollapse}
                  className="h-6 w-6"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {response && (
                <div className="mb-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800">{response}</p>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={isListening ? "destructive" : "default"}
                  size="icon"
                  onClick={handleVoiceToggle}
                  className="shrink-0"
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                
                <Input
                  placeholder={isListening ? "Listening..." : "Ask me anything about farming..."}
                  value={message}
                  onChange={handleInputChange}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isListening}
                  className="flex-1"
                />
                
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isListening}
                  size="icon"
                  className="shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default VoiceBar