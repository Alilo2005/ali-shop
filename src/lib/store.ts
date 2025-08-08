import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from './toast-store'

export interface CartItem {
  id: string
  productId: string
  variantId?: string
  name: string
  price: number
  image: string
  quantity: number
  variant?: {
    name: string
    attributes: Record<string, string>
  }
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>, element?: HTMLElement) => void
  removeItem: (productId: string, variantId?: string) => void
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void
  clearCart: () => void
  toggleCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (newItem, element) => {
        const items = get().items
        const existingItem = items.find(
          item => item.productId === newItem.productId && item.variantId === newItem.variantId
        )
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.productId === newItem.productId && item.variantId === newItem.variantId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          })
        } else {
          set({
            items: [...items, { ...newItem, quantity: 1 }]
          })
        }
        
        // Show toast notification
        toast.addedToCart(element)
      },
      
      removeItem: (productId, variantId) => {
        set({
          items: get().items.filter(
            item => !(item.productId === productId && item.variantId === variantId)
          )
        })
      },
      
      updateQuantity: (productId, quantity, variantId) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId)
          return
        }
        
        set({
          items: get().items.map(item =>
            item.productId === productId && item.variantId === variantId
              ? { ...item, quantity }
              : item
          )
        })
      },
      
      clearCart: () => set({ items: [] }),
      
      toggleCart: () => set({ isOpen: !get().isOpen }),
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      }
    }),
    {
      name: 'cart-storage',
    }
  )
)

// Wishlist Store
interface WishlistItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: WishlistItem, element?: HTMLElement) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem, element) => {
        const items = get().items
        const existingItem = items.find(item => item.productId === newItem.productId)
        
        if (!existingItem) {
          set({
            items: [...items, newItem]
          })
          
          // Show toast notification
          toast.addedToWishlist(element)
        }
      },
      
      removeItem: (productId) => {
        set({
          items: get().items.filter(item => item.productId !== productId)
        })
      },
      
      isInWishlist: (productId) => {
        return get().items.some(item => item.productId === productId)
      },
      
      clearWishlist: () => set({ items: [] })
    }),
    {
      name: 'wishlist-storage',
    }
  )
)

// Unified store hook for easier usage
export const useStore = () => {
  const cart = useCartStore(state => state.items)
  const isCartOpen = useCartStore(state => state.isOpen)
  const addToCart = useCartStore(state => state.addItem)
  const removeFromCart = useCartStore(state => state.removeItem)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const clearCart = useCartStore(state => state.clearCart)
  const toggleCart = useCartStore(state => state.toggleCart)
  const getTotalItems = useCartStore(state => state.getTotalItems)
  const getTotalPrice = useCartStore(state => state.getTotalPrice)

  const wishlist = useWishlistStore(state => state.items)
  const addToWishlist = useWishlistStore(state => state.addItem)
  const removeFromWishlist = useWishlistStore(state => state.removeItem)
  const isInWishlist = useWishlistStore(state => state.isInWishlist)
  const clearWishlist = useWishlistStore(state => state.clearWishlist)

  return {
    // Cart
    cart,
    isCartOpen,
    addToCart: (item: { id: string; name: string; price: number; image: string }, element?: HTMLElement) => addToCart({
      ...item,
      productId: item.id,
    }, element),
    removeFromCart: (id: string) => removeFromCart(id),
    updateQuantity: (id: string, quantity: number) => updateQuantity(id, quantity),
    clearCart,
    toggleCart,
    getTotalItems,
    getTotalPrice,
    
    // Wishlist  
    wishlist,
    addToWishlist: (item: { id: string; name: string; price: number; image: string }, element?: HTMLElement) => 
      addToWishlist({
        ...item,
        productId: item.id,
      }, element),
    removeFromWishlist: (id: string) => removeFromWishlist(id),
    isInWishlist: (id: string) => isInWishlist(id),
    clearWishlist,
  }
}
