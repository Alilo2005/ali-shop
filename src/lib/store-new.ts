import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
}

interface StoreState {
  // Cart
  cart: CartItem[]
  isCartOpen: boolean
  
  // Wishlist
  wishlist: WishlistItem[]
  
  // Cart actions
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  
  // Wishlist actions
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  clearWishlist: () => void
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      cart: [],
      isCartOpen: false,
      wishlist: [],
      
      // Cart actions
      addToCart: (newItem) => {
        const cart = get().cart
        const existingItem = cart.find(item => item.id === newItem.id)
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          })
        } else {
          set({
            cart: [...cart, { ...newItem, quantity: 1 }]
          })
        }
      },
      
      removeFromCart: (id) => {
        set({
          cart: get().cart.filter(item => item.id !== id)
        })
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id)
          return
        }
        
        set({
          cart: get().cart.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        })
      },
      
      clearCart: () => set({ cart: [] }),
      
      toggleCart: () => set({ isCartOpen: !get().isCartOpen }),
      
      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0)
      },
      
      getTotalPrice: () => {
        return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      
      // Wishlist actions
      addToWishlist: (newItem) => {
        const wishlist = get().wishlist
        const existingItem = wishlist.find(item => item.id === newItem.id)
        
        if (!existingItem) {
          set({
            wishlist: [...wishlist, newItem]
          })
        }
      },
      
      removeFromWishlist: (id) => {
        set({
          wishlist: get().wishlist.filter(item => item.id !== id)
        })
      },
      
      clearWishlist: () => set({ wishlist: [] })
    }),
    {
      name: 'ecommerce-storage',
    }
  )
)
