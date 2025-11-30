/**
 * Genera un código de recogida único en formato ORZ-XXXXXX-YYYY
 * Ejemplo: ORZ-A3K8M2-2025
 */
export const generatePickupCode = () => {
  // Generar 6 caracteres aleatorios (letras y números)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let randomCode = ''
  for (let i = 0; i < 6; i++) {
    randomCode += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  // Obtener los últimos 4 dígitos del año
  const year = new Date().getFullYear().toString().slice(-4)

  // Combinar: ORZ-XXXXXX-YYYY
  return `ORZ-${randomCode}-${year}`
}

/**
 * Obtiene la fecha formateada de recogida (suma 2-5 días hábiles)
 */
export const getPickupDate = () => {
  const today = new Date()
  const daysToAdd = Math.floor(Math.random() * 4) + 2 // Entre 2 y 5 días
  const pickupDate = new Date(today.setDate(today.getDate() + daysToAdd))
  
  return pickupDate.toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Genera el objeto completo de pedido con código
 */
export const createPickupOrder = (cartItems, total, customerInfo, paymentMethod) => {
  return {
    id: generatePickupCode(),
    pickupCode: generatePickupCode(),
    items: cartItems,
    subtotal: cartItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0),
    discount: cartItems.reduce((sum, item) => {
      if (item.precioOriginal > item.precio) {
        return sum + ((item.precioOriginal - item.precio) * item.cantidad)
      }
      return sum
    }, 0),
    total: total,
    paymentMethod: paymentMethod,
    customerInfo: {
      nombre: customerInfo.nombre,
      apellido: customerInfo.apellido,
      email: customerInfo.email,
      telefono: customerInfo.telefono
    },
    pickupDate: getPickupDate(),
    status: 'confirmado', // confirmado, pagado, listo, recogido
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}
