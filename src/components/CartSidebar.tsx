import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Plus, Minus, Trash2 } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartSidebarProps {
  cart: CartItem[];
  onRemove: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  total: number;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({
  cart,
  onRemove,
  onUpdateQuantity,
  total,
  onClose
}) => {
  return (
    <div className="w-80 bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-xl font-bold">Shopping Cart</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {cart.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="border border-border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(item.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="flex-1 text-center font-semibold">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border p-4 space-y-4">
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total:</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>
        <Button
          className="w-full"
          disabled={cart.length === 0}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartSidebar;
