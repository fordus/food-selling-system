import React from 'react'
import Link from 'next/link'
import { ShoppingCart, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Toaster } from 'sonner'
import { useAppStore } from '@/app/store'

export default function Layout({ children }: { children: React.ReactNode }) {
    const cart = useAppStore((state) => state.cart)

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-primary text-primary-foreground shadow-md">
                <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold">
                        Food Store
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link href="/admin" passHref>
                            <Button variant="ghost" size="icon">
                                <Settings className="h-6 w-6" />
                                <span className="sr-only">Admin</span>
                            </Button>
                        </Link>
                        <Link href="/cart" passHref>
                            <Button variant="ghost" size="icon" className="relative">
                                <ShoppingCart className="h-6 w-6" />
                                <span className="sr-only">Cart</span>
                                {cart.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        {cart.reduce((total, item) => total + item.quantity, 0)}
                                    </span>
                                )}
                            </Button>
                        </Link>
                    </div>
                </nav>
            </header>
            <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
            <footer className="bg-muted py-4">
                <div className="container mx-auto px-4 text-center">
                    &copy; 2023 Food Store. All rights reserved.
                </div>
            </footer>
            <Toaster />
        </div>
    )
}