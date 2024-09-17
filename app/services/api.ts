interface Product {
    id: string
    name: string
    description: string
    price: number
    image: string
  }

const API_BASE_URL = 'https://api.example.com' // Replace with your actual API base URL

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`)
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

const WHATSAPP_NUMBER = '+1234567890' 

export async function fetchWhatsappNumber(): Promise<string> {
    return WHATSAPP_NUMBER
}