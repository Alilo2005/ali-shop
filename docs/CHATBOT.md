# AI Chatbot Documentation

## Overview
The AI-powered chatbot provides 24/7 customer support and shopping assistance to enhance the user experience on the eCommerce platform.

## Features

### 🤖 AI-Powered Responses
- Intelligent responses to customer inquiries
- Context-aware conversations
- Product recommendations
- Order assistance

### 📱 Responsive Design
- **Desktop**: Floating chat widget with advanced features
- **Mobile**: Full-screen chat interface optimized for touch
- Smooth animations and transitions

### 🛍️ Shopping Integration
- Access to cart information
- Product recommendations
- Order tracking assistance
- Shipping and return information

### 💬 Chat Features
- Quick action buttons for common queries
- Message persistence
- Typing indicators
- Message actions (copy, thumbs up/down)
- Clear chat functionality

## Technical Implementation

### Components
- `ChatbotResponsive`: Main wrapper component that renders appropriate version
- `ChatbotEnhanced`: Desktop version with advanced features
- `ChatbotMobile`: Mobile-optimized full-screen version
- `ChatbotStore`: Zustand store for state management

### API Integration
- `/api/chat`: Backend API for processing chat messages
- Context-aware responses based on current page and cart
- Extensible for integration with OpenAI or other AI services

### State Management
```typescript
interface ChatStore {
  isOpen: boolean
  unreadCount: number
  toggleChat: () => void
  openChat: () => void
  closeChat: () => void
  // ... other methods
}
```

## Usage

### Quick Actions
The chatbot provides preset quick actions for common queries:
- Browse Products
- Current Deals
- Shipping Info
- Customer Support

### Smart Responses
The AI can help with:
- Product recommendations
- Pricing information
- Shipping and delivery
- Returns and refunds
- Order tracking
- Size and fit guidance
- Discount and promotion information

## Customization

### Adding New Responses
Edit `src/app/api/chat/route.ts` to add new response patterns:

```typescript
if (lastMessage.includes('your-keyword')) {
  return "Your custom response here"
}
```

### Styling
The chatbot uses Tailwind CSS with dark mode support. Customize colors in:
- `chatbot-enhanced.tsx` for desktop
- `chatbot-mobile.tsx` for mobile

### Quick Actions
Modify the `quickActions` array in the chatbot components to add new preset buttons.

## Future Enhancements

### Planned Features
- [ ] Integration with OpenAI GPT for more advanced responses
- [ ] Voice input/output capabilities
- [ ] Multi-language support
- [ ] Chat history persistence
- [ ] Human handoff for complex queries
- [ ] Analytics and feedback collection
- [ ] Product catalog integration for visual recommendations

### AI Integration
Replace the mock AI responses with actual AI service:

```typescript
// Example OpenAI integration
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: "You are a helpful shopping assistant..."
    },
    ...messages
  ],
});
```

## Performance Considerations
- Lazy loading of chat components
- Message pagination for long conversations
- Optimized animations with Framer Motion
- Responsive image loading in product recommendations

## Analytics
Track chatbot usage with:
- Message count and response times
- Most common queries
- User satisfaction ratings
- Conversion rate from chat interactions
