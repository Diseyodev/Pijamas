import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  sizes: string[];
};

// Imágenes placeholder mientras subes las definitivas del catálogo.
const gallery = [product1, product2, product3, product4, product5, product6];
// Placeholder: 2 imágenes por referencia hasta subir las definitivas.
const imgs = (i: number): string[] => [
  gallery[i % gallery.length],
  gallery[(i + 1) % gallery.length],
];

const SIZES = ["S", "M", "L", "XL"];

export const products: Product[] = [
  { id: "M08",   name: "Pijama Ref. M08",   description: "Pijama femenina Perfect Pijamas.", price: 65000,  images: imgs(0), category: "Pijamas",     sizes: SIZES },
  { id: "M08B",  name: "Pijama Ref. M08B",  description: "Pijama femenina Perfect Pijamas.", price: 65000,  images: imgs(1), category: "Pijamas",     sizes: SIZES },
  { id: "M08E",  name: "Pijama Ref. M08E",  description: "Pijama femenina Perfect Pijamas.", price: 75000,  images: imgs(2), category: "Pijamas",     sizes: SIZES },
  { id: "M08EL", name: "Pijama Ref. M08EL", description: "Pijama femenina Perfect Pijamas.", price: 75000,  images: imgs(3), category: "Pijamas",     sizes: SIZES },
  { id: "M10",   name: "Pijama Ref. M10",   description: "Pijama femenina Perfect Pijamas.", price: 22000,  images: imgs(4), category: "Pijamas",     sizes: SIZES },
  { id: "M15",   name: "Pijama Ref. M15",   description: "Pijama femenina Perfect Pijamas.", price: 35000,  images: imgs(5), category: "Pijamas",     sizes: SIZES },
  { id: "ME02",  name: "Pijama Ref. ME02",  description: "Pijama femenina Perfect Pijamas.", price: 40000,  images: imgs(0), category: "Especiales",  sizes: SIZES },
  { id: "ME02E", name: "Pijama Ref. ME02E", description: "Pijama femenina Perfect Pijamas.", price: 52000,  images: imgs(1), category: "Especiales",  sizes: SIZES },
  { id: "ME04",  name: "Pijama Ref. ME04",  description: "Pijama femenina Perfect Pijamas.", price: 30000,  images: imgs(2), category: "Especiales",  sizes: SIZES },
  { id: "ME08C", name: "Pijama Ref. ME08C", description: "Pijama femenina Perfect Pijamas.", price: 85000,  images: imgs(3), category: "Especiales",  sizes: SIZES },
  { id: "ME09",  name: "Pijama Ref. ME09",  description: "Pijama femenina Perfect Pijamas.", price: 40000,  images: imgs(4), category: "Especiales",  sizes: SIZES },
  { id: "ME12",  name: "Pijama Ref. ME12",  description: "Pijama femenina Perfect Pijamas.", price: 50000,  images: imgs(5), category: "Especiales",  sizes: SIZES },
  { id: "ME13",  name: "Pijama Ref. ME13",  description: "Pijama femenina Perfect Pijamas.", price: 35000,  images: imgs(0), category: "Especiales",  sizes: SIZES },
  { id: "ME16",  name: "Pijama Ref. ME16",  description: "Pijama femenina Perfect Pijamas.", price: 35000,  images: imgs(1), category: "Especiales",  sizes: SIZES },
  { id: "ME17",  name: "Pijama Ref. ME17",  description: "Pijama femenina Perfect Pijamas.", price: 55000,  images: imgs(2), category: "Especiales",  sizes: SIZES },
  { id: "ME18",  name: "Pijama Ref. ME18",  description: "Pijama femenina Perfect Pijamas.", price: 80000,  images: imgs(3), category: "Especiales",  sizes: SIZES },
  { id: "ME19",  name: "Pijama Ref. ME19",  description: "Pijama femenina Perfect Pijamas.", price: 45000,  images: imgs(4), category: "Especiales",  sizes: SIZES },
  { id: "ME20",  name: "Pijama Ref. ME20",  description: "Pijama femenina Perfect Pijamas.", price: 45000,  images: imgs(5), category: "Especiales",  sizes: SIZES },
  { id: "ME21",  name: "Pijama Ref. ME21",  description: "Pijama femenina Perfect Pijamas.", price: 45000,  images: imgs(0), category: "Especiales",  sizes: SIZES },
  { id: "ME22",  name: "Pijama Ref. ME22",  description: "Pijama femenina Perfect Pijamas.", price: 55000,  images: imgs(1), category: "Especiales",  sizes: SIZES },
  { id: "ME23",  name: "Pijama Ref. ME23",  description: "Pijama femenina Perfect Pijamas.", price: 75000,  images: imgs(2), category: "Especiales",  sizes: SIZES },
  { id: "ME24",  name: "Pijama Ref. ME24",  description: "Pijama femenina Perfect Pijamas.", price: 110000, images: imgs(3), category: "Especiales",  sizes: SIZES },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);