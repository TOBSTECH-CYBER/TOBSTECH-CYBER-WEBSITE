import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  Plus,
  Minus,
  Check,
  MessageCircle,
  Eye,
  X,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCategory, ProductItem } from '../types';

interface BookshopPageProps {
  onNavigateToCart: () => void;
}

export const BookshopPage: React.FC<BookshopPageProps> = ({ onNavigateToCart }) => {
  const { products, addToCart, getWhatsAppUrl } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'all' | ProductCategory>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);

  const categories: { id: 'all' | ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Products' },
    { id: 'exercise_books', label: 'Exercise Books' },
    { id: 'books', label: 'Books & CBC Setbooks' },
    { id: 'pens_pencils', label: 'Pens & Pencils' },
    { id: 'stationery', label: 'Stationery' },
    { id: 'files_folders', label: 'Files & Folders' },
    { id: 'school_supplies', label: 'School Supplies' },
    { id: 'office_supplies', label: 'Office Supplies' },
    { id: 'printing_materials', label: 'Printing Paper & Reams' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  const getQty = (id: string) => quantities[id] || 1;

  const handleQtyChange = (id: string, delta: number) => {
    const current = getQty(id);
    const updated = Math.max(1, current + delta);
    setQuantities((prev) => ({ ...prev, [id]: updated }));
  };

  const handleAddToCart = (product: ProductItem) => {
    const qty = getQty(product.id);
    addToCart(product, qty);
  };

  const handleBuyNow = (product: ProductItem) => {
    const qty = getQty(product.id);
    addToCart(product, qty);
    onNavigateToCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Hero Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            Stationery & Bookshop Store
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Magongo Bookshop & Stationery
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Order school exercise books, office printing reams, geometry sets, pens, folders, and study supplies. Collect at our counter in Magongo or request local dispatch.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Categories Scroller */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const qty = getQty(product.id);
          const isOutOfStock = product.stockStatus === 'out_of_stock';

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                  )}

                  {/* Stock tag */}
                  <span
                    className={`absolute top-2 right-2 text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow-xs ${
                      product.stockStatus === 'in_stock'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : product.stockStatus === 'low_stock'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {product.stockStatus === 'in_stock'
                      ? 'In Stock'
                      : product.stockStatus === 'low_stock'
                      ? 'Low Stock'
                      : 'Out of Stock'}
                  </span>

                  {/* Quick View trigger */}
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="absolute bottom-2 right-2 p-1.5 bg-white/90 hover:bg-white text-slate-700 rounded-lg shadow-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Quick View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    {product.category.replace('_', ' ')}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 pt-0 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-base font-black text-slate-900">
                      KES {product.price.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-slate-400 ml-1">
                      /{product.unit || 'pc'}
                    </span>
                  </div>

                  {/* WhatsApp Ask button */}
                  <a
                    href={getWhatsAppUrl('product', product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-emerald-600 transition-colors"
                    title="Ask about this product on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>

                {/* Quantity Control */}
                <div className="flex items-center justify-between border border-slate-200 rounded-xl p-1 bg-slate-50">
                  <span className="text-[11px] font-medium text-slate-500 pl-2">Quantity:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleQtyChange(product.id, -1)}
                      className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-slate-800 w-6 text-center">
                      {qty}
                    </span>
                    <button
                      onClick={() => handleQtyChange(product.id, 1)}
                      className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Buttons: Add to Cart & Buy Now */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    disabled={isOutOfStock}
                    onClick={() => handleAddToCart(product)}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors shadow-2xs active:scale-95"
                  >
                    Add to Cart
                  </button>
                  <button
                    disabled={isOutOfStock}
                    onClick={() => handleBuyNow(product)}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors active:scale-95"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-16 text-center bg-white rounded-3xl border border-slate-200">
          <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800">No products found</h3>
          <p className="text-xs text-slate-500 mt-1">Try another search term or category filter.</p>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="relative h-60 bg-slate-100">
              {quickViewProduct.imageUrl ? (
                <img
                  src={quickViewProduct.imageUrl}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-12 h-12" />
                </div>
              )}
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-3 right-3 p-1.5 bg-white/90 hover:bg-white text-slate-700 rounded-full shadow-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  {quickViewProduct.category.replace('_', ' ')}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {quickViewProduct.name}
                </h3>
                <span className="text-lg font-black text-emerald-700 mt-1 block">
                  KES {quickViewProduct.price.toLocaleString()} ({quickViewProduct.unit || 'Piece'})
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {quickViewProduct.description}
              </p>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => {
                    addToCart(quickViewProduct, 1);
                    setQuickViewProduct(null);
                  }}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Add to Cart
                </button>
                <a
                  href={getWhatsAppUrl('product', quickViewProduct)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
