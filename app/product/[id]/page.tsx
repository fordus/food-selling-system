'use client'
import React from 'react'
import { useAppStore } from '../../store'
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'
import Layout from '@/components/Layout'
import { usePathname } from 'next/navigation'

export default function ProductDetails() {
    const id = usePathname().split('/').pop()
    const { products, addToCart } = useAppStore()
    const product = products.find((p) => p.id === id)

    if (!product) {
        return <Layout>Product not found</Layout>
    }

    const handleAddToCart = () => {
        addToCart(product)
        toast.success(`Added ${product.name} to cart`)
    }

    return (
        <Layout>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                </div>
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-xl mb-4">${product.price.toFixed(2)}</p>
                    <p className="mb-6">{product.description}</p>
                    <Button onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                </div>
            </div>
        </Layout>
    )
}