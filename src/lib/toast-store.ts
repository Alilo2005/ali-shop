import { create } from 'zustand'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

// Helper function to get element position
const getElementPosition = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  const isMobile = window.innerWidth < 640 // sm breakpoint
  
  if (isMobile) {
    // On mobile, show toasts centered at bottom of screen
    return {
      x: window.innerWidth / 2,
      y: window.innerHeight - 100
    }
  }
  
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height + 10 // Position below the element
  }
}

export interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
  position?: {
    x: number
    y: number
  }
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastStore {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  clearAllToasts: () => void
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  
  addToast: (toast) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    const duration = toast.duration || 4000
    const newToast: Toast = {
      ...toast,
      id,
      duration
    }
    
    set({ toasts: [...get().toasts, newToast] })
    
    // Auto remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        get().removeToast(id)
      }, duration)
    }
  },
  
  removeToast: (id) => {
    set({ toasts: get().toasts.filter(toast => toast.id !== id) })
  },
  
  clearAllToasts: () => {
    set({ toasts: [] })
  }
}))

// Helper functions for common toast types
export const toast = {
  success: (title: string, message?: string, action?: Toast['action']) => {
    useToastStore.getState().addToast({
      type: 'success',
      title,
      message,
      action
    })
  },
  
  error: (title: string, message?: string) => {
    useToastStore.getState().addToast({
      type: 'error',
      title,
      message,
      duration: 6000
    })
  },
  
  warning: (title: string, message?: string) => {
    useToastStore.getState().addToast({
      type: 'warning',
      title,
      message
    })
  },
  
  info: (title: string, message?: string) => {
    useToastStore.getState().addToast({
      type: 'info',
      title,
      message
    })
  },
  
  addedToCart: (element?: HTMLElement) => {
    const position = element ? getElementPosition(element) : undefined
    useToastStore.getState().addToast({
      type: 'success',
      title: 'Added to cart!',
      duration: 2000,
      position
    })
  },
  
  addedToWishlist: (element?: HTMLElement) => {
    const position = element ? getElementPosition(element) : undefined
    useToastStore.getState().addToast({
      type: 'success',
      title: 'Added to wishlist!',
      duration: 2000,
      position
    })
  }
}

// Import cart store to avoid circular dependency
import { useCartStore } from './store'
