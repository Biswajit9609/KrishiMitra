import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, Mail, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import axios from 'axios'

const LoginPage = ({ setIsAuthenticated, setUser }) => {
  const [phone, setPhone] = useState('')
  const [showOtpDialog, setShowOtpDialog] = useState(false)
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSendOtp = async () => {
    if (!phone) return
    
    setLoading(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/send-otp`, { phone })
      if (response.data.success) {
        setShowOtpDialog(true)
      }
    } catch (error) {
      console.error('Error sending OTP:', error)
    }
    setLoading(false)
  }

  const handleVerifyOtp = async () => {
    if (!otp) return
    
    setLoading(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/verify-otp`, { phone, otp })
      if (response.data.success) {
        setUser(response.data.user)
        setIsAuthenticated(true)
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Error verifying OTP:', error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Welcome to KrishiMitra</CardTitle>
            <CardDescription>Quick & secure login with OTP</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number or Email</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Enter phone number or email"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Button 
              onClick={handleSendOtp}
              disabled={!phone || loading}
              className="w-full"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </Button>
            
            <div className="text-center text-sm text-gray-600">
              By continuing, you agree to our Terms of Service
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* OTP Dialog */}
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter OTP</DialogTitle>
            <DialogDescription>
              We've sent a 6-digit code to {phone}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Input
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="text-center text-lg tracking-widest"
            />
            
            <Button 
              onClick={handleVerifyOtp}
              disabled={otp.length !== 6 || loading}
              className="w-full"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Button>
            
            <div className="text-center">
              <Button variant="ghost" onClick={handleSendOtp}>
                Resend OTP
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default LoginPage