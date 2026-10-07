import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Printer, BookOpen, ShoppingBag, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceId: string) => void;
  onSelectProduct: (productId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectService,
  onSelectProduct,
}) => {
  const { services, products, addToCart } = useApp();
  const [query, setQuery] = useState('');

  const filteredServices = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return services.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }, [services, query]);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [products, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search cyber services, printing, exercise books, pens, files..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent border-none text-sm text-slate-900 focus:outline-none placeholder-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded bg-slate-200"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-6">
          {!query.trim() ? (
            <div className="py-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Quick Suggested Searches:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Printing', 'KRA PIN', 'eCitizen', 'A4 Ream', 'Exercise Books', 'Laminating', 'Passport Photos'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors border border-slate-200"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Services Results */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Printer className="w-3.5 h-3.5 text-emerald-600" />
                    Services ({filteredServices.length})
                  </span>
                </div>

                {filteredServices.length > 0 ? (
                  <div className="space-y-2">
                    {filteredServices.map((srv) => (
                      <div
                        key={srv.id}
                        className="p-3 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all flex items-center justify-between gap-4"
                      >
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{srv.name}</h4>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {srv.shortDescription}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                            <span>From KES {srv.startingPrice}</span>
                            <span>•</span>
                            <span>Est: {srv.estimatedTime}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            onSelectService(srv.id);
                            onClose();
                          }}
                          className="shrink-0 px-3 py-1.5 bg-slate-900 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                        >
                          <Calendar className="w-3 h-3 text-emerald-400" />
                          <span>Book</span>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No matching services found.</p>
                )}
              </div>

              {/* Products Results */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                    Bookshop & Stationery Products ({filteredProducts.length})
                  </span>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="space-y-2">
                    {filteredProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-3 rounded-xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50/20 transition-all flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          {prod.imageUrl ? (
                            <img
                              src={prod.imageUrl}
                              alt={prod.name}
                              className="w-12 h-12 object-cover rounded-lg border border-slate-200 shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 shrink-0">
                              <ShoppingBag className="w-5 h-5" />
                            </div>
                          )}
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">{prod.name}</h4>
                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                              {prod.description}
                            </p>
                            <span className="text-xs font-bold text-emerald-700">
                              KES {prod.price.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => {
                              addToCart(prod, 1);
                              onClose();
                            }}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                          >
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No matching stationery or books found.</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Press ESC or click close to exit search</span>
          <span className="font-semibold text-emerald-700">Tobstech Cyber & Bookshop</span>
        </div>
      </div>
    </div>
  );
};
