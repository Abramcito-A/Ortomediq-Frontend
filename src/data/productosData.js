// Datos de ejemplo de productos ortopédicos
export const productos = [
  {
    id: 1,
    nombre: "Rodillera Deportiva Pro",
    descripcion: "Rodillera con soporte lateral reforzado, ideal para deportistas y personas con lesiones de rodilla. Proporciona compresión y estabilidad.",
    precio: 450.00,
    precioDescuento: 380.00,
    categoria: "rodilleras",
    marca: "OrthoSport",
    imagen: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
    imagenes: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500",
      "https://i5.walmartimages.com/asr/6483ac9f-7d5d-4527-8e3f-3f1b989cc144.1c8336090d76334c9706d31b85d715d3.jpeg",
      "https://i5.walmartimages.com/asr/6483ac9f-7d5d-4527-8e3f-3f1b989cc144.1c8336090d76334c9706d31b85d715d3.jpeg",
      "https://i5.walmartimages.com/asr/6483ac9f-7d5d-4527-8e3f-3f1b989cc144.1c8336090d76334c9706d31b85d715d3.jpeg",    
    ],
    stock: 15,
    rating: 4.5,
    numReviews: 45,
    disponible: true,
    nuevo: false,
    destacado: true,
    tallas: ["S", "M", "L", "XL"],
    colores: ["Negro", "Azul", "Gris"],
    caracteristicas: [
      "Material transpirable",
      "Soporte lateral reforzado",
      "Ajuste mediante velcro",
      "Talla ajustable"
    ]
  },
  {
    id: 2,
    nombre: "Faja Lumbar Correctora",
    descripcion: "Faja lumbar con varillas de soporte para mantener la postura correcta. Ideal para trabajos que requieren estar sentado por largas horas.",
    precio: 380.00,
    precioDescuento: null,
    categoria: "fajas",
    marca: "BackCare",
    imagen: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500",
    imagenes: [
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500"
    ],
    stock: 23,
    rating: 4.8,
    numReviews: 67,
    disponible: true,
    nuevo: true,
    destacado: true,
    tallas: ["S", "M", "L", "XL", "XXL"],
    colores: ["Negro", "Beige"],
    caracteristicas: [
      "4 varillas de soporte",
      "Material elástico",
      "Ajuste personalizado",
      "Lavable"
    ]
  },
  {
    id: 3,
    nombre: "Muletas Ajustables Aluminio",
    descripcion: "Par de muletas de aluminio ligero con altura ajustable. Empuñaduras ergonómicas y contera antideslizante.",
    precio: 850.00,
    precioDescuento: null,
    categoria: "muletas",
    marca: "MediWalk",
    imagen: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500",
    imagenes: [
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500"
    ],
    stock: 8,
    rating: 4.6,
    numReviews: 28,
    disponible: true,
    nuevo: false,
    destacado: false,
    tallas: ["Ajustable"],
    colores: ["Plateado", "Negro"],
    caracteristicas: [
      "Aluminio ligero",
      "Altura regulable",
      "Empuñadura ergonómica",
      "Contera antideslizante"
    ]
  },
  {
    id: 4,
    nombre: "Plantillas Ortopédicas Memory Foam",
    descripcion: "Plantillas con tecnología memory foam que se adaptan a la forma del pie. Ideales para pie plano y fascitis plantar.",
    precio: 320.00,
    precioDescuento: 270.00,
    categoria: "plantillas",
    marca: "ComfortStep",
    imagen: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500",
    imagenes: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500"
    ],
    stock: 45,
    rating: 4.7,
    numReviews: 89,
    disponible: true,
    nuevo: true,
    destacado: true,
    tallas: ["35-37", "38-40", "41-43", "44-46"],
    colores: ["Azul"],
    caracteristicas: [
      "Memory foam",
      "Soporte de arco",
      "Antibacterial",
      "Recortables"
    ]
  },
  {
    id: 5,
    nombre: "Soporte de Muñeca con Férula",
    descripcion: "Muñequera con férula de aluminio removible. Perfecta para síndrome de túnel carpiano y lesiones de muñeca.",
    precio: 280.00,
    precioDescuento: null,
    categoria: "soportes",
    marca: "WristGuard",
    imagen: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500",
    imagenes: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500"
    ],
    stock: 19,
    rating: 4.4,
    numReviews: 34,
    disponible: true,
    nuevo: false,
    destacado: false,
    tallas: ["Única"],
    colores: ["Negro", "Gris"],
    caracteristicas: [
      "Férula removible",
      "Material transpirable",
      "Ajuste con velcro",
      "Uso diurno/nocturno"
    ]
  },
  {
    id: 6,
    nombre: "Collarín Cervical Ajustable",
    descripcion: "Collarín cervical de espuma de densidad media con altura ajustable. Proporciona soporte y alivio del dolor cervical.",
    precio: 420.00,
    precioDescuento: null,
    categoria: "collarines",
    marca: "NeckCare",
    imagen: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500",
    imagenes: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500"
    ],
    stock: 12,
    rating: 4.3,
    numReviews: 21,
    disponible: true,
    nuevo: false,
    destacado: false,
    tallas: ["S", "M", "L"],
    colores: ["Beige"],
    caracteristicas: [
      "Altura ajustable",
      "Espuma de densidad media",
      "Cierre con velcro",
      "Lavable"
    ]
  },
  {
    id: 7,
    nombre: "Tobillera Estabilizadora",
    descripcion: "Tobillera con soportes laterales y correas ajustables. Ideal para esguinces y prevención de lesiones deportivas.",
    precio: 390.00,
    precioDescuento: 330.00,
    categoria: "tobilleras",
    marca: "AnklePro",
    imagen: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500",
    imagenes: [
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500"
    ],
    stock: 27,
    rating: 4.6,
    numReviews: 52,
    disponible: true,
    nuevo: false,
    destacado: true,
    tallas: ["S", "M", "L", "XL"],
    colores: ["Negro", "Azul marino"],
    caracteristicas: [
      "Soportes laterales",
      "Compresión graduada",
      "Material transpirable",
      "Figura en 8"
    ]
  },
  {
    id: 8,
    nombre: "Cabestrillo Acolchado Premium",
    descripcion: "Cabestrillo con acolchado extra en hombro y cuello. Diseño ergonómico para máximo confort durante la recuperación.",
    precio: 250.00,
    precioDescuento: null,
    categoria: "cabestrillos",
    marca: "ArmSupport",
    imagen: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500",
    imagenes: [
      "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500"
    ],
    stock: 31,
    rating: 4.5,
    numReviews: 38,
    disponible: true,
    nuevo: true,
    destacado: false,
    tallas: ["Única"],
    colores: ["Negro", "Azul", "Gris"],
    caracteristicas: [
      "Acolchado premium",
      "Correas ajustables",
      "Uso izquierdo/derecho",
      "Transpirable"
    ]
  },
  {
    id: 9,
    nombre: "Codera de Compresión Deportiva",
    descripcion: "Codera de compresión con gel de silicona. Perfecta para tendinitis, codo de tenista y golf.",
    precio: 310.00,
    precioDescuento: null,
    categoria: "coderas",
    marca: "ElbowFit",
    imagen: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500",
    imagenes: [
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500"
    ],
    stock: 22,
    rating: 4.4,
    numReviews: 41,
    disponible: true,
    nuevo: false,
    destacado: false,
    tallas: ["S", "M", "L"],
    colores: ["Negro", "Gris"],
    caracteristicas: [
      "Gel de silicona",
      "Compresión graduada",
      "Transpirable",
      "Anti-olor"
    ]
  },
  {
    id: 10,
    nombre: "Corrector de Postura Ajustable",
    descripcion: "Corrector de postura con sistema de correas cruzadas. Ayuda a mantener la espalda recta y previene dolores lumbares.",
    precio: 480.00,
    precioDescuento: 420.00,
    categoria: "correctores",
    marca: "PostureFix",
    imagen: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
    imagenes: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500"
    ],
    stock: 18,
    rating: 4.7,
    numReviews: 63,
    disponible: true,
    nuevo: true,
    destacado: true,
    tallas: ["S/M", "L/XL"],
    colores: ["Negro", "Blanco"],
    caracteristicas: [
      "Sistema de correas",
      "Ajuste personalizado",
      "Discreto bajo ropa",
      "Unisex"
    ]
  },
  {
    id: 11,
    nombre: "Bastón Ortopédico Plegable",
    descripcion: "Bastón de aluminio plegable en 4 secciones. Compacto y ligero, ideal para viajes. Incluye empuñadura ergonómica.",
    precio: 580.00,
    precioDescuento: null,
    categoria: "bastones",
    marca: "WalkEasy",
    imagen: "https://i5.walmartimages.com/asr/6483ac9f-7d5d-4527-8e3f-3f1b989cc144.1c8336090d76334c9706d31b85d715d3.jpeg",
    imagenes: [
      "https://i5.walmartimages.com/asr/6483ac9f-7d5d-4527-8e3f-3f1b989cc144.1c8336090d76334c9706d31b85d715d3.jpeg"
    ],
    stock: 14,
    rating: 4.5,
    numReviews: 29,
    disponible: true,
    nuevo: false,
    destacado: false,
    tallas: ["Ajustable"],
    colores: ["Negro", "Plateado", "Bronce"],
    caracteristicas: [
      "Plegable en 4 partes",
      "Aluminio ultraligero",
      "Empuñadura ergonómica",
      "Incluye bolsa"
    ]
  },
  {
    id: 12,
    nombre: "Almohada Cervical Memory Foam",
    descripcion: "Almohada ortopédica con memory foam de alta densidad. Diseño contorneado que se adapta a la curvatura natural del cuello.",
    precio: 650.00,
    precioDescuento: 550.00,
    categoria: "almohadas",
    marca: "SleepWell",
    imagen: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500",
    imagenes: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500"
    ],
    stock: 35,
    rating: 4.9,
    numReviews: 124,
    disponible: true,
    nuevo: true,
    destacado: true,
    tallas: ["Estándar"],
    colores: ["Blanco"],
    caracteristicas: [
      "Memory foam premium",
      "Diseño contorneado",
      "Funda lavable",
      "Hipoalergénica"
    ]
  }
]

// Categorías disponibles
export const categorias = [
  { id: "todas", nombre: "Todas las categorías", count: 12 },
  { id: "rodilleras", nombre: "Rodilleras", count: 1 },
  { id: "fajas", nombre: "Fajas Lumbares", count: 1 },
  { id: "muletas", nombre: "Muletas", count: 1 },
  { id: "plantillas", nombre: "Plantillas", count: 1 },
  { id: "soportes", nombre: "Soportes", count: 1 },
  { id: "collarines", nombre: "Collarines", count: 1 },
  { id: "tobilleras", nombre: "Tobilleras", count: 1 },
  { id: "cabestrillos", nombre: "Cabestrillos", count: 1 },
  { id: "coderas", nombre: "Coderas", count: 1 },
  { id: "correctores", nombre: "Correctores de Postura", count: 1 },
  { id: "bastones", nombre: "Bastones", count: 1 },
  { id: "almohadas", nombre: "Almohadas Ortopédicas", count: 1 }
]

// Rangos de precio
export const rangosPrecio = [
  { id: "0-300", label: "Menos de $300", min: 0, max: 300 },
  { id: "300-500", label: "$300 - $500", min: 300, max: 500 },
  { id: "500-1000", label: "$500 - $1,000", min: 500, max: 1000 },
  { id: "1000+", label: "Más de $1,000", min: 1000, max: Infinity }
]

// Opciones de ordenamiento
export const opcionesOrden = [
  { id: "relevante", label: "Más relevante" },
  { id: "precio_asc", label: "Precio: menor a mayor" },
  { id: "precio_desc", label: "Precio: mayor a menor" },
  { id: "rating", label: "Mejor calificados" },
  { id: "nuevo", label: "Más recientes" }
]








