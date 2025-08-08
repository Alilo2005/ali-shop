'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Sparkles, ShoppingBag } from 'lucide-react'

export function ChatbotSimple() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi! I'm your AI shopping assistant! How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
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

  const quickReplies = [
    { text: "🛍️ Browse Products", value: "I want to browse your products" },
    { text: "💰 Current Deals", value: "What deals do you have?" },
    { text: "📦 Shipping Info", value: "Tell me about shipping" },
    { text: "💬 Get Help", value: "I need customer support" }
  ]

  const botResponses = {
    "browse": "Great! I can help you find products. What are you looking for? We have electronics, clothing, home goods, and more! 🛍️",
    "deals": "🎉 Amazing deals right now:\n• 20% off electronics\n• Buy 2 get 1 free clothing\n• Free shipping on orders $50+\n• Student discount: 15% off",
    "shipping": "📦 Shipping options:\n• Free standard (3-5 days) on $50+\n• Express (1-2 days) - $9.99\n• Same-day in select cities\n• International shipping available",
    "help": "I'm here to help! 😊 You can ask me about:\n• Products and recommendations\n• Orders and tracking\n• Returns and exchanges\n• Account questions",
    "default": "I'd be happy to help you with that! Can you tell me more about what you're looking for? I can assist with products, orders, shipping, or any other questions! 💬"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue('')
    setIsTyping(true)

    try {
      // Call our AI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...messages.slice(-5).map(m => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              content: m.text
            })),
            { role: 'user', content: currentInput }
          ],
          context: {
            currentPage: window.location.pathname,
            userPreferences: {}
          }
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      const botMessage = {
        id: messages.length + 2,
        text: data.message,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Chat API error:', error)
      
      // Fallback to local response on error
      const lowerInput = currentInput.toLowerCase()
      let response = botResponses.default

      if (lowerInput.includes('product') || lowerInput.includes('browse') || lowerInput.includes('shop')) {
        response = botResponses.browse
      } else if (lowerInput.includes('deal') || lowerInput.includes('sale') || lowerInput.includes('discount')) {
        response = botResponses.deals
      } else if (lowerInput.includes('ship') || lowerInput.includes('delivery')) {
        response = botResponses.shipping
      } else if (lowerInput.includes('help') || lowerInput.includes('support')) {
        response = botResponses.help
      }

      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleQuickReply = (value: string) => {
    setInputValue(value)
    setTimeout(() => handleSendMessage(), 100)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative p-2.5 sm:p-4 rounded-full shadow-lg transition-all duration-500 transform hover:scale-110 active:scale-95 chat-pulse-glow ${
            isOpen 
              ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' 
              : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 gradient-animate'
          } text-white group`}
        >
          <div className="relative">
            {isOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 rotate-90" />
            ) : (
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" />
            )}
            
            {/* Floating sparkles */}
            {!isOpen && (
              <>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-ping opacity-20"></div>
                <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 animate-bounce" />
                </div>
              </>
            )}
          </div>
          
          {/* Notification badge */}
          {!isOpen && (
            <div className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-bounce">
              <div className="absolute inset-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-ping opacity-50"></div>
            </div>
          )}
          
          {/* Enhanced Tooltip - Hidden on mobile */}
          <div className="hidden sm:block absolute bottom-full right-0 mb-3 px-4 py-2 bg-black/90 backdrop-blur-sm text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg">
            {isOpen ? '✕ Close Chat' : '💬 Chat with AI Assistant'}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-black/90"></div>
          </div>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 sm:bottom-24 right-2 sm:right-6 left-2 sm:left-auto z-40 w-auto sm:w-96 max-w-sm h-[60vh] sm:h-[500px] max-h-[500px] sm:max-h-[600px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 flex flex-col overflow-hidden chat-slide-in">
          {/* Header */}
          <div className="relative p-3 sm:p-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white gradient-animate">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Bot className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div className="absolute -bottom-0.5 sm:-bottom-1 -right-0.5 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-white flex items-center justify-center animate-pulse">
                  <div className="w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm sm:text-lg bg-white/20 rounded-lg px-2 py-1 backdrop-blur-sm truncate">AI Shopping Assistant</h3>
                <p className="text-xs sm:text-sm text-blue-100 flex items-center gap-1 mt-1">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="hidden sm:inline">Online • Ready to help you shop!</span>
                  <span className="sm:hidden">Online</span>
                </p>
              </div>
              <div className="text-right">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 bg-white/10 rounded-full -translate-y-10 sm:-translate-y-16 translate-x-10 sm:translate-x-16 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-16 sm:w-20 h-16 sm:h-20 bg-white/10 rounded-full translate-y-8 sm:translate-y-10 -translate-x-8 sm:-translate-x-10 animate-pulse"></div>
            <div className="absolute top-1/2 right-3 sm:right-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/60 rounded-full animate-ping"></div>
            <div className="absolute top-1/3 right-6 sm:right-8 w-1 h-1 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 sm:space-y-4 bg-gradient-to-b from-gray-50/80 to-white/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm chat-messages">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`flex items-start gap-2 sm:gap-3 max-w-[90%] sm:max-w-[85%] group`}>
                  {message.sender === 'bot' && (
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border-2 border-white dark:border-gray-800">
                      <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                  )}
                  
                  <div
                    className={`relative p-3 sm:p-4 rounded-2xl shadow-sm transition-all duration-300 group-hover:shadow-md ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 gradient-animate text-white rounded-br-md shadow-blue-500/20'
                        : 'bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 border border-gray-200/50 dark:border-gray-700/50 rounded-bl-md backdrop-blur-sm'
                    }`}
                  >
                    <p className="text-xs sm:text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                    {message.sender === 'user' && (
                      <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full flex items-center justify-center">
                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-600 rounded-full"></div>
                      </div>
                    )}
                    {message.sender === 'bot' && (
                      <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    )}
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border-2 border-white dark:border-gray-800">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Quick Reply Buttons - Show after first bot message */}
            {messages.length === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 sm:mt-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-500">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply.value)}
                    className="p-2.5 sm:p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-medium transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-200 dark:border-gray-700"
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            )}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
                <div className="flex items-start gap-2 sm:gap-3 max-w-[80%]">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3 h-3 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-2xl rounded-bl-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-1">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-gray-500 ml-2 hidden sm:inline">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="flex gap-2 sm:gap-3 items-end">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about products, orders..."
                  className="w-full p-3 sm:p-4 pr-10 sm:pr-12 border-2 border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:bg-gray-800/50 dark:text-white text-sm placeholder-gray-500 transition-all duration-300 backdrop-blur-sm"
                  disabled={isTyping}
                />
                <div className="absolute right-2.5 sm:right-3 top-1/2 transform -translate-y-1/2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 animate-pulse" />
                </div>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="p-3 sm:p-4 bg-gradient-to-r from-blue-600 to-purple-600 gradient-animate text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center min-w-[48px] sm:min-w-[56px] hover:scale-105 disabled:hover:scale-100 active:scale-95 group"
              >
                {isTyping ? (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform duration-200" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-center gap-1 sm:gap-2 mt-2 sm:mt-3">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-500 animate-pulse" />
              <p className="text-xs text-gray-500 text-center bg-gray-100/50 dark:bg-gray-800/50 px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm">
                <span className="hidden sm:inline">Powered by AI • Your intelligent shopping companion</span>
                <span className="sm:hidden">AI Shopping Assistant</span>
              </p>
              <ShoppingBag className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-500 animate-pulse" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
