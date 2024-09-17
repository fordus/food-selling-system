'use client'
import React, { useState } from 'react'
import { useAppStore } from '../store'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from 'sonner'
import Layout from '@/components/Layout'

export default function Cart() {
    const { cart, removeFromCart, updateCartItemQuantity, clearCart, whatsappNumber } = useAppStore()
    const [address, setAddress] = useState('')

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const handleRemoveFromCart = (id: string, name: string) => {
        removeFromCart(id)
        toast.error(`Removed ${name} from cart`)
    }

    const handleUpdateQuantity = (id: string, quantity: number, name: string) => {
        updateCartItemQuantity(id, quantity)
        toast.info(`Updated ${name} quantity to ${quantity}`)
    }

    const handleClearCart = () => {
        clearCart()
        toast.error('Cart cleared')
    }

    const handleWhatsAppOrder = () => {
        if (!address.trim()) {
            toast.error('Please enter your address before placing the order.')
            return
        }

        const orderMessage = cart
            .map((item) => `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`)
            .join('\n')
        const totalMessage = `\nTotal: $${total.toFixed(2)}`
        const addressMessage = `\n\nDelivery Address:\n${address}`
        const message = encodeURIComponent(`New order:\n${orderMessage}${totalMessage}${addressMessage}`)
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
        toast.success('Order sent via WhatsApp')
    }

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cart.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>${item.price.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                handleUpdateQuantity(item.id, parseInt(e.target.value, 10), item.name)
                                            }
                                            className="w-20"
                                        />
                                    </TableCell>
                                    <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleRemoveFromCart(item.id, item.name)}
                                        >
                                            Remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="mt-4 space-y-4">
                        <div className="flex justify-between items-center">
                            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
                            <Button variant="outline" onClick={handleClearCart}>
                                Clear Cart
                            </Button>
                        </div>
                        <div>
                            <label htmlFor="address" className="block mb-2 font-semibold">
                                Delivery Address (required)
                            </label>
                            <Textarea
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter your delivery address"
                                required
                                className="w-full"
                                rows={4}
                            />
                        </div>
                        <Button onClick={handleWhatsAppOrder} className="w-full">
                            Order via WhatsApp
                        </Button>
                    </div>
                </>
            )}
        </Layout>
    )
}