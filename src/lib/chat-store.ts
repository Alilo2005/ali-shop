import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ChatStore {
  isOpen: boolean
  unreadCount: number
  toggleChat: () => void
  openChat: () => void
  closeChat: () => void
  setUnreadCount: (count: number) => void
  incrementUnreadCount: () => void
  resetUnreadCount: () => void
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      isOpen: false,
      unreadCount: 0,
      
      toggleChat: () => {
        set((state) => ({ 
          isOpen: !state.isOpen,
          unreadCount: state.isOpen ? state.unreadCount : 0 
        }))
      },
      
      openChat: () => {
        set({ isOpen: true, unreadCount: 0 })
      },
      
      closeChat: () => {
        set({ isOpen: false })
      },
      
      setUnreadCount: (count) => {
        set({ unreadCount: count })
      },
      
      incrementUnreadCount: () => {
        const { isOpen } = get()
        if (!isOpen) {
          set((state) => ({ unreadCount: state.unreadCount + 1 }))
        }
      },
      
      resetUnreadCount: () => {
        set({ unreadCount: 0 })
      }
    }),
    {
      name: 'chat-store',
      partialize: (state) => ({ 
        unreadCount: state.unreadCount 
      })
    }
  )
)
