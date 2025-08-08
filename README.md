# 🛒 Ali Shop — Modern eCommerce Platform

### *Your AI-Powered Shopping Experience*

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Free](https://img.shields.io/badge/100%25-FREE-gold?style=for-the-badge&logo=gift&logoColor=white)

### 🚀 **[LIVE DEMO](https://ali-shop-alilo2005.vercel.app/)** 🚀

*A high-performance eCommerce platform built with Next.js 14+, featuring AI-powered recommendations, real-time chat support, and a beautiful admin dashboard.*

---

</div>

## 🌟 **Why Ali Shop?**

<table>
<tr>
<td width="50%">

### 🤖 **AI Shopping Assistant**
- Personalized product suggestions
- Smart search with typo correction
- 24/7 real-time chat customer support
- Context-aware conversations

</td>
<td width="50%">

### 🛍️ **Rich Shopping Experience**
- Advanced product filtering & search
- Featured products carousel
- Wishlist and cart with real-time updates
- Smooth checkout flow with multiple payments

</td>
</tr>
<tr>
<td width="50%">

### 🎨 **Modern UI/UX**
- Premium indigo-violet design
- Framer Motion animations
- Responsive mobile-first layout
- Toast notifications & micro-interactions

</td>
<td width="50%">

### ⚡ **Powerful Admin Dashboard**
- Real-time analytics & KPIs
- Product/order/customer management
- Inventory tracking and business intelligence
- Full CRUD for products with image uploads

</td>
</tr>
</table>

## 🎯 **How Shopping Works**

```mermaid
graph LR
    A[🛒 Browse Homepage] --> B[🔍 Search & Filter Products]
    B --> C[🛒 Add to Cart / Wishlist]
    C --> D[💳 Checkout & Payment]
    D --> E[🤖 AI Chat Support]
    E --> F[📦 Order Tracking]
    F --> G[📊 Admin Analytics]
```

<div align="center">

### 💫 **Shop, Chat, Track, Analyze — All in One!**

**Browse products** → **AI recommendations** → **Easy checkout** → **Live support** → **Admin controls**

</div>

## 🛠️ **Tech Stack & Architecture**

<div align="center">

| Frontend | Backend | AI/Payments | Deployment |
|----------|---------|-------------|------------|
| ![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js) | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript) | ![OpenAI](https://img.shields.io/badge/OpenAI-23282D?style=flat-square&logo=openai) | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel) |
| ![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss) | ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma) | ![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white) | ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github) |
| ![Framer Motion](https://img.shields.io/badge/Framer-0055FF?style=flat-square&logo=framer) | ![NextAuth](https://img.shields.io/badge/NextAuth.js-4AE07F?style=flat-square&logo=nextdotjs) | ![PayPal](https://img.shields.io/badge/PayPal-00457C?style=flat-square&logo=paypal) | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker) |

</div>

### 🎨 **Design System**
- **Indigo & Violet Aesthetics**: `#6366f1` / `#8b5cf6`
- **Glassmorphism & Animations**: Framer Motion, modern effects
- **Micro-interactions**: Smooth hover, feedback, loading states
- **Accessibility First**: WCAG 2.2 compliant, mobile friendly

## ⚡ **Quick Start Guide**

### 🚀 **Option 1: Try it Live**
```bash
🌐 Visit: https://ali-shop-alilo2005.vercel.app
✨ Shop, chat, and explore instantly!
```

### 💻 **Option 2: Run Locally**

```bash
# 📥 Clone the repo
git clone https://github.com/Alilo2005/ali-shop.git
cd ali-shop

# 📦 Install dependencies
npm install

# ⚙️ Set up your env variables
cp .env.example .env.local
# Edit .env.local with your config

# 🗄️ Setup database
npx prisma migrate dev
npx prisma db seed

# 🚀 Start development
npm run dev

# 🌐 Browse
open http://localhost:3000
```

### 🔑 **Environment Variables**

<details>
<summary><b>📋 Click to expand environment setup</b></summary>

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/aliShop"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# AI Features
OPENAI_API_KEY="sk-..."

# Email
EMAIL_SERVER_USER="your-email@example.com"
EMAIL_SERVER_PASSWORD="your-password"
EMAIL_FROM="noreply@ali-shop.com"
```

</details>


## 🎮 **Features Showcase**

<div align="center">

| 🏠 **Homepage** | 🛍️ **Products** | 🔍 **Smart Search** |
|:---:|:---:|:---:|
| Hero, categories, testimonials | Grid/list, filters, wishlist | AI-powered autocomplete & typo correction |

| 🛒 **Cart/Checkout** | 🤖 **AI Chatbot** | 📊 **Admin Dashboard** |
| Real-time cart, multi-payment | 24/7 support, order tracking | KPIs, full management, business insights |

</div>

### 🚀 **User Experience Flow**

1. **Browse**: Discover products with smart filtering
2. **Chat**: Get instant help & personalized suggestions
3. **Shop & Pay**: Fast, secure checkout
4. **Admin**: Track sales, manage inventory, analyze growth

### 💫 **Interactive Elements**

- **Framer Motion Animations**: Every page feels fluid
- **Toast Notifications**: Immediate feedback
- **Loading States**: Engaging spinners, skeletons
- **Error Handling**: Graceful fallbacks for every process

## 🗺️ **Roadmap & Future Features**

<div align="center">

### 🎯 **Coming Soon**

</div>

| Status | Feature | Description |
|:---:|:---|:---|
| 🔄 | **Review System** | Product reviews & ratings |
| 🔄 | **PWA Support** | Install as mobile app |
| 🔄 | **Multi-language** | Globalization & localization |
| 🔄 | **Advanced BI Reports** | Custom analytics & export |
| 🔄 | **Dark/Light Mode** | Theme switching |
| 🔄 | **Customer Loyalty** | Points & rewards |
| 🔄 | **Shipping Integrations** | Real-time tracking |

## 🤝 **Contributing**

<div align="center">

**We love contributions!** 🎉

[![GitHub issues](https://img.shields.io/github/issues/Alilo2005/ali-shop?style=for-the-badge)](https://github.com/Alilo2005/ali-shop/issues)
[![GitHub stars](https://img.shields.io/github/stars/Alilo2005/ali-shop?style=for-the-badge)](https://github.com/Alilo2005/ali-shop/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Alilo2005/ali-shop?style=for-the-badge)](https://github.com/Alilo2005/ali-shop/network)

</div>

### 🛠️ **How to Contribute**

1. 🍴 Fork the repo
2. 🌟 Create a feature branch: `git checkout -b amazing-feature`
3. 💫 Commit your changes: `git commit -m 'Add amazing feature'`
4. 🚀 Push: `git push origin amazing-feature`
5. 🎉 Open a Pull Request

## 📄 **License**

<div align="center">

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file.

**Free to use, modify, and distribute!** 🎉

</div>

## 🙏 **Acknowledgments & Credits**

<div align="center">

### 💝 **Special Thanks To**

</div>

<table align="center">
<tr>
<td align="center" width="20%">
<img src="https://skillicons.dev/icons?i=nextjs" width="60"/><br/>
<b>Next.js</b><br/>
<sub>React Framework</sub>
</td>
<td align="center" width="20%">
<img src="https://skillicons.dev/icons?i=tailwind" width="60"/><br/>
<b>Tailwind CSS</b><br/>
<sub>Beautiful Styling</sub>
</td>
<td align="center" width="20%">
<img src="https://skillicons.dev/icons?i=framer" width="60"/><br/>
<b>Framer Motion</b><br/>
<sub>Smooth Animations</sub>
</td>
<td align="center" width="20%">
<img src="https://skillicons.dev/icons?i=openai" width="60"/><br/>
<b>OpenAI</b><br/>
<sub>AI Recommendations</sub>
</td>
<td align="center" width="20%">
<img src="https://skillicons.dev/icons?i=stripe" width="60"/><br/>
<b>Stripe</b><br/>
<sub>Payments</sub>
</td>
</tr>
</table>

---

<div align="center">

### 🌟 **Show Some Love** 🌟

**If you found this project helpful, please consider:**

[![⭐ Star on GitHub](https://img.shields.io/badge/⭐-Star_on_GitHub-gold?style=for-the-badge&logo=github)](https://github.com/Alilo2005/ali-shop)
[![🐛 Report Bug](https://img.shields.io/badge/🐛-Report_Bug-red?style=for-the-badge&logo=github)](https://github.com/Alilo2005/ali-shop/issues)
[![💡 Request Feature](https://img.shields.io/badge/💡-Request_Feature-blue?style=for-the-badge&logo=github)](https://github.com/Alilo2005/ali-shop/issues)

---

### 🛒 **Built with ❤️, AI, and lots of ☕** 

**Ready to upgrade your shopping experience?** [**Try Ali Shop Now!**](https://ali-shop-alilo2005.vercel.app) 🚀

</div>