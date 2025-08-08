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
  Headphones,
  Sparkles,
  ArrowUp,
  Copy,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'
import { useChatStore } from '../../lib/chat-store'
import { useCartStore } from '../../lib/store'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: 'text' | 'quick-action'
  quickActions?: QuickAction[]
  isLoading?: boolean
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
    action: 'I want to browse your products',
    icon: <ShoppingBag className="w-4 h-4" />
  },
  { 
    id: 'deals', 
    label: 'Current Deals', 
    action: 'What deals and discounts do you have?',
    icon: <Sparkles className="w-4 h-4" />
  },
  { 
    id: 'shipping', 
    label: 'Shipping Info', 
    action: 'Tell me about shipping options',
    icon: <Search className="w-4 h-4" />
  },
  { 
    id: 'support', 
    label: 'Get Help', 
    action: 'I need customer support',
    icon: <Headphones className="w-4 h-4" />
  }
]

export function ChatbotEnhanced() {
  const { isOpen, toggleChat } = useChatStore()
  const { items } = useCartStore()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI shopping assistant. I can help you find products, answer questions about orders, shipping, returns, and more. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'quick-action',
      quickActions
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessageToAPI = async (userMessage: string): Promise<string> => {
    try {
      const context = {
        currentPage: window.location.pathname,
        cartItems: items,
        userPreferences: {}
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...messages.filter(m => m.sender === 'user' || m.sender === 'bot').slice(-5),
            { role: 'user', content: userMessage }
          ],
          context
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      return data.message
    } catch (error) {
      console.error('Chat API error:', error)
      return "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or contact our support team for immediate assistance."
    }
  }

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      const response = await sendMessageToAPI(text)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error. Please try again or contact support.",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleQuickAction = (action: string) => {
    handleSendMessage(action)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        content: "Hello! I'm your AI shopping assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'quick-action',
        quickActions
      }
    ])
  }

  const unreadCount = 0 // This would come from the store in a real implementation

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
        } text-white group relative`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
            <div className="absolute -top-12 right-0 bg-black text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Chat with AI Assistant
            </div>
          </>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Shopping Assistant</h3>
                    <div className="flex items-center gap-1 text-sm text-blue-100">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Online • Ready to help
                    </div>
                  </div>
                </div>
                <button
                  onClick={clearChat}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  title="Clear chat"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 dark:bg-gray-900">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[85%] group`}>
                    {message.sender === 'bot' && (
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    )}
                    
                    <div className="flex flex-col">
                      <div
                        className={`p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        
                        {/* Quick Actions */}
                        {message.type === 'quick-action' && message.quickActions && (
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            {message.quickActions.map((action) => (
                              <button
                                key={action.id}
                                onClick={() => handleQuickAction(action.action)}
                                className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded text-xs hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
                              >
                                {action.icon}
                                {action.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Message Actions */}
                      {message.sender === 'bot' && (
                        <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => copyMessage(message.content)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                            title="Copy message"
                          >
                            <Copy className="w-3 h-3 text-gray-500" />
                          </button>
                          <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors">
                            <ThumbsUp className="w-3 h-3 text-gray-500" />
                          </button>
                          <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors">
                            <ThumbsDown className="w-3 h-3 text-gray-500" />
                          </button>
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
                  <div className="flex items-start gap-2 max-w-[85%]">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                        <span className="text-sm text-gray-500">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about products, orders, shipping..."
                  className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm resize-none"
                  disabled={isTyping}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center min-w-[48px]"
                >
                  {isTyping ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by AI • Your data is secure
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
