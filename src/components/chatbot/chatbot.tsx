'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2,
  ShoppingBag,
  Heart,
  Search,
  Headphones
} from 'lucide-react'
import { useChatStore } from '../../lib/chat-store'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: 'text' | 'quick-action'
  quickActions?: QuickAction[]
}

interface QuickAction {
  id: string
  label: string
  action: string
  icon?: React.ReactNode
}

const quickActions: QuickAction[] = [
  { 
    id: 'products', 
    label: 'Browse Products', 
    action: 'show_products',
    icon: <ShoppingBag className="w-4 h-4" />
  },
  { 
    id: 'wishlist', 
    label: 'My Wishlist', 
    action: 'show_wishlist',
    icon: <Heart className="w-4 h-4" />
  },
  { 
    id: 'search', 
    label: 'Search Help', 
    action: 'search_help',
    icon: <Search className="w-4 h-4" />
  },
  { 
    id: 'support', 
    label: 'Customer Support', 
    action: 'customer_support',
    icon: <Headphones className="w-4 h-4" />
  }
]

export function Chatbot() {
  const { isOpen, toggleChat } = useChatStore()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your shopping assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'quick-action',
      quickActions
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI response based on keywords
    const message = userMessage.toLowerCase()
    
    if (message.includes('product') || message.includes('item')) {
      return "I can help you find products! What are you looking for specifically? You can browse our categories or search for specific items."
    }
    
    if (message.includes('price') || message.includes('cost')) {
      return "I'd be happy to help with pricing information. Could you tell me which product you're interested in?"
    }
    
    if (message.includes('shipping') || message.includes('delivery')) {
      return "We offer free shipping on orders over $50! Standard delivery takes 3-5 business days, and express delivery is available for next-day delivery."
    }
    
    if (message.includes('return') || message.includes('refund')) {
      return "We have a 30-day return policy. Items must be in original condition. Would you like me to help you start a return?"
    }
    
    if (message.includes('track') || message.includes('order')) {
      return "I can help you track your order! Do you have your order number handy?"
    }
    
    if (message.includes('size') || message.includes('fit')) {
      return "I can help with sizing! Each product page has a detailed size guide. What item are you looking at?"
    }
    
    if (message.includes('discount') || message.includes('sale') || message.includes('coupon')) {
      return "Great news! We currently have several deals running. Check out our deals page for the latest offers!"
    }
    
    return "I understand you're asking about that. Let me help you find the right information. Could you provide a bit more detail about what you're looking for?"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(async () => {
      const response = await generateResponse(inputValue)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      show_products: "Let me show you our product categories! What type of products are you interested in?",
      show_wishlist: "I can help you manage your wishlist! You can save items for later and get notifications about price drops.",
      search_help: "I can help you search more effectively! Try using specific keywords, brands, or categories.",
      customer_support: "I'm here to help with any questions! You can also reach our human support team at support@modernecommerce.com or call 1-800-SHOP-NOW."
    }

    const botMessage: Message = {
      id: Date.now().toString(),
      content: actionMessages[action] || "I'm here to help!",
      sender: 'bot',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, botMessage])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-blue-600 text-white rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Shopping Assistant</h3>
                  <p className="text-sm text-blue-100">Online • Ready to help</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%]`}>
                    {message.sender === 'bot' && (
                      <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    )}
                    
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      
                      {/* Quick Actions */}
                      {message.type === 'quick-action' && message.quickActions && (
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          {message.quickActions.map((action) => (
                            <button
                              key={action.id}
                              onClick={() => handleQuickAction(action.action)}
                              className="flex items-center gap-2 p-2 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded text-xs hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
                            >
                              {action.icon}
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {message.sender === 'user' && (
                      <div className="w-6 h-6 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2 max-w-[80%]">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                      <div className="flex items-center gap-1">
                        <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                        <span className="text-sm text-gray-500">Typing...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
