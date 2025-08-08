// AI Chat API Route
import { NextRequest, NextResponse } from 'next/server'

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

// Mock AI responses - In production, you would integrate with OpenAI or another AI service
const generateAIResponse = async (messages: ChatMessage[], context?: any): Promise<string> => {
  const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || ''
  
  // Product-related queries
  if (lastMessage.includes('product') || lastMessage.includes('item') || lastMessage.includes('buy')) {
    return "I'd be happy to help you find the perfect product! 🛍️ What are you looking for? I can recommend items based on your preferences, budget, or specific needs."
  }
  
  // Pricing queries
  if (lastMessage.includes('price') || lastMessage.includes('cost') || lastMessage.includes('expensive')) {
    return "I can help you find products within your budget! 💰 What's your price range? I can also let you know about current discounts and deals."
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
    return "Hello! 👋 Welcome to our store! I'm your AI shopping assistant, here to help you find exactly what you're looking for. How can I assist you today?"
  }
  
  // Thank you responses
  if (lastMessage.includes('thank') || lastMessage.includes('thanks')) {
    return "You're very welcome! 😊 I'm always here to help. Is there anything else you'd like to know about our products or services?"
  }
  
  // Default response
  return "I'm here to help you with anything related to shopping, products, orders, or customer service! Could you tell me a bit more about what you're looking for? I can assist with:\n\n🛍️ Product recommendations\n💰 Pricing and deals\n📦 Shipping information\n🔄 Returns and exchanges\n📋 Order tracking\n\nWhat would you like to know?"
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
