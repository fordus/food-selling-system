'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'
import { fetchProducts, fetchWhatsappNumber } from './services/api'
import { useAppStore } from './store'

export default function Home() {
    const { products, setProducts, addToCart, setWhatsappNumber } = useAppStore()

    useEffect(() => {
        const loadData = async () => {
            try {
                const [fetchedProducts, fetchedWhatsappNumber] = await Promise.all([
                    fetchProducts(),
                    fetchWhatsappNumber()
                ])
                setProducts(fetchedProducts)
                setWhatsappNumber(fetchedWhatsappNumber)
            } catch (error) {
                console.error('Error loading data:', error)
                toast.error('Failed to load data. Using default values.')
            }
        }

        loadData()
    }, [setProducts, setWhatsappNumber])

    type Product = {
        id: string
        name: string
        description: string
        price: number
        image: string
    }

    const handleAddToCart = (product: Product) => {
        addToCart(product)
        toast.success(`Added ${product.name} to cart`)
    }

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-4">Welcome to our Food Store</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Card key={product.id}>
                        <CardHeader>
                            <CardTitle>{product.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Link href={`/product/${product.id}`}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover mb-2 rounded cursor-pointer"
                                />
                            </Link>
                            <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Link href={`/product/${product.id}`} passHref>
                                <Button variant="outline">View Details</Button>
                            </Link>
                            <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </Layout>
    )
}