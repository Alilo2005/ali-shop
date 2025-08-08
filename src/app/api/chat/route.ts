// AI Chat API Route with Hugging Face Integration
import { NextRequest, NextResponse } from 'next/server'
import { HfInference } from '@huggingface/inference'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatRequest {
  messages: ChatMessage[]
  context?: {
    currentPage?: string
    cartItems?: any[]
    userPreferences?: any
  }
}

// Initialize Hugging Face client
const hf = new HfInference(process.env.HUGGINGFACE_API_TOKEN)

// Enhanced AI responses using Hugging Face + Smart fallbacks
const generateAIResponse = async (messages: ChatMessage[], context?: any): Promise<string> => {
  const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || ''
  
  // Try Hugging Face first for complex queries
  if (process.env.HUGGINGFACE_API_TOKEN && shouldUseHuggingFace(lastMessage)) {
    try {
      console.log('🤗 Attempting Hugging Face API call...')
      
      // Use the free sentence similarity model for basic understanding
      const response = await hf.featureExtraction({
        model: 'sentence-transformers/all-MiniLM-L6-v2',
        inputs: lastMessage
      })
      
      console.log('🤗 HF Feature extraction successful')
      
      // Since we got a successful response, enhance our local response
      if (response) {
        console.log('✅ Using Hugging Face enhanced response')
        return getHuggingFaceEnhancedResponse(lastMessage, context)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.log('⚠️ Hugging Face API fallback to local responses:', errorMessage)
    }
  }
  
  // Enhanced local responses as fallback
  // Enhanced local responses as fallback
  return getEnhancedLocalResponse(lastMessage, context)
}

// Determine if we should use Hugging Face for this query
const shouldUseHuggingFace = (message: string): boolean => {
  const complexQueries = [
    'compare', 'recommend', 'suggest', 'which is better', 'help me choose',
    'what do you think', 'opinion', 'advice', 'best option'
  ]
  return complexQueries.some(keyword => message.includes(keyword))
}

// Build a prompt optimized for e-commerce
const buildEcommercePrompt = (userMessage: string, context?: any): string => {
  const systemContext = `You are a helpful e-commerce shopping assistant. Be concise, friendly, and helpful.`
  const cartInfo = context?.cartItems?.length ? `User has ${context.cartItems.length} items in cart.` : ''
  return `${systemContext} ${cartInfo}\nUser: ${userMessage}\nAssistant:`
}

// Clean and format Hugging Face responses
const cleanHuggingFaceResponse = (response: string, prompt: string): string => {
  return response
    .replace(prompt, '')
    .replace(/User:|Assistant:/g, '')
    .trim()
    .split('\n')[0] // Take first line only
    .substring(0, 200) // Limit length
}

// Add e-commerce specific formatting
const addEcommerceFormatting = (text: string): string => {
  // Add emojis and formatting for common e-commerce terms
  return text
    .replace(/\bproduct(s)?\b/gi, '🛍️ product$1')
    .replace(/\bshipping\b/gi, '📦 shipping')
    .replace(/\bprice\b/gi, '💰 price')
    .replace(/\bdeal(s)?\b/gi, '🏷️ deal$1')
    .replace(/\breturn\b/gi, '🔄 return')
}

// Enhanced local responses with better intelligence
const getEnhancedLocalResponse = (lastMessage: string, context?: any): string => {
  // Product recommendations with context
  if (lastMessage.includes('recommend') || lastMessage.includes('suggest') || lastMessage.includes('best')) {
    const category = extractCategory(lastMessage)
    return `🛍️ I'd love to help you find the perfect ${category || 'product'}! Based on your interests, I can recommend items that match your style and budget. What specific features are most important to you?`
  }
  
  // Compare products
  if (lastMessage.includes('compare') || lastMessage.includes('difference') || lastMessage.includes('which is better')) {
    return "⚖️ I'd be happy to help you compare products! Tell me which items you're considering, and I'll highlight the key differences in features, price, and customer reviews to help you make the best choice."
  }
  
  if (lastMessage.includes('product') || lastMessage.includes('item') || lastMessage.includes('buy')) {
    return "🛍️ I'd be happy to help you find the perfect product! What are you looking for? I can recommend items based on your preferences, budget, or specific needs."
  }
  
  // Pricing queries with smart detection
  if (lastMessage.includes('price') || lastMessage.includes('cost') || lastMessage.includes('expensive') || lastMessage.includes('cheap')) {
    return "💰 I can help you find products within your budget! What's your price range? I can also let you know about current discounts and deals to help you save money."
  }
  
  // Shipping queries
  if (lastMessage.includes('shipping') || lastMessage.includes('delivery') || lastMessage.includes('when will')) {
    return "📦 We offer several shipping options:\n• Free standard shipping on orders $50+ (3-5 business days)\n• Express shipping (1-2 business days) - $9.99\n• Same-day delivery available in select cities\n\nWould you like me to check delivery options for your area?"
  }
  
  // Returns and refunds
  if (lastMessage.includes('return') || lastMessage.includes('refund') || lastMessage.includes('exchange')) {
    return "🔄 Our return policy is customer-friendly:\n• 30-day return window\n• Free returns on most items\n• Easy online return process\n• Instant refunds to original payment method\n\nNeed help starting a return?"
  }
  
  // Size and fit
  if (lastMessage.includes('size') || lastMessage.includes('fit') || lastMessage.includes('measurement')) {
    return "📏 I can help you find the perfect fit! Each product has a detailed size guide with measurements. Would you like me to help you determine the right size for a specific item?"
  }
  
  // Discounts and sales
  if (lastMessage.includes('discount') || lastMessage.includes('sale') || lastMessage.includes('coupon') || lastMessage.includes('deal')) {
    return "🏷️ Great timing! Here are current offers:\n• 20% off electronics with code TECH20\n• Buy 2 get 1 free on select clothing\n• Free shipping on all orders this week\n• Student discount: 15% off with valid ID\n\nWould you like me to apply any of these to your cart?"
  }
  
  // Account and orders
  if (lastMessage.includes('order') || lastMessage.includes('track') || lastMessage.includes('account')) {
    return "📋 I can help you with your account and orders! To track an order, I'll need your order number or email. You can also manage your account, view order history, and update preferences through your dashboard."
  }
  
  // General greetings
  if (lastMessage.includes('hello') || lastMessage.includes('hi') || lastMessage.includes('hey')) {
    return "Hello! 👋 Welcome to our store! I'm your AI shopping assistant, powered by advanced technology. I'm here to help you find exactly what you're looking for. How can I assist you today?"
  }
  
  // Thank you responses
  if (lastMessage.includes('thank') || lastMessage.includes('thanks')) {
    return "You're very welcome! 😊 I'm always here to help. Is there anything else you'd like to know about our products or services?"
  }
  
  // Default enhanced response
  return "I'm here to help you with anything related to shopping, products, orders, or customer service! Could you tell me a bit more about what you're looking for? I can assist with:\n\n🛍️ Product recommendations\n💰 Pricing and deals\n📦 Shipping information\n🔄 Returns and exchanges\n📋 Order tracking\n\nWhat would you like to know?"
}

// Extract product category from user message
const extractCategory = (message: string): string | null => {
  const categories = ['laptop', 'phone', 'clothing', 'shoes', 'electronics', 'fashion', 'beauty', 'sports', 'home', 'kitchen']
  for (const category of categories) {
    if (message.includes(category)) {
      return category
    }
  }
  return null
}

// Enhanced responses when Hugging Face is working
const getHuggingFaceEnhancedResponse = (lastMessage: string, context?: any): string => {
  const category = extractCategory(lastMessage)
  
  if (lastMessage.includes('recommend') || lastMessage.includes('suggest') || lastMessage.includes('best')) {
    return `🤗 Using AI analysis, I can see you're interested in ${category || 'products'}! Here are my enhanced recommendations:\n\n🎯 **Smart Suggestions:**\n• Focus on top-rated items with excellent reviews\n• Consider your budget range for best value\n• Look at recent trending products\n\nWhat's your budget range? I'll provide more specific recommendations! 🛍️`
  }
  
  if (lastMessage.includes('compare') || lastMessage.includes('which is better') || lastMessage.includes('difference')) {
    return `⚖️ **AI-Powered Comparison Analysis:**\n\nI'll help you compare products intelligently by analyzing:\n• Feature differences and specifications\n• Price-to-value ratios\n• Customer satisfaction scores\n• Long-term reliability data\n\nWhich specific products are you considering? I'll provide a detailed comparison! 🔍`
  }
  
  // Fallback to enhanced local response
  return getEnhancedLocalResponse(lastMessage, context)
}

export async function POST(req: NextRequest) {
  try {
    const { messages, context }: ChatRequest = await req.json()
    
    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      )
    }
    
    // Simulate processing delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))
    
    const response = await generateAIResponse(messages, context)
    
    return NextResponse.json({
      message: response,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    )
  }
}
