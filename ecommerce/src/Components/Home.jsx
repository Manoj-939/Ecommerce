import { useEffect, useMemo, useState } from "react";

/* ---------- Data (swap `emoji` for real image URLs later) ---------- */
const categories = [
  { name: "All", icon: "🛍️" },
  { name: "Mobiles", icon: "📱" },
  { name: "Electronics", icon: "💻" },
  { name: "Fashion", icon: "👕" },
  { name: "Home", icon: "🛋️" },
  { name: "Appliances", icon: "🧺" },
  { name: "Beauty", icon: "💄" },
  { name: "Toys", icon: "🧸" },
];

const banners = [
  { title: "Big Billion Days", sub: "Up to 80% off on mobiles & electronics", cta: "Shop now", bg: "from-blue-600 to-indigo-700" },
  { title: "Fashion Fest", sub: "Min. 50% off on top brands", cta: "Explore", bg: "from-pink-500 to-orange-500" },
  { title: "Home Makeover", sub: "Furniture & decor starting at ₹499", cta: "View deals", bg: "from-emerald-500 to-teal-700" },
];

const products = [
  { id: 1, name: "Galaxy S24 5G (128 GB)", brand: "Samsung", category: "Mobiles", price: 64999, mrp: 79999, rating: 4.5, reviews: 18230, emoji: "📱", bg: "bg-sky-100", offers: ["Bank Offer: 10% off on HDFC cards", "Exchange up to ₹20,000"], specs: { Display: "6.2\" AMOLED, 120 Hz", RAM: "8 GB", Camera: "50 MP + 12 MP + 10 MP", Battery: "4000 mAh", Warranty: "1 year" } },
  { id: 2, name: "iPhone 15 (128 GB)", brand: "Apple", category: "Mobiles", price: 69900, mrp: 79900, rating: 4.6, reviews: 25410, emoji: "📲", bg: "bg-slate-100", offers: ["No-cost EMI from ₹11,650/month", "Free delivery"], specs: { Display: "6.1\" Super Retina XDR", Chip: "A16 Bionic", Camera: "48 MP + 12 MP", Battery: "Up to 20 hrs video", Warranty: "1 year" } },
  { id: 3, name: "Redmi Note 13 Pro (8 GB)", brand: "Redmi", category: "Mobiles", price: 22999, mrp: 29999, rating: 4.3, reviews: 9870, emoji: "📱", bg: "bg-orange-100", offers: ["Extra ₹1,000 off with UPI", "Exchange up to ₹14,000"], specs: { Display: "6.67\" AMOLED, 120 Hz", RAM: "8 GB", Camera: "200 MP main", Battery: "5100 mAh", Warranty: "1 year" } },
  { id: 4, name: "Vivobook 15 Laptop (i5, 16 GB)", brand: "ASUS", category: "Electronics", price: 47990, mrp: 66990, rating: 4.2, reviews: 5320, emoji: "💻", bg: "bg-indigo-100", offers: ["Bank Offer: 5% cashback on Axis cards", "Free Office 2021"], specs: { Processor: "Intel Core i5 13th Gen", RAM: "16 GB DDR4", Storage: "512 GB SSD", Display: "15.6\" FHD", Warranty: "1 year" } },
  { id: 5, name: "Wireless Neckband Earphones", brand: "boAt", category: "Electronics", price: 999, mrp: 2990, rating: 4.1, reviews: 142300, emoji: "🎧", bg: "bg-red-100", offers: ["Buy 2, save extra 5%", "Free delivery"], specs: { Type: "In-ear neckband", Battery: "Up to 30 hrs", Bluetooth: "v5.2", Charging: "Type-C fast charge", Warranty: "1 year" } },
  { id: 6, name: "Smart Watch Active 3", brand: "Noise", category: "Electronics", price: 2499, mrp: 7999, rating: 4.0, reviews: 38760, emoji: "⌚", bg: "bg-purple-100", offers: ["Special price — limited time", "Bank Offer: 10% off on ICICI cards"], specs: { Display: "1.8\" AMOLED", Battery: "7 days", Features: "SpO2, heart rate, 100+ sports modes", "Water resistance": "IP68", Warranty: "1 year" } },
  { id: 7, name: "Men's Slim Fit Casual Shirt", brand: "Roadster", category: "Fashion", price: 549, mrp: 1599, rating: 4.2, reviews: 22140, emoji: "👔", bg: "bg-amber-100", offers: ["Min. 50% off", "Easy 10-day returns"], specs: { Fabric: "100% cotton", Fit: "Slim", Sleeve: "Full sleeve", Care: "Machine wash", Sizes: "S – XXL" } },
  { id: 8, name: "Women's Running Shoes", brand: "Puma", category: "Fashion", price: 1799, mrp: 4499, rating: 4.3, reviews: 12980, emoji: "👟", bg: "bg-rose-100", offers: ["Extra 10% off on prepaid orders", "Free delivery"], specs: { Material: "Mesh upper", Sole: "EVA cushioned", Closure: "Lace-up", Use: "Running, gym", Sizes: "UK 3 – 8" } },
  { id: 9, name: "3-Seater Fabric Sofa", brand: "Wakefit", category: "Home", price: 18499, mrp: 32999, rating: 4.1, reviews: 2150, emoji: "🛋️", bg: "bg-lime-100", offers: ["Free installation", "No-cost EMI available"], specs: { Seating: "3 persons", Material: "Fabric, solid wood frame", Colour: "Grey", Assembly: "Carpenter assembly", Warranty: "3 years" } },
  { id: 10, name: "Front Load Washing Machine 7 kg", brand: "LG", category: "Appliances", price: 31490, mrp: 44990, rating: 4.4, reviews: 7640, emoji: "🧺", bg: "bg-cyan-100", offers: ["Exchange up to ₹3,000", "Free installation & demo"], specs: { Capacity: "7 kg", Type: "Fully automatic front load", "Energy rating": "5 star", Spin: "1200 RPM", Warranty: "2 years + 10 years motor" } },
  { id: 11, name: "Vitamin C Face Serum 30 ml", brand: "Minimalist", category: "Beauty", price: 599, mrp: 699, rating: 4.4, reviews: 54320, emoji: "🧴", bg: "bg-yellow-100", offers: ["Buy 2, get 10% off"], specs: { Size: "30 ml", "Skin type": "All skin types", Concentration: "10% Vitamin C", Benefit: "Brightening, even tone", Expiry: "24 months" } },
  { id: 12, name: "Building Blocks Set (500 pcs)", brand: "Lego", category: "Toys", price: 1299, mrp: 1999, rating: 4.6, reviews: 3890, emoji: "🧸", bg: "bg-fuchsia-100", offers: ["Gift wrap available", "Free delivery"], specs: { Pieces: "500", "Age group": "6+ years", Material: "ABS plastic", Skills: "Creativity, motor skills", Warranty: "No" } },
];

const inr = (n) => "₹" + n.toLocaleString("en-IN");
const off = (p) => Math.round(((p.mrp - p.price) / p.mrp) * 100);

/* ---------- Small pieces ---------- */
const Rating = ({ value, count }) => (
  <div className="flex items-center gap-2 text-sm">
    <span className="rounded bg-green-600 px-1.5 py-0.5 text-xs font-semibold text-white">{value} ★</span>
    <span className="text-gray-500">({count.toLocaleString("en-IN")})</span>
  </div>
);

function ProductCard({ p, onOpen, onAdd }) {
  return (
    <div className="flex flex-col rounded-sm border border-gray-200 bg-white p-3 transition hover:shadow-lg">
      <button onClick={() => onOpen(p)} className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
        <div className={`flex h-40 items-center justify-center rounded ${p.bg} text-6xl`}>{p.emoji}</div>
        <p className="mt-3 text-xs font-medium text-gray-500">{p.brand}</p>
        <h3 className="line-clamp-2 min-h-10 text-sm font-medium text-gray-900">{p.name}</h3>
      </button>
      <Rating value={p.rating} count={p.reviews} />
      <div className="mt-2 flex flex-wrap items-baseline gap-2">
        <span className="text-lg font-semibold">{inr(p.price)}</span>
        <span className="text-sm text-gray-500 line-through">{inr(p.mrp)}</span>
        <span className="text-sm font-semibold text-green-600">{off(p)}% off</span>
      </div>
      <button onClick={() => onAdd(p)} className="mt-3 rounded-sm bg-yellow-400 py-2 text-sm font-semibold text-gray-900 hover:bg-yellow-500">
        Add to cart
      </button>
    </div>
  );
}

function ProductModal({ p, onClose, onAdd }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded bg-white" onClick={(e) => e.stopPropagation()}>
        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div className={`flex h-64 items-center justify-center rounded ${p.bg} text-8xl md:h-full`}>{p.emoji}</div>
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">{p.brand}</p>
                <h2 className="text-xl font-semibold">{p.name}</h2>
              </div>
              <button onClick={onClose} aria-label="Close" className="text-2xl leading-none text-gray-400 hover:text-gray-700">×</button>
            </div>
            <div className="mt-2"><Rating value={p.rating} count={p.reviews} /></div>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-3xl font-semibold">{inr(p.price)}</span>
              <span className="text-gray-500 line-through">{inr(p.mrp)}</span>
              <span className="font-semibold text-green-600">{off(p)}% off</span>
            </div>
            <h3 className="mt-4 text-sm font-semibold">Available offers</h3>
            <ul className="mt-1 space-y-1 text-sm text-gray-700">
              {p.offers.map((o) => <li key={o}>🏷️ {o}</li>)}
            </ul>
            <h3 className="mt-4 text-sm font-semibold">Specifications</h3>
            <dl className="mt-1 divide-y divide-gray-100 text-sm">
              {Object.entries(p.specs).map(([k, v]) => (
                <div key={k} className="flex gap-4 py-1.5">
                  <dt className="w-28 shrink-0 text-gray-500">{k}</dt>
                  <dd className="text-gray-900">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex gap-3">
              <button onClick={() => { onAdd(p); onClose(); }} className="flex-1 rounded-sm bg-yellow-400 py-3 font-semibold hover:bg-yellow-500">Add to cart</button>
              <button onClick={() => { onAdd(p); onClose(); }} className="flex-1 rounded-sm bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600">Buy now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % banners.length), 4500);
    return () => clearInterval(t);
  }, []);
  const b = banners[i];
  const go = (d) => setI((i + d + banners.length) % banners.length);
  return (
    <section className={`relative flex h-44 items-center bg-linear-to-r ${b.bg} px-6 text-white sm:h-64 sm:px-16`}>
      <button onClick={() => go(-1)} aria-label="Previous banner" className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 px-2 py-6 text-xl text-gray-800">‹</button>
      <div>
        <h2 className="text-3xl font-bold sm:text-5xl">{b.title}</h2>
        <p className="mt-2 text-sm sm:text-lg">{b.sub}</p>
        <button className="mt-4 rounded-sm bg-white px-5 py-2 text-sm font-semibold text-blue-700">{b.cta}</button>
      </div>
      <button onClick={() => go(1)} aria-label="Next banner" className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 px-2 py-6 text-xl text-gray-800">›</button>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {banners.map((_, n) => (
          <button key={n} onClick={() => setI(n)} aria-label={`Banner ${n + 1}`} className={`h-2 w-2 rounded-full ${n === i ? "bg-white" : "bg-white/40"}`} />
        ))}
      </div>
    </section>
  );
}

/* ---------- Page ---------- */
export default function Home() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState(0);
  const [selected, setSelected] = useState(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) =>
      (category === "All" || p.category === category) &&
      (!q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
    );
  }, [category, query]);

  const deals = useMemo(() => [...products].sort((a, b) => off(b) - off(a)).slice(0, 6), []);
  const addToCart = () => setCart((c) => c + 1);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-blue-600 text-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <a href="/" className="text-2xl font-bold italic">ShopKart<span className="ml-1 text-sm font-normal text-yellow-300">Explore Plus ✦</span></a>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, brands and more"
            className="hidden h-10 flex-1 rounded-sm bg-white px-4 text-sm text-gray-900 outline-none sm:block"
          />
          <button className="rounded-sm bg-white px-6 py-1.5 text-sm font-semibold text-blue-600">Login</button>
          <button className="relative flex items-center gap-1 font-semibold">
            🛒 Cart
            {cart > 0 && <span className="absolute -right-3 -top-2 rounded-full bg-red-500 px-1.5 text-xs">{cart}</span>}
          </button>
        </div>
        <div className="px-4 pb-3 sm:hidden">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" className="h-10 w-full rounded-sm bg-white px-4 text-sm text-gray-900 outline-none" />
        </div>
      </header>

      {/* Category strip */}
      <nav className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 py-3">
          {categories.map((c) => (
            <button key={c.name} onClick={() => setCategory(c.name)} className={`flex shrink-0 flex-col items-center gap-1 border-b-2 pb-1 text-sm font-medium ${category === c.name ? "border-blue-600 text-blue-600" : "border-transparent text-gray-700 hover:text-blue-600"}`}>
              <span className="text-3xl">{c.icon}</span>
              {c.name}
            </button>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-7xl space-y-4 py-4">
        <Hero />

        {/* Deals of the day */}
        <section className="bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Deals of the Day <span className="ml-2 text-sm font-normal text-red-600">⏰ Ends tonight</span></h2>
            <button onClick={() => setCategory("All")} className="rounded-sm bg-blue-600 px-4 py-1.5 text-sm font-medium text-white">View all</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {deals.map((p) => (
              <button key={p.id} onClick={() => setSelected(p)} className="w-40 shrink-0 text-left">
                <div className={`flex h-32 items-center justify-center rounded ${p.bg} text-5xl`}>{p.emoji}</div>
                <p className="mt-2 truncate text-sm font-medium">{p.name}</p>
                <p className="text-sm font-semibold text-green-600">Min. {off(p)}% off</p>
                <p className="text-xs text-gray-500">From {inr(p.price)}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Product grid */}
        <section className="bg-white p-4">
          <h2 className="mb-3 text-xl font-semibold">
            {category === "All" ? "Recommended for you" : category}
            <span className="ml-2 text-sm font-normal text-gray-500">({visible.length} items)</span>
          </h2>
          {visible.length === 0 ? (
            <p className="py-12 text-center text-gray-500">No products match "{query}". Try a different search or category.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {visible.map((p) => <ProductCard key={p.id} p={p} onOpen={setSelected} onAdd={addToCart} />)}
            </div>
          )}
        </section>

        {/* Perks */}
        <section className="grid grid-cols-2 gap-3 bg-white p-4 text-center text-sm sm:grid-cols-4">
          {[["🚚", "Free delivery", "On orders above ₹499"], ["↩️", "Easy returns", "10-day return policy"], ["🔒", "Secure payments", "UPI, cards, EMI, COD"], ["🛟", "24×7 support", "We're always here"]].map(([i, t, s]) => (
            <div key={t}><div className="text-3xl">{i}</div><p className="font-semibold">{t}</p><p className="text-gray-500">{s}</p></div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-sm text-gray-300">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-4">
          {[["About", ["Contact Us", "About Us", "Careers", "Press"]], ["Help", ["Payments", "Shipping", "Cancellation & Returns", "FAQ"]], ["Policy", ["Return Policy", "Terms of Use", "Security", "Privacy"]], ["Social", ["Facebook", "Instagram", "X", "YouTube"]]].map(([h, links]) => (
            <div key={h}>
              <h4 className="mb-2 font-semibold text-gray-500">{h}</h4>
              <ul className="space-y-1">{links.map((l) => <li key={l}><a href="#" className="hover:underline">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <p className="border-t border-slate-700 py-4 text-center text-xs text-gray-500">© 2026 ShopKart. All rights reserved.</p>
      </footer>

      {selected && <ProductModal p={selected} onClose={() => setSelected(null)} onAdd={addToCart} />}
    </div>
  );
}
