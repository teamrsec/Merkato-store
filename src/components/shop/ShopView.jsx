import { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import ProductCard from '../product/ProductCard';
import {
  Filter,
  SlidersHorizontal,
  Grid3X3,
  List,
  X,
  Search
} from 'lucide-react';

export default function ShopView() {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    lang,
    t,
    formatPrice
  } = useStore();

  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'price-low', 'price-high', 'rating', 'newest'
  const [priceRange, setPriceRange] = useState(250000);
  const [onlyEthiopianMade, setOnlyEthiopianMade] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract unique brands
  const brands = useMemo(() => {
    const set = new Set(products.map((p) => p.brand));
    return ['all', ...Array.from(set)];
  }, [products]);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory && p.category !== selectedCategory) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            p.name.toLowerCase().includes(q) ||
            p.nameAm.includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Price range
        if (p.price > priceRange) return false;

        // Ethiopian Made
        if (onlyEthiopianMade && !p.isEthiopianMade) return false;

        // In Stock
        if (onlyInStock && !p.inStock) return false;

        // Brand
        if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return (b.reviewsCount || 0) - (a.reviewsCount || 0); // popular
      });
  }, [
    products,
    selectedCategory,
    searchQuery,
    priceRange,
    onlyEthiopianMade,
    onlyInStock,
    selectedBrand,
    sortBy
  ]);

  return (
    <div className="bg-[#F8FAFC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {selectedCategory
                  ? categories.find((c) => c.id === selectedCategory)?.[lang === 'am' ? 'nameAm' : 'name'] || t('shop')
                  : t('shop')}
              </h1>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full">
                {filteredProducts.length} {lang === 'am' ? 'እቃዎች' : 'Items'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {searchQuery
                ? `${lang === 'am' ? 'ለ' : 'Search results for:'} "${searchQuery}"`
                : lang === 'am'
                ? 'በመርካቶ ስቶር የሚፈልጉትን እቃዎች በፍጥነት ያግኙ'
                : 'Browse trusted Ethiopian products and global brands.'}
            </p>
          </div>

          {/* Controls (Sort, View Switcher, Mobile Filter Button) */}
          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <Filter className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'am' ? 'ማጣሪያ' : 'Filters'}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              >
                <option value="popular">{lang === 'am' ? 'በብዛት የተወደዱ' : 'Most Popular'}</option>
                <option value="price-low">{lang === 'am' ? 'ዋጋ፡ ከዝቅተኛ ወደ ከፍተኛ' : 'Price: Low to High'}</option>
                <option value="price-high">{lang === 'am' ? 'ዋጋ፡ ከከፍተኛ ወደ ዝቅተኛ' : 'Price: High to Low'}</option>
                <option value="rating">{lang === 'am' ? 'ከፍተኛ ደረጃ' : 'Highest Rated'}</option>
                <option value="newest">{lang === 'am' ? 'አዲስ የገቡ' : 'Newest Arrivals'}</option>
              </select>
            </div>

            {/* View Mode Grid/List */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500'
                }`}
                title="Grid View"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'am' ? 'የእቃ ማጣሪያዎች' : 'Filter Products'}</span>
                </span>
                {(selectedCategory || searchQuery || onlyEthiopianMade || onlyInStock || selectedBrand !== 'all') && (
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSearchQuery('');
                      setOnlyEthiopianMade(false);
                      setOnlyInStock(false);
                      setSelectedBrand('all');
                      setPriceRange(250000);
                    }}
                    className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
                  >
                    {lang === 'am' ? 'ሁሉንም አጽዳ' : 'Reset All'}
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-3">
                  {lang === 'am' ? 'ምድብ' : 'Category'}
                </h4>
                <div className="space-y-1 max-h-60 overflow-y-auto no-scrollbar">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                      selectedCategory === null
                        ? 'bg-emerald-50 text-emerald-800 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{lang === 'am' ? 'ሁሉም ምድቦች' : 'All Categories'}</span>
                    <span>({products.length})</span>
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                        selectedCategory === c.id
                          ? 'bg-emerald-50 text-emerald-800 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{lang === 'am' ? c.nameAm : c.name}</span>
                      <span className="text-[10px] text-slate-400">({c.itemCount})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                    {lang === 'am' ? 'የዋጋ ክልል' : 'Max Price'}
                  </h4>
                  <span className="font-extrabold text-xs text-emerald-700 font-mono">
                    {formatPrice(priceRange)}
                  </span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={250000}
                  step={500}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              {/* Ethiopian Made Switch */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyEthiopianMade}
                    onChange={(e) => setOnlyEthiopianMade(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span>🇪🇹 {lang === 'am' ? 'በኢትዮጵያ የተመረቱ ብቻ' : 'Made in Ethiopia Only'}</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span>{lang === 'am' ? 'በክምችት ያሉ ብቻ' : 'In Stock Only'}</span>
                </label>
              </div>

              {/* Brand Selector */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-2">
                  {lang === 'am' ? 'ብራንድ / አምራች' : 'Brand'}
                </h4>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                >
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b === 'all' ? (lang === 'am' ? 'ሁሉም ብራንዶች' : 'All Brands') : b}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </aside>

          {/* Right Product Grid/List */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-1">
                  {lang === 'am' ? 'ምንም አይነት እቃ አልተገኘም' : 'No Matching Products Found'}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                  {lang === 'am'
                    ? 'እባክዎ የተለየ ቃል ይፈልጉ ወይም ማጣሪያዎችን ያጽዱ።'
                    : 'Try clearing your filters or search for something else like "Samsung", "Habesha Kemis", or "Coffee".'}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery('');
                    setOnlyEthiopianMade(false);
                    setOnlyInStock(false);
                    setSelectedBrand('all');
                    setPriceRange(250000);
                  }}
                  className="px-6 py-2.5 bg-emerald-600 text-white rounded-full text-xs font-bold shadow-md cursor-pointer"
                >
                  {lang === 'am' ? 'ማጣሪያዎችን አጽዳ' : 'Reset All Filters'}
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} viewMode={viewMode} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer Filter */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative bg-white w-4/5 max-w-xs h-full p-6 shadow-2xl overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-base text-slate-900">{lang === 'am' ? 'ማጣሪያ' : 'Filters'}</span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 rounded-full bg-slate-100 text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Filters Body */}
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-xs uppercase text-slate-600 mb-2">Category</h4>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setIsMobileFilterOpen(false);
                    }}
                    className="w-full text-left px-2 py-1 text-xs"
                  >
                    All Categories
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedCategory(c.id);
                        setIsMobileFilterOpen(false);
                      }}
                      className="w-full text-left px-2 py-1 text-xs"
                    >
                      {lang === 'am' ? c.nameAm : c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery('');
                    setOnlyEthiopianMade(false);
                    setOnlyInStock(false);
                    setIsMobileFilterOpen(false);
                  }}
                  className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold"
                >
                  Reset & Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

