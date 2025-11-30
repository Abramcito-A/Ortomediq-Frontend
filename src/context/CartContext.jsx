import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  // Inicializar desde localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  // Guardar en localStorage cada vez que cambie el carrito
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  // Agregar producto al carrito
  const addToCart = (producto, cantidad = 1, talla, color) => {
    // Validar que se hayan seleccionado variantes
    if (!talla || !color) {
      toast.error('Por favor selecciona talla y color')
      return
    }

    // Verificar si el producto ya existe con las mismas variantes
    const existingItemIndex = cartItems.findIndex(
      item => 
        item.id === producto.id && 
        item.talla === talla && 
        item.color === color
    )

    if (existingItemIndex >= 0) {
      // Si existe, actualizar cantidad
      const updatedCart = [...cartItems]
      const newCantidad = updatedCart[existingItemIndex].cantidad + cantidad
      
      // Verificar stock
      if (newCantidad > producto.stock) {
        toast.error(`Solo hay ${producto.stock} unidades disponibles`)
        return
      }

      updatedCart[existingItemIndex].cantidad = newCantidad
      setCartItems(updatedCart)
      toast.success('Cantidad actualizada en el carrito')
    } else {
      // Si no existe, agregar nuevo item
      const newItem = {
        id: producto.id,
        nombre: producto.nombre,
        marca: producto.marca,
        precio: producto.precioDescuento || producto.precio,
        precioOriginal: producto.precio,
        imagen: producto.imagen,
        talla,
        color,
        cantidad,
        stock: producto.stock
      }
      setCartItems([...cartItems, newItem])
      toast.success('Producto agregado al carrito')
    }
  }

  // Eliminar producto del carrito
  const removeFromCart = (id, talla, color) => {
    setCartItems(cartItems.filter(
      item => !(item.id === id && item.talla === talla && item.color === color)
    ))
    toast.info('Producto eliminado del carrito')
  }

  // Actualizar cantidad de un producto
  const updateQuantity = (id, talla, color, cantidad) => {
    if (cantidad <= 0) {
      removeFromCart(id, talla, color)
      return
    }

    const updatedCart = cartItems.map(item => {
      if (item.id === id && item.talla === talla && item.color === color) {
        // Verificar stock
        if (cantidad > item.stock) {
          toast.error(`Solo hay ${item.stock} unidades disponibles`)
          return item
        }
        return { ...item, cantidad }
      }
      return item
    })
    setCartItems(updatedCart)
  }

  // Limpiar todo el carrito
  const clearCart = () => {
    setCartItems([])
    toast.info('Carrito vaciado')
  }

  // Calcular total de items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.cantidad, 0)
  }

  // Calcular subtotal
  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.precio * item.cantidad), 0)
  }

  // Calcular descuento total
  const getTotalDiscount = () => {
    return cartItems.reduce((total, item) => {
      const discount = (item.precioOriginal - item.precio) * item.cantidad
      return total + discount
    }, 0)
  }

  // Calcular total (con posible envío u otros cargos)
  const getTotal = (envio = 0) => {
    return getSubtotal() + envio
  }

  // Verificar si un producto está en el carrito
  const isInCart = (id, talla, color) => {
    return cartItems.some(
      item => item.id === id && item.talla === talla && item.color === color
    )
  }

  // Obtener cantidad de un producto específico en el carrito
  const getItemQuantity = (id, talla, color) => {
    const item = cartItems.find(
      item => item.id === id && item.talla === talla && item.color === color
    )
    return item ? item.cantidad : 0
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getSubtotal,
    getTotalDiscount,
    getTotal,
    isInCart,
    getItemQuantity
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}



