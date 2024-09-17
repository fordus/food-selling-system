import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
}

interface CartItem extends Product {
  quantity: number
}

interface AppStore {
  products: Product[]
  cart: CartItem[]
  whatsappNumber: string
  setProducts: (products: Product[]) => void
  setWhatsappNumber: (number: string) => void
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateCartItemQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const initialProducts: Product[] = [
  {
    id: '1',
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    price: 12.99,
    image: "https://foodish-api.com/images/pizza/pizza71.jpg"
  },
  {
    id: '2',
    name: "Chicken Caesar Salad",
    description: "Fresh romaine lettuce with grilled chicken, croutons, and Caesar dressing",
    price: 9.99,
    image: "https://foodish-api.com/images/pizza/pizza72.jpg"
  },
  {
    id: '3',
    name: "Cheeseburger",
    description: "Juicy beef patty with cheese, lettuce, tomato, and special sauce",
    price: 8.99,
    image: "https://foodish-api.com/images/pizza/pizza73.jpg"
  },
  {
    id: '4',
    name: "Sushi Roll Platter",
    description: "Assorted sushi rolls with soy sauce and wasabi",
    price: 15.99,
    image: "https://foodish-api.com/images/pizza/pizza74.jpg"
  }
]

const initialWhatsappNumber = '+1234567890'

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      products: initialProducts,
      cart: [],
      whatsappNumber: initialWhatsappNumber,
      setProducts: (products) => set({ products }),
      setWhatsappNumber: (number) => set({ whatsappNumber: number }),
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id)
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            }
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] }
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),
      updateCartItemQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'food-store',
    }
  )
)