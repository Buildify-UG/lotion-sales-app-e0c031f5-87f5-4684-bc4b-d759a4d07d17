import React, { useState } from 'react';
import { ShoppingCart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/ProductCard';
import CartSidebar from '@/components/CartSidebar';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  scent: string;
}

interface CartItem extends Product {
  quantity: number;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Lavender Moisturizer',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
    description: 'Soothing lavender lotion for daily hydration',
    scent: 'Lavender'
  },
  {
    id: 2,
    name: 'Rose Petal Cream',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
    description: 'Luxurious rose-infused body lotion',
    scent: 'Rose'
  },
  {
    id: 3,
    name: 'Citrus Burst Lotion',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
    description: 'Energizing citrus blend for refreshed skin',
    scent: 'Citrus'
  },
  {
    id: 4,
    name: 'Coconut Paradise',
    price: 26.99,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
    description: 'Tropical coconut body lotion with SPF',
    scent: 'Coconut'
  },
  {
    id: 5,
    name: 'Vanilla Dream',
    price: 25.99,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
    description: 'Warm vanilla lotion for sensitive skin',
    scent: 'Vanilla'
  },
  {
    id: 6,
    name: 'Mint Refresh',
    price: 23.99,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
    description: 'Cool mint lotion for tired skin',
    scent: 'Mint'
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const filteredProducts = PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.scent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold">✨ Lotion Shop</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search lotions by name or scent..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No lotions found matching your search.</p>
            </div>
          )}
        </main>

        {/* Cart Sidebar */}
        {isCartOpen && (
          <CartSidebar
            cart={cart}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
            total={cartTotal}
            onClose={() => setIsCartOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
