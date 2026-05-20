import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  scent: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{product.scent}</p>
        <p className="text-sm text-foreground/80 mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
          <Button
            size="sm"
            onClick={() => onAddToCart(product)}
            className="gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
