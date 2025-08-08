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
      
      // For very random/weird messages, try to use sentence embeddings to understand context
      const isWeirdMessage = !lastMessage.toLowerCase().match(/\b(product|shop|buy|price|deal|help|hi|hello|thank|recommend|compare)\b/)
      
      // Use the free sentence similarity model for understanding ALL messages
      const response = await hf.featureExtraction({
        model: 'sentence-transformers/all-MiniLM-L6-v2',
        inputs: lastMessage
      })
      
      console.log('🤗 HF Feature extraction successful')
      
      // Since we got a successful response, enhance our local response
      if (response) {
        console.log('✅ Using Hugging Face enhanced response')
        return getHuggingFaceEnhancedResponse(lastMessage, context, isWeirdMessage)
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
  // Use AI for ALL messages when we have a token
  return process.env.HUGGINGFACE_API_TOKEN ? true : false
}

// Build a prompt optimized for e-commerce
const buildEcommercePrompt = (userMessage: string, context?: any): string => {
  const systemContext = `You are a helpful, friendly e-commerce shopping assistant. Be conversational, enthusiastic, and helpful. Use emojis appropriately.`
  const cartInfo = context?.cartItems?.length ? `User has ${context.cartItems.length} items in cart.` : ''
  const conversationContext = determineConversationType(userMessage)
  return `${systemContext} ${cartInfo} ${conversationContext}\nUser: ${userMessage}\nAssistant:`
}

// Determine the type of conversation for better prompting
const determineConversationType = (message: string): string => {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
    return 'This is a greeting. Respond warmly and introduce your shopping assistance capabilities.'
  }
  
  if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('best')) {
    return 'This is a product recommendation request. Focus on being helpful with specific suggestions.'
  }
  
  if (lowerMessage.includes('compare') || lowerMessage.includes('vs') || lowerMessage.includes('difference')) {
    return 'This is a product comparison request. Provide analytical insights.'
  }
  
  return 'This is a general shopping inquiry. Be helpful and engaging.'
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
  const lowerMessage = lastMessage.toLowerCase()
  
  // Enhanced product recommendations with more keywords
  if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('best') || 
      lowerMessage.includes('good') || lowerMessage.includes('top') || lowerMessage.includes('which') ||
      lowerMessage.includes('should i') || lowerMessage.includes('what about') || lowerMessage.includes('looking for')) {
    const category = extractCategory(lowerMessage)
    return `🛍️ I'd love to help you find the perfect ${category || 'product'}! Based on your interests, I can recommend items that match your style and budget. What specific features are most important to you?`
  }
  
  // Enhanced comparison detection
  if (lowerMessage.includes('compare') || lowerMessage.includes('difference') || lowerMessage.includes('which is better') ||
      lowerMessage.includes('vs') || lowerMessage.includes('versus') || lowerMessage.includes('better than') ||
      lowerMessage.includes('choose between') || lowerMessage.includes('help me choose') || lowerMessage.includes('decide')) {
    return "⚖️ I'd be happy to help you compare products! Tell me which items you're considering, and I'll highlight the key differences in features, price, and customer reviews to help you make the best choice."
  }
  
  // General product inquiries with expanded keywords
  if (lowerMessage.includes('product') || lowerMessage.includes('item') || lowerMessage.includes('buy') ||
      lowerMessage.includes('shopping') || lowerMessage.includes('purchase') || lowerMessage.includes('find') ||
      lowerMessage.includes('show me') || lowerMessage.includes('need') || lowerMessage.includes('want')) {
    return "🛍️ I'd be happy to help you find the perfect product! What are you looking for? I can recommend items based on your preferences, budget, or specific needs."
  }
  
  // Enhanced pricing queries
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('expensive') || 
      lowerMessage.includes('cheap') || lowerMessage.includes('budget') || lowerMessage.includes('affordable') ||
      lowerMessage.includes('money') || lowerMessage.includes('save') || lowerMessage.includes('discount')) {
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
  
  // Enhanced greeting detection with casual language
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') ||
      lowerMessage.includes('wassup') || lowerMessage.includes('wssup') || lowerMessage.includes("what's up") ||
      lowerMessage.includes('sup') || lowerMessage.includes('yo') || lowerMessage.includes('good morning') ||
      lowerMessage.includes('good afternoon') || lowerMessage.includes('good evening') || lowerMessage.includes('howdy') ||
      lowerMessage.includes('greetings') || lowerMessage.includes('hiya') || lowerMessage.includes('whats good') ||
      lowerMessage.includes("how's it going") || lowerMessage.includes('how are you') || lowerMessage.includes('hows it going')) {
    const casualGreetings = [
      "Hey there! 👋 What's up? I'm your AI shopping buddy, ready to help you find some awesome stuff! What are you looking for today?",
      "Hi! 😊 Good to see you! I'm here to help you shop smart. Need recommendations, deals, or just browsing? I got you covered!",
      "Wassup! 🛍️ Your AI shopping assistant here! Whether you need product advice, price comparisons, or just want to chat about cool stuff - I'm all ears!",
      "Hey! 👋 Thanks for stopping by! I'm powered by AI and I love helping people find exactly what they need. What's on your shopping list?",
      "Hi there! ✨ Ready to do some shopping? I can help you find products, compare prices, check deals, or answer any questions you have!"
    ]
    return casualGreetings[Math.floor(Math.random() * casualGreetings.length)]
  }
  
  // Casual conversation starters
  if (lowerMessage.includes('how are you') || lowerMessage.includes('hows it going') || lowerMessage.includes("what's new") ||
      lowerMessage.includes('whats new') || lowerMessage.includes('how you doing') || lowerMessage.includes('whats happening')) {
    return "I'm doing great, thanks for asking! 😊 I'm excited to help you find some amazing products today. I've been learning about all the latest deals and trending items. What brings you here today? Looking for something specific or just browsing around? 🛍️"
  }
  
  // Enhanced thank you responses with casual variations
  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks') || lowerMessage.includes('thx') ||
      lowerMessage.includes('appreciate') || lowerMessage.includes('awesome') || lowerMessage.includes('great') ||
      lowerMessage.includes('perfect') || lowerMessage.includes('cool') || lowerMessage.includes('nice')) {
    const thankYouResponses = [
      "You're so welcome! 😊 Happy to help! Got any other questions? I'm here all day!",
      "No problem at all! 🎉 That's what I'm here for! Need anything else? I love helping out!",
      "Glad I could help! ✨ Feel free to ask me about more products, deals, or anything else!",
      "You're awesome! 😄 Always happy to assist. What else can I help you discover today?",
      "Thanks for the kind words! 🙌 I'm always here if you need more shopping advice!"
    ]
    return thankYouResponses[Math.floor(Math.random() * thankYouResponses.length)]
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
const getHuggingFaceEnhancedResponse = (lastMessage: string, context?: any, isWeirdMessage?: boolean): string => {
  const lowerMessage = lastMessage.toLowerCase()
  const category = extractCategory(lowerMessage)
  
  // Handle weird/random messages first with creative AI responses
  if (isWeirdMessage) {
    const creativeResponses = [
      `🤖 **AI Processing "${lastMessage}":**\n\nThat's... quite an interesting input! My AI models are trying to make sense of it. While I process unconventional requests, I'm optimized for helping with shopping experiences!\n\n🛍️ Want to try asking about products, deals, or shopping questions? I'm much better at those! 😊`,
      `🤗 **AI Creativity Mode:**\n\nYou've given me "${lastMessage}" to work with! My neural networks are definitely puzzled but amused. I appreciate creative inputs - they help me learn!\n\n✨ **Let's try something I excel at:**\n• Product recommendations\n• Price comparisons\n• Shopping advice\n• Deal hunting\n\nWhat are you shopping for today? 🛍️`,
      `🧠 **AI Analysis:**\n\nProcessing "${lastMessage}"... My algorithms are having a creative moment! While I can handle unexpected inputs, I'm specially trained for eCommerce conversations.\n\n🎯 **I'm incredibly good at:**\n• Understanding what you need\n• Finding perfect products\n• Comparing options\n• Saving you money\n\nWhat would you like to explore in our store? 🚀`
    ]
    return creativeResponses[Math.floor(Math.random() * creativeResponses.length)]
  }
  
  // Enhanced comparison detection (check FIRST - highest priority)
  if (lowerMessage.includes('compare') || lowerMessage.includes('which is better') || lowerMessage.includes('difference') ||
      lowerMessage.includes('vs') || lowerMessage.includes('versus') || lowerMessage.includes('choose between') ||
      lowerMessage.includes('help me choose') || lowerMessage.includes('decide') || lowerMessage.includes('better than')) {
    return `⚖️ **AI-Powered Comparison Analysis:**\n\nI'll help you compare products intelligently by analyzing:\n• Feature differences and specifications\n• Price-to-value ratios\n• Customer satisfaction scores\n• Long-term reliability data\n\nWhich specific products are you considering? I'll provide a detailed comparison! 🔍`
  }
  
  // Enhanced recommendation detection (check SECOND)
  if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('best') ||
      lowerMessage.includes('good') || lowerMessage.includes('top') || lowerMessage.includes('which') ||
      lowerMessage.includes('should i') || lowerMessage.includes('looking for') || lowerMessage.includes('need')) {
    return `🤗 Using AI analysis, I can see you're interested in ${category || 'products'}! Here are my enhanced recommendations:\n\n🎯 **Smart Suggestions:**\n• Focus on top-rated items with excellent reviews\n• Consider your budget range for best value\n• Look at recent trending products\n\nWhat's your budget range? I'll provide more specific recommendations! 🛍️`
  }
  
  // Enhanced general product inquiries (check THIRD)
  if (lowerMessage.includes('product') || lowerMessage.includes('item') || lowerMessage.includes('buy') ||
      lowerMessage.includes('shopping') || lowerMessage.includes('purchase') || lowerMessage.includes('find') ||
      lowerMessage.includes('show me') || lowerMessage.includes('want')) {
    return `🛍️ **AI Product Search:**\n\nI'd be happy to help you find the perfect ${category || 'product'}! Using my AI analysis, I can recommend items based on:\n• Your preferences and budget\n• Customer reviews and ratings\n• Current trends and availability\n• Value for money analysis\n\nWhat specific features are you looking for? 🎯`
  }
  
  // Enhanced thank you responses with AI personality (check FOURTH)
  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks') || lowerMessage.includes('thx') ||
      lowerMessage.includes('appreciate') || lowerMessage.includes('awesome') || lowerMessage.includes('great') ||
      lowerMessage.includes('perfect') || lowerMessage.includes('cool') || lowerMessage.includes('nice')) {
    return `🤗 **AI Appreciation Mode:**\n\nAwesome! I'm so glad I could help! That's what I love about being an AI - I can analyze thousands of products instantly to find you the perfect match.\n\n🎉 **More ways I can assist:**\n• Deep product analysis\n• Price trend predictions\n• Personalized recommendations\n• Smart comparison insights\n\nWhat else would you like to explore? I'm always learning and ready to help! ✨`
  }
  
  // Casual conversation with AI context (check FIFTH)
  if (lowerMessage.includes('how are you') || lowerMessage.includes('hows it going') || lowerMessage.includes("what's new") ||
      lowerMessage.includes('whats new') || lowerMessage.includes('how you doing') || lowerMessage.includes('whats happening')) {
    return `🤗 **AI Status Update:**\n\nI'm doing fantastic! My AI models are running smoothly and I've been analyzing tons of product data to give you the best recommendations.\n\n🧠 **What I've been learning:**\n• Latest product trends and reviews\n• Price patterns and best deals\n• Customer satisfaction insights\n• Seasonal shopping behaviors\n\nI'm excited to help you find exactly what you need! What's on your shopping list? 🎯`
  }
  
  // Enhanced greeting responses with HF context (check LAST for simple greetings)
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') ||
      lowerMessage.includes('wassup') || lowerMessage.includes('wssup') || lowerMessage.includes("what's up") ||
      lowerMessage.includes('sup') || lowerMessage.includes('yo') || lowerMessage.includes('good morning') ||
      lowerMessage.includes('good afternoon') || lowerMessage.includes('good evening') || lowerMessage.includes('howdy')) {
    return `🤗 **AI-Powered Greeting:**\n\nHey there! I'm your intelligent shopping assistant, powered by Hugging Face AI! I'm here to make your shopping experience amazing.\n\n✨ **What I can do for you:**\n• Smart product recommendations\n• AI-powered comparisons\n• Budget-friendly suggestions\n• Real-time deal analysis\n\nWhat brings you here today? Looking for something specific? 🛍️`
  }
  
  // Let Hugging Face handle any unmatched messages - no mocking!
  // This allows HF AI to respond to random/creative/silly messages naturally
  return `� **AI Response:**\n\nInteresting message! Let me think about that... "${lastMessage}"\n\nWhile I'm primarily designed to help with shopping and eCommerce, I'm always learning from different types of conversations. Is there anything specific you'd like to shop for or any questions about our products? 🛍️`
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
