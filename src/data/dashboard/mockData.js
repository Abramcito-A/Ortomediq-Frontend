// Mock data para desarrollo del dashboard

// Estadísticas generales
export const stats = {
  admin: {
    ventasHoy: { value: '$12,500', change: '+12.5%', changeType: 'positive' },
    ventasMes: { value: '$125,000', change: '+8.2%', changeType: 'positive' },
    pedidos: { value: '45', change: '+8%', changeType: 'positive' },
    productos: { value: '234', change: '-3 bajo stock', changeType: 'negative' },
    clientes: { value: '156', change: '+23', changeType: 'positive' },
    inventario: { value: '$85,000', change: '+5.4%', changeType: 'positive' },
  },
  empleado: {
    misVentas: { value: '$3,200', change: '+15%', changeType: 'positive' },
    comision: { value: '$320', change: '10% comisión', changeType: 'positive' },
    pedidosHoy: { value: '12', change: '+3', changeType: 'positive' },
  },
  cliente: {
    pedidos: { value: '8', change: '2 pendientes', changeType: 'neutral' },
    totalGastado: { value: '$5,600', change: 'Este año', changeType: 'neutral' },
    favoritos: { value: '12', change: '+2 nuevos', changeType: 'positive' },
  }
}

// Datos para gráficas de ventas (últimos 7 días)
export const salesChartData = [
  { day: 'Lun', ventas: 1200, pedidos: 8 },
  { day: 'Mar', ventas: 1800, pedidos: 12 },
  { day: 'Mié', ventas: 1500, pedidos: 10 },
  { day: 'Jue', ventas: 2200, pedidos: 15 },
  { day: 'Vie', ventas: 2500, pedidos: 18 },
  { day: 'Sáb', ventas: 1900, pedidos: 14 },
  { day: 'Dom', ventas: 1400, pedidos: 9 },
]

// Ventas por categoría
export const salesByCategory = [
  { name: 'Rodilleras', value: 35, color: '#3b82f6' },
  { name: 'Fajas', value: 25, color: '#10b981' },
  { name: 'Muletas', value: 20, color: '#f59e0b' },
  { name: 'Sillas', value: 15, color: '#8b5cf6' },
  { name: 'Otros', value: 5, color: '#6b7280' },
]

// Productos más vendidos
export const topProducts = [
  { id: 1, name: 'Rodillera Ortopédica Pro', sales: 45, revenue: 13500, image: 'https://picsum.photos/50/50?random=1' },
  { id: 2, name: 'Faja Lumbar Premium', sales: 38, revenue: 11400, image: 'https://picsum.photos/50/50?random=2' },
  { id: 3, name: 'Muletas Ajustables', sales: 32, revenue: 9600, image: 'https://picsum.photos/50/50?random=3' },
  { id: 4, name: 'Silla de Ruedas Básica', sales: 28, revenue: 16800, image: 'https://picsum.photos/50/50?random=4' },
  { id: 5, name: 'Colchón Antiescaras', sales: 24, revenue: 12000, image: 'https://picsum.photos/50/50?random=5' },
]

// Últimas ventas
export const recentSales = [
  { 
    id: '#145', 
    customer: 'Juan Pérez', 
    products: 3, 
    total: 850, 
    status: 'Pagado', 
    statusColor: 'green',
    date: '2024-11-15 10:30',
    avatar: 'JP'
  },
  { 
    id: '#144', 
    customer: 'María García', 
    products: 2, 
    total: 450, 
    status: 'Pendiente', 
    statusColor: 'yellow',
    date: '2024-11-15 09:15',
    avatar: 'MG'
  },
  { 
    id: '#143', 
    customer: 'Luis Martínez', 
    products: 5, 
    total: 1200, 
    status: 'Enviado', 
    statusColor: 'blue',
    date: '2024-11-14 16:45',
    avatar: 'LM'
  },
  { 
    id: '#142', 
    customer: 'Ana López', 
    products: 1, 
    total: 350, 
    status: 'Pagado', 
    statusColor: 'green',
    date: '2024-11-14 14:20',
    avatar: 'AL'
  },
  { 
    id: '#141', 
    customer: 'Carlos Ruiz', 
    products: 4, 
    total: 980, 
    status: 'Pagado', 
    statusColor: 'green',
    date: '2024-11-14 11:30',
    avatar: 'CR'
  },
]

// Alertas de stock
export const stockAlerts = [
  { id: 1, product: 'Rodillera Talla M', stock: 2, minStock: 10, severity: 'high' },
  { id: 2, product: 'Faja Lumbar L', stock: 1, minStock: 5, severity: 'critical' },
  { id: 3, product: 'Muletas Ajustables', stock: 3, minStock: 8, severity: 'high' },
  { id: 4, product: 'Colchón 90x190', stock: 5, minStock: 10, severity: 'medium' },
]

// Pedidos pendientes
export const pendingOrders = [
  { id: '#145', customer: 'María García', items: 2, total: 450, time: '2 horas' },
  { id: '#147', customer: 'Roberto Sánchez', items: 1, total: 280, time: '4 horas' },
  { id: '#148', customer: 'Laura Torres', items: 3, total: 720, time: '5 horas' },
]

// Top clientes
export const topCustomers = [
  { name: 'Juan Pérez', purchases: 15, total: 4500, avatar: 'JP' },
  { name: 'María García', purchases: 12, total: 3600, avatar: 'MG' },
  { name: 'Luis Martínez', purchases: 10, total: 3000, avatar: 'LM' },
  { name: 'Ana López', purchases: 8, total: 2400, avatar: 'AL' },
]

// Actividad reciente (para empleados)
export const recentActivity = [
  { type: 'sale', message: 'Venta registrada #145', time: '10:30 AM', icon: '💰' },
  { type: 'product', message: 'Producto actualizado: Rodillera M', time: '09:15 AM', icon: '📦' },
  { type: 'customer', message: 'Nuevo cliente: Ana Torres', time: '08:45 AM', icon: '👤' },
]

// Pedidos del cliente
export const customerOrders = [
  { 
    id: '#145', 
    date: '15/11/2024', 
    status: 'En camino', 
    statusColor: 'blue',
    total: 850, 
    items: 3,
    tracking: 'TRK123456789'
  },
  { 
    id: '#142', 
    date: '10/11/2024', 
    status: 'Entregado', 
    statusColor: 'green',
    total: 450, 
    items: 2,
    tracking: 'TRK123456780'
  },
  { 
    id: '#138', 
    date: '05/11/2024', 
    status: 'Entregado', 
    statusColor: 'green',
    total: 1200, 
    items: 5,
    tracking: 'TRK123456771'
  },
]

// Productos favoritos del cliente
export const customerFavorites = [
  { 
    id: 1, 
    name: 'Rodillera Ortopédica Pro', 
    price: 299.99, 
    image: 'https://picsum.photos/80/80?random=1',
    inStock: true
  },
  { 
    id: 2, 
    name: 'Faja Lumbar Premium', 
    price: 249.99, 
    image: 'https://picsum.photos/80/80?random=2',
    inStock: true
  },
  { 
    id: 3, 
    name: 'Muletas Ajustables', 
    price: 189.99, 
    image: 'https://picsum.photos/80/80?random=3',
    inStock: false
  },
]

export default {
  stats,
  salesChartData,
  salesByCategory,
  topProducts,
  recentSales,
  stockAlerts,
  pendingOrders,
  topCustomers,
  recentActivity,
  customerOrders,
  customerFavorites,
}



