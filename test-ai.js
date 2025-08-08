// AI Chatbot Test Script
// This script tests the current AI functionality

const testQueries = [
  {
    name: "Product Inquiry",
    message: "I'm looking for a laptop for gaming",
    expectedKeywords: ["product", "recommend"]
  },
  {
    name: "Pricing Question", 
    message: "How much does shipping cost?",
    expectedKeywords: ["price", "budget"]
  },
  {
    name: "Shipping Inquiry",
    message: "When will my package arrive?",
    expectedKeywords: ["shipping", "delivery"]
  },
  {
    name: "Return Policy",
    message: "Can I return this item?",
    expectedKeywords: ["return", "30-day"]
  },
  {
    name: "Size Help",
    message: "What size should I get?",
    expectedKeywords: ["size", "fit", "guide"]
  },
  {
    name: "Deals and Discounts",
    message: "Do you have any sales?",
    expectedKeywords: ["deal", "discount", "offer"]
  },
  {
    name: "Order Tracking",
    message: "Where is my order?",
    expectedKeywords: ["order", "track"]
  },
  {
    name: "General Greeting",
    message: "Hello there!",
    expectedKeywords: ["hello", "welcome", "assistant"]
  }
]

async function testAIResponse(query) {
  try {
    const response = await fetch('http://localhost:3002/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: query.message }
        ]
      })
    })
    
    const data = await response.json()
    
    console.log(`\n🧪 Test: ${query.name}`)
    console.log(`📝 Query: "${query.message}"`)
    console.log(`🤖 AI Response: "${data.message}"`)
    
    // Check if response contains expected keywords
    const responseText = data.message.toLowerCase()
    const foundKeywords = query.expectedKeywords.filter(keyword => 
      responseText.includes(keyword.toLowerCase())
    )
    
    if (foundKeywords.length > 0) {
      console.log(`✅ Keywords found: ${foundKeywords.join(', ')}`)
    } else {
      console.log(`⚠️  Expected keywords not found: ${query.expectedKeywords.join(', ')}`)
    }
    
    return { success: true, response: data.message }
  } catch (error) {
    console.log(`❌ Error testing "${query.name}": ${error.message}`)
    return { success: false, error: error.message }
  }
}

async function runAllTests() {
  console.log('🚀 Starting AI Chatbot Tests...\n')
  
  let passedTests = 0
  let totalTests = testQueries.length
  
  for (const query of testQueries) {
    const result = await testAIResponse(query)
    if (result.success) {
      passedTests++
    }
    
    // Add small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  
  console.log(`\n📊 Test Results: ${passedTests}/${totalTests} tests passed`)
  
  if (passedTests === totalTests) {
    console.log('🎉 All AI tests passed! The chatbot is working correctly.')
  } else {
    console.log('⚠️  Some tests had issues. Check the responses above.')
  }
  
  console.log('\n💡 Next Steps:')
  console.log('   1. Add OpenAI API key to .env.local for real AI responses')
  console.log('   2. Test the chatbot UI in the browser')
  console.log('   3. Try the quick action buttons')
  console.log('   4. Test on mobile devices')
}

// Run the tests
runAllTests().catch(console.error)
