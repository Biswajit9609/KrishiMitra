import { useState } from 'react'
import { Mic, MicOff, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

const VoiceBar = () => {
  const [isListening, setIsListening] = useState(false)
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')

  const handleVoiceToggle = () => {
    setIsListening(!isListening)
    if (!isListening) {
      // Mock voice recognition
      setTimeout(() => {
        setMessage('What is the weather forecast for today?')
        setIsListening(false)
      }, 2000)
    }
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // Mock AI response
      setResponse('Today\'s weather: 28°C, partly cloudy with 20% chance of rain. Good day for farming activities.')
      setMessage('')
    }
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <Card className="p-4 bg-white/95 backdrop-blur-sm border shadow-lg">
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
            onChange={(e) => setMessage(e.target.value)}
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
    </div>
  )
}

export default VoiceBar