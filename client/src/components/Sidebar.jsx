import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Leaf, 
  Cloud, 
  Bug, 
  TrendingUp, 
  User, 
  X,
  Home,
  Settings,
  HelpCircle,
  Newspaper,
  Video
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/translations'
import { cn } from '@/lib/utils'

const Sidebar = ({ isOpen, setIsOpen, language = 'en' }) => {
  const location = useLocation()
  const t = useTranslation(language)

  const menuItems = [
    { icon: LayoutDashboard, label: t('dashboard'), path: '/dashboard' },
    { icon: Leaf, label: t('soilAdvisory'), path: '/soil-advisory' },
    { icon: Cloud, label: t('weather'), path: '/weather' },
    { icon: Bug, label: t('pestDetection'), path: '/pest-detection' },
    { icon: TrendingUp, label: t('marketPrices'), path: '/market-prices' },
    { icon: Newspaper, label: t('news'), path: '/news' },
    { icon: Video, label: t('reels'), path: '/reels' },
    { icon: User, label: t('profile'), path: '/profile' },
  ]

  const bottomItems = [
    { icon: Settings, label: t('settings'), path: '/settings' },
    { icon: HelpCircle, label: t('help'), path: '/help' },
  ]

  // Don't show sidebar on landing and login pages
  if (location.pathname === '/' || location.pathname === '/login') {
    return null
  }

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.div
          initial={{ x: -280 }}
          animate={{ x: isOpen ? 0 : -280 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className={cn(
            "fixed left-0 top-0 h-screen w-72 bg-white border-r shadow-lg z-50 overflow-y-auto",
            "lg:hidden"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b lg:hidden">
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">KrishiMitra</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col h-full">
            <div className="flex-1 py-4">
              <div className="px-3 mb-4">
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Main Menu
                </h2>
              </div>
              
              <div className="space-y-1 px-3">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Bottom Items */}
            <div className="border-t p-3">
              <div className="space-y-1">
                {bottomItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </nav>
        </motion.div>
      </AnimatePresence>

      {/* Desktop Sidebar - Always visible */}
      {!isOpen && (
        <div className="hidden lg:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-72 bg-white border-r shadow-sm z-30 overflow-y-auto">
          <nav className="flex flex-col h-full">
            <div className="flex-1 py-4">
              <div className="px-3 mb-4">
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Main Menu
                </h2>
              </div>
              
              <div className="space-y-1 px-3">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Bottom Items */}
            <div className="border-t p-3">
              <div className="space-y-1">
                {bottomItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}

export default Sidebar