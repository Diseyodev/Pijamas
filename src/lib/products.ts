import m08 from "@/assets/M08.jpg";
import m08B from "@/assets/M08B.jpg";
import m08E1 from "@/assets/M08E1.jpg";
import m08E2 from "@/assets/M08E2.jpg";
import m08EL from "@/assets/M08EL.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

export type Product = {
  id: string;
  name: string;
  description: string;
  description2: string;
  price: number;
  images: string[];
  category: string;
  sizes: string[];
};

const SIZES = ["S", "M", "L", "XL"];

const productImagesMap: Record<string, string[]> = {
  M08: [m08], 
  M08B: [m08B], 
  M08E: [m08E1, m08E2],                  
  M08EL: [m08EL],                  
};

// Imagen de respaldo por si no has subido ninguna para algún ID
const DEFAULT_IMAGES = [m08];

// Función auxiliar para obtener las imágenes de cada producto
const getProductImages = (id: string): string[] => {
  return productImagesMap[id] || DEFAULT_IMAGES;
};

export const products: Product[] = [
  { id: "M08",   name: "Pijama Ref. M08",   description: "Short con camisa botones.", description2:"Tela piel de durazno.", price: 60000,  images: getProductImages("M08"),   category: "Pijamas",   sizes: ["M"] },
  { id: "M08B",  name: "Pijama Ref. M08B",  description: "Shorts con camisa bordada.", description2:"Tela piel de durazno.", price: 60000,  images: getProductImages("M08B"),  category: "Pijamas",   sizes: SIZES },
  { id: "M08E",  name: "Pijama Ref. M08E",  description: "Trio de short, top y camisa botones.", description2:"Tela piel de durazno.", price: 75000,  images: getProductImages("M08E"),  category: "Pijamas",   sizes:  ["L","XL"]  },
  { id: "M08EL", name: "Pijama Ref. M08EL", description: "Trio: Short con camisa y top.", description2:"Tela piel de durazno.", price: 75000,  images: getProductImages("M08EL"), category: "Pijamas",   sizes: SIZES },
  { id: "M10",   name: "Pijama Ref. M10",   description: "Pijama femenina Perfect Pijamas.", description2:"Tela piel de durazno.", price: 22000,  images: getProductImages("M10"),   category: "Pijamas",   sizes: SIZES },
  { id: "M15",   name: "Pijama Ref. M15",   description: "Pijama femenina Perfect Pijamas.", description2:"Tela piel de durazno.", price: 35000,  images: getProductImages("M15"),   category: "Pijamas",   sizes: SIZES },
  { id: "ME02",  name: "Pijama Ref. ME02",  description: "Pijama femenina Perfect Pijamas.", description2:"Tela piel de durazno.", price: 40000,  images: getProductImages("ME02"),  category: "Especiales", sizes: SIZES },
  { id: "ME02E", name: "Pijama Ref. ME02E", description: "Pijama femenina Perfect Pijamas.", description2:"Tela piel de durazno.", price: 52000,  images: getProductImages("ME02E"), category: "Especiales", sizes: SIZES },
  { id: "ME04",  name: "Pijama Ref. ME04",  description: "Pijama femenina Perfect Pijamas.", description2:"Tela piel de durazno.", price: 30000,  images: getProductImages("ME04"),  category: "Especiales", sizes: SIZES },
  { id: "ME08C", name: "Pijama Ref. ME08C", description: "Pijama femenina Perfect Pijamas.", description2:"Tela piel de durazno.", price: 85000,  images: getProductImages("ME08C"), category: "Especiales", sizes: SIZES },
  { id: "ME09",  name: "Pijama Ref. ME09",  description: "Pijama femenina Perfect Pijamas.", description2:"Tela piel de durazno.", price: 40000,  images: getProductImages("ME09"),  category: "Especiales", sizes: SIZES },
  { id: "ME12",  name: "Pijama Ref. ME12",  description: "Pijama femenina Perfect Pijamas.", description2:"Tela piel de durazno.", price: 50000,  images: getProductImages("ME12"),  category: "Especiales", sizes: SIZES },
  { id: "ME13",  name: "Pijama Ref. ME13",  description: "Pijama femenina Perfect Pijamas.", description2:"Tela piel de durazno.", price: 35000,  images: getProductImages("ME13"),  category: "Especiales", sizes: SIZES },
  { id: "ME16",  name: "Pijama Ref. ME16",  description: "Pijama femenina Perfect Pijamas.", description2:"Tela piel de durazno.", price: 35000,  images: getProductImages("ME16"),  category: "Especiales", sizes: SIZES },
  { id: "ME17",  name: "Pijama Ref. ME17",  description: "Pijama femenina Perfect Pijamas.", description2:"Tela piel de durazno.", price: 55000,  images: getProductImages("ME17"),  category: "Especiales", sizes: SIZES },
  { id: "ME18",  name: "Pijama Ref. ME18",  description: "Pijama femenina Perfect Pijamas.", description2:"Tela piel de durazno.", price: 80000,  images: getProductImages("ME18"),  category: "Especiales", sizes: SIZES },
  { id: "ME19",  name: "Pijama Ref. ME19",  description: "Pijama femenina Perfect Pijamas.", description2:"Tela piel de durazno.", price: 45000,  images: getProductImages("ME19"),  category: "Especiales", sizes: SIZES },
  { id: "ME20",  name: "Pijama Ref. ME20",  description: "Pijama femenina Perfect Pijamas.", description2:"Tela piel de durazno.", price: 45000,  images: getProductImages("ME20"),  category: "Especiales", sizes: SIZES },
  { id: "ME21",  name: "Pijama Ref. ME21",  description: "Pijama femenina Perfect Pijamas.", description2:"Tela piel de durazno.", price: 45000,  images: getProductImages("ME21"),  category: "Especiales", sizes: SIZES },
  { id: "ME22",  name: "Pijama Ref. ME22",  description: "Pijama femenina Perfect Pijamas.", description2:"Tela piel de durazno.", price: 55000,  images: getProductImages("ME22"),  category: "Especiales", sizes: SIZES },
  { id: "ME23",  name: "Pijama Ref. ME23",  description: "Pijama femenina Perfect Pijamas.", description2:"Tela piel de durazno.", price: 75000,  images: getProductImages("ME23"),  category: "Especiales", sizes: SIZES },
  { id: "ME24",  name: "Pijama Ref. ME24",  description: "Pijama femenina Perfect Pijamas.", description2:"Tela piel de durazno.", price: 110000, images: getProductImages("ME24"), category: "Especiales", sizes: SIZES },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);