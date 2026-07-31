import { useState, useMemo, useEffect } from "react";
import { ShoppingBag, X, Plus, Minus, Trash2, Sparkles, Share2, ZoomIn, ChevronLeft, ChevronRight, SlidersHorizontal, RotateCcw } from "lucide-react";
import heroImg from "@/assets/hero-pajamas.jpg";
import { products, formatPrice, type Product, type Category } from "@/lib/products";
import { CartProvider, useCart } from "@/lib/cart";

// Número de WhatsApp de la tienda (formato internacional, sin +)
const WHATSAPP_NUMBER = "573105768314";
// Tallas disponibles para el filtro
const AVAILABLE_SIZES = ["S", "M", "L", "XL", "UNICA", "2", "4", "6", "8", "10", "12" , "14", "16", "2-4", "6-8", "10-12", "14-16"];
type SortOrder = "default" | "price-asc" | "price-desc";

// Función utilitaria para compartir/preguntar por WhatsApp
async function shareProductViaWhatsApp(product: Product, size?: string) {
  const currentImgUrl = new URL(product.images[0], window.location.href).href;
  const message = `¡Hola! Me interesa obtener más información sobre la *${product.name}* (${product.description})${size ? ` en talla *${size}*` : ""}.\n\nImagen: ${currentImgUrl}`;

  if (navigator.share) {
    try {
      const response = await fetch(currentImgUrl);
      const blob = await response.blob();
      const file = new File([blob], `${product.id}.jpg`, { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: product.name,
          text: message,
          files: [file],
        });
        return;
      }
    } catch (e) {
      console.warn("No se pudo compartir la imagen como archivo, usando WhatsApp Web URL como fallback", e);
    }
  }

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, "_blank");
}

function Header({ onOpenCart }: { onOpenCart: () => void }) {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="font-serif text-xl tracking-wide text-foreground">
            Perfect <span className="text-primary">Pijamas</span>
          </span>
        </a>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#catalogo" className="hover:text-foreground">Catálogo</a>
          <a href="#nosotras" className="hover:text-foreground">Nosotras</a>
          <a href="#contacto" className="hover:text-foreground">Contacto</a>
        </nav>
        <button
          onClick={onOpenCart}
          className="relative inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-90"
        >
          <ShoppingBag className="h-4 w-4" />
          Carrito
          {count > 0 && (
            <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-background px-1.5 text-xs font-semibold text-primary">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:py-28">
        <div>
          <span className="inline-block rounded-full bg-background/70 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
            Nueva colección
          </span>
          <h1 className="mt-4 font-serif text-5xl leading-tight text-foreground md:text-6xl">
            Noches suaves,<br />mañanas felices.
          </h1>
          <p className="mt-5 max-w-md text-base text-muted-foreground">
            Pijamas femeninas en satén, algodón y encaje. Diseñadas para acariciar tu piel en cada descanso.
          </p>
          <div className="mt-8 flex gap-3">
            <a
              href="#catalogo"
              className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-90"
            >
              Ver catálogo
            </a>
            <a
              href="#nosotras"
              className="rounded-full border border-foreground/20 bg-background/60 px-6 py-3 text-sm font-medium text-foreground transition hover:bg-background"
            >
              Conócenos
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-[2rem] bg-background/40 blur-2xl" />
          <img
            src={heroImg}
            alt="Pijama de satén rosa sobre fondo beige"
            width={1024}
            height={1024}
            className="relative w-full rounded-[2rem] object-cover shadow-[var(--shadow-soft)]"
          />
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [size, setSize] = useState<string>("");
  const [error, setError] = useState(false);
  const [idx, setIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  // Reiniciar estado interno si cambia el producto asignado
  useEffect(() => {
    setSize("");
    setError(false);
    setIdx(0);
    setAdded(false);
  }, [p.id]);

  const current = p.images[idx] ?? p.images[0];

  return (
    <>
      <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition hover:shadow-[var(--shadow-soft)]">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <button
            type="button"
            onClick={() => setLightbox(true)}
            aria-label={`Ampliar imagen de ${p.name}`}
            className="block h-full w-full overflow-hidden"
          >
            <img
              src={current}
              alt={`${p.name} — imagen ${idx + 1}`}
              width={1024}
              height={1024}
              loading="lazy"
              className="h-full w-full object-cover scale-110 transition duration-500 group-hover:scale-120"
            />
          </button>

          <span className="pointer-events-none absolute right-2 top-2 z-10 rounded-full bg-background/80 p-1.5 text-primary shadow-sm backdrop-blur-sm">
            <ZoomIn className="h-4 w-4" />
          </span>

          {p.images.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-center gap-1.5 px-3">
              {p.images.map((src, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIdx(i);
                  }}
                  className={`h-10 w-10 shrink-0 overflow-hidden rounded-lg border-2 shadow-sm transition-all ${
                    i === idx
                      ? "border-primary ring-2 ring-primary/30 scale-105"
                      : "border-background/80 opacity-80 hover:opacity-100 hover:border-background"
                  }`}
                  aria-label={`Ver miniatura ${i + 1}`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">{p.category}</span>
            <button
              onClick={() => shareProductViaWhatsApp(p, size)}
              title="Preguntar por WhatsApp"
              className="flex items-center gap-1 text-xs text-muted-foreground transition hover:text-[#25D366]"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Consultar</span>
            </button>
          </div>

          <h3 className="mt-1 font-serif text-lg text-foreground">{p.name}</h3>
          
          <div className="mt-1 text-sm text-muted-foreground">
            <p>{p.description}</p>
            {p.description2 && <p className="mt-0.5">{p.description2}</p>}
          </div>

          <div className="mt-auto pt-4">
            <div>
              <span className="text-xs text-muted-foreground">Talla:</span>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {p.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSize(s);
                      setError(false);
                    }}
                    className={`rounded-full border px-3 py-1 text-xs transition ${
                      size === s
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:border-primary"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {error && <p className="mt-1 text-xs text-destructive">Selecciona una talla</p>}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="font-semibold text-foreground">{formatPrice(p.price)}</span>
              <button
                onClick={() => {
                  if (!size) {
                    setError(true);
                    return;
                  }
                  add(p, size);
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1200);
                }}
                className="rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition hover:opacity-90"
              >
                {added ? "Agregada ✓" : "Agregar"}
              </button>
            </div>
          </div>
        </div>
      </article>

      <Lightbox
        open={lightbox}
        onClose={() => setLightbox(false)}
        images={p.images}
        index={idx}
        setIndex={setIdx}
        alt={p.name}
      />
    </>
  );
}

function Lightbox({
  open,
  onClose,
  images,
  index,
  setIndex,
  alt,
}: {
  open: boolean;
  onClose: () => void;
  images: string[];
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>> | ((i: number) => void);
  alt: string;
}) {
  if (!open) return null;

  const prev = () => setIndex((index - 1 + images.length) % images.length);
  const next = () => setIndex((index + 1) % images.length);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key === "ArrowRight") {
        next();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, images.length]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute right-4 top-4 z-10 rounded-full bg-background/90 p-2 text-foreground shadow-md transition hover:bg-background"
      >
        <X className="h-5 w-5" />
      </button>

      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Anterior"
          className="absolute left-4 z-10 rounded-full bg-background/90 p-2 text-foreground shadow-md transition hover:bg-background"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      <img
        src={images[index]}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
      />

      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Siguiente"
          className="absolute right-4 z-10 rounded-full bg-background/90 p-2 text-foreground shadow-md transition hover:bg-background"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      {images.length > 1 && (
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/90 px-3 py-1 text-xs text-foreground shadow-md">
          {index + 1} / {images.length}
        </span>
      )}
    </div>
  );
}

function Catalog() {
  const [category, setCategory] = useState<Category | "Todas">("Todas");
  const [selectedSize, setSelectedSize] = useState<string>("Todas");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const [showFiltersMobile, setShowFiltersMobile] = useState<boolean>(false);

  const categories: (Category | "Todas")[] = ["Todas", "Damas", "Caballeros", "Niños"];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (category !== "Todas") {
      result = result.filter((p) => p.category === category);
    }

    if (selectedSize !== "Todas") {
      result = result.filter((p) => p.sizes.includes(selectedSize));
    }

    if (minPrice !== "" && !isNaN(Number(minPrice))) {
      result = result.filter((p) => p.price >= Number(minPrice));
    }

    if (maxPrice !== "" && !isNaN(Number(maxPrice))) {
      result = result.filter((p) => p.price <= Number(maxPrice));
    }

    if (sortOrder === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [category, selectedSize, minPrice, maxPrice, sortOrder]);

  const resetFilters = () => {
    setCategory("Todas");
    setSelectedSize("Todas");
    setMinPrice("");
    setMaxPrice("");
    setSortOrder("default");
  };

  const hasActiveFilters =
    category !== "Todas" ||
    selectedSize !== "Todas" ||
    minPrice !== "" ||
    maxPrice !== "" ||
    sortOrder !== "default";

  return (
    <section id="catalogo" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-xs uppercase tracking-widest text-primary">Catálogo</span>
          <h2 className="mt-2 font-serif text-4xl text-foreground">Nuestra colección</h2>
        </div>

        <button
          onClick={() => setShowFiltersMobile(!showFiltersMobile)}
          className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-foreground md:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filtros y Orden</span>
        </button>
      </div>

      <div
        className={`mb-8 rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all ${
          showFiltersMobile ? "block" : "hidden md:block"
        }`}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Categoría
            </label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-3 py-1 text-xs transition ${
                    category === cat
                      ? "bg-primary text-primary-foreground font-medium"
                      : "border border-border bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Talla
            </label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="Todas">Todas las tallas</option>
              {AVAILABLE_SIZES.map((sz) => (
                <option key={sz} value={sz}>
                  Talla {sz}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Rango de Precio (COP)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Mín"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <span className="text-muted-foreground">-</span>
              <input
                type="number"
                placeholder="Máx"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Ordenar por
            </label>
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="default">Recomendados / Defecto</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
            <span className="text-xs text-muted-foreground">
              Mostrando {filteredAndSortedProducts.length} productos
            </span>
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 text-xs font-medium text-destructive hover:underline"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Restablecer filtros</span>
            </button>
          </div>
        )}
      </div>

      {filteredAndSortedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          <p className="text-base font-medium">No se encontraron pijamas con los filtros aplicados.</p>
          <button
            onClick={resetFilters}
            className="mt-3 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition hover:opacity-90"
          >
            Ver todo el catálogo
          </button>
        </div>
      ) : (
        /* Clave dinámica para forzar la recreación del DOM al cambiar filtros */
        <div 
          key={`${category}-${selectedSize}-${sortOrder}-${minPrice}-${maxPrice}`} 
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredAndSortedProducts.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </section>
  );
}

function About() {
  return (
    <section id="nosotras" className="bg-secondary/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2">
        <div>
          <span className="text-xs uppercase tracking-widest text-primary">Nosotras</span>
          <h2 className="mt-2 font-serif text-4xl text-foreground">Hecho con amor para ti</h2>
          <p className="mt-4 text-muted-foreground">
            En Perfect Pijamas creemos que descansar bien es un acto de amor propio. Diseñamos pijamas femeninas
            con telas suaves, cortes favorecedores y una paleta cálida en rosa, blanco y beige.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { n: "+2K", l: "Clientas felices" },
            { n: "6", l: "Colecciones" },
            { n: "100%", l: "Envío nacional" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl bg-background p-6 shadow-sm">
              <div className="font-serif text-3xl text-primary">{s.n}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contacto" className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="font-serif text-lg text-foreground">Perfect Pijamas</span>
        </div>
        <p className="text-sm text-muted-foreground">
          WhatsApp: <a className="text-primary hover:underline" href={`https://wa.me/${WHATSAPP_NUMBER}`}>+{WHATSAPP_NUMBER}</a>
        </p>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Perfect Pijamas</p>
      </div>
    </footer>
  );
}

function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, setQty, remove, total, count, clear } = useCart();

  const sendWhatsApp = () => {
    if (items.length === 0) return;
    const lines = items.map(
      (i) => `• ${i.product.name} (Talla ${i.size}) x${i.quantity} — ${formatPrice(i.product.price * i.quantity)}`,
    );
    const msg = [
      "¡Hola Perfect Pijamas! 🌸",
      "Quiero hacer este pedido:",
      "",
      ...lines,
      "",
      `Total: ${formatPrice(total)}`,
      "",
      "¿Me pueden confirmar disponibilidad y envío?",
    ].join("\n");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-foreground/40 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-border p-5">
          <h3 className="font-serif text-xl text-foreground">Tu carrito ({count})</h3>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-secondary">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
              <ShoppingBag className="mb-3 h-10 w-10 text-primary/60" />
              <p>Tu carrito está vacío.</p>
              <p className="text-sm">Agrega tus pijamas favoritas 🌸</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((i) => (
                <li key={`${i.product.id}-${i.size}`} className="flex gap-3 rounded-xl border border-border/60 p-3">
                  <img src={i.product.images[0]} alt={i.product.name} className="h-20 w-20 rounded-lg object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium text-foreground">
                        {i.product.name}
                        <span className="ml-1 text-xs text-muted-foreground">· Talla {i.size}</span>
                      </span>
                      <button onClick={() => remove(i.product.id, i.size)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="text-sm text-primary">{formatPrice(i.product.price)}</span>
                    <div className="mt-auto flex items-center gap-2">
                      <button
                        onClick={() => setQty(i.product.id, i.size, i.quantity - 1)}
                        className="rounded-full border border-border p-1 hover:bg-secondary"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm">{i.quantity}</span>
                      <button
                        onClick={() => setQty(i.product.id, i.size, i.quantity + 1)}
                        className="rounded-full border border-border p-1 hover:bg-secondary"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="font-serif text-2xl text-foreground">{formatPrice(total)}</span>
          </div>
          <button
            onClick={sendWhatsApp}
            disabled={items.length === 0}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-medium text-white shadow-[var(--shadow-soft)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
              <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.7.1-.3-.1-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.5.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5H7.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.2-.3-.3-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.3L2 22l4.8-1.5C8.4 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z" />
            </svg>
            Enviar pedido por WhatsApp
          </button>
          {items.length > 0 && (
            <button onClick={clear} className="mt-2 w-full text-xs text-muted-foreground hover:text-destructive">
              Vaciar carrito
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

function WhatsAppFloatingButton() {
  const message = encodeURIComponent(
    "¡Hola Perfect Pijamas! 🌸 Quisiera recibir asesoría personalizada para elegir una pijama."
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Asesoría por WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-[#20ba5a] active:scale-95"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
        <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.7.1-.3-.1-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.5.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5H7.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.2-.3-.3-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.3L2 22l4.8-1.5C8.4 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z" />
      </svg>
      <span className="hidden text-sm font-medium sm:inline">¿Necesitas asesoría?</span>
    </a>
  );
}

function StorefrontInner() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onOpenCart={() => setOpen(true)} />
      <main>
        <Hero />
        <Catalog />
        <About />
      </main>
      <Footer />
      <CartDrawer open={open} onClose={() => setOpen(false)} />
      <WhatsAppFloatingButton />
    </div>
  );
}

export default function Storefront() {
  return (
    <CartProvider>
      <StorefrontInner />
    </CartProvider>
  );
}