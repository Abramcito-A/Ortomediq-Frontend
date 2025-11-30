import { ShoppingCart, Package, CreditCard, Copy, Check } from 'lucide-react'
import StatCard from '../../components/dashboard/StatCard'
import { stats } from '../../data/dashboard/mockData'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const DashboardCliente = () => {
  const clienteStats = stats.cliente
  const [userOrders, setUserOrders] = useState([])
  const [copiedCode, setCopiedCode] = useState(null)

  useEffect(() => {
    // Obtener pedidos del usuario del localStorage
    const orders = JSON.parse(localStorage.getItem('userOrders')) || []
    setUserOrders(orders)
  }, [])

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmado':
        return 'bg-blue-100 text-blue-700'
      case 'pagado':
        return 'bg-yellow-100 text-yellow-700'
      case 'listo':
        return 'bg-green-100 text-green-700'
      case 'recogido':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusLabel = (status) => {
    switch(status) {
      case 'confirmado':
        return 'Confirmado'
      case 'pagado':
        return 'Pagado'
      case 'listo':
        return 'Listo para recoger'
      case 'recogido':
        return 'Recogido'
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Título */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Mi Cuenta</h1>
        <p className="text-gray-600 mt-1">Bienvenido de nuevo</p>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <StatCard
          title="Mis Pedidos"
          value={clienteStats.pedidos.value}
          change={clienteStats.pedidos.change}
          changeType={clienteStats.pedidos.changeType}
          icon={ShoppingCart}
          iconColor="blue"
        />
        <StatCard
          title="Total Gastado"
          value={clienteStats.totalGastado.value}
          change={clienteStats.totalGastado.change}
          changeType={clienteStats.totalGastado.changeType}
          icon={CreditCard}
          iconColor="green"
        />
      </div>

      {/* Acciones Rápidas */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            to="/productos"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition-all text-center"
          >
            <div className="text-3xl mb-2">🛍️</div>
            <p className="font-semibold text-sm">Ver Catálogo</p>
          </Link>
          <Link
            to="/carrito"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition-all text-center"
          >
            <div className="text-3xl mb-2">🛒</div>
            <p className="font-semibold text-sm">Mi Carrito</p>
          </Link>
        </div>
      </div>

      {/* Mis Pedidos Recientes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Mis Pedidos Recientes
          </h3>
          {userOrders.length > 0 && (
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Ver todos →
            </button>
          )}
        </div>
        <div className="space-y-4">
          {userOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <ShoppingCart size={48} className="mx-auto mb-2 opacity-20" />
              <p>Aún no tienes pedidos. <Link to="/productos" className="text-blue-600 hover:text-blue-700">Empieza a comprar</Link></p>
            </div>
          ) : (
            userOrders.map((order) => (
              <div 
                key={order.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-4"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Package className="text-blue-600" size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900">Pedido {order.pickupCode}</p>
                      <span className={`
                        text-xs px-2 py-1 rounded-full font-medium
                        ${getStatusColor(order.status)}
                      `}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {order.items.length} productos • {new Date(order.createdAt).toLocaleDateString('es-MX')}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Recogida: {order.pickupDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between md:flex-col md:items-end gap-2">
                  <p className="font-semibold text-gray-900 text-lg">${order.total.toFixed(2)}</p>
                  <button 
                    onClick={() => handleCopyCode(order.pickupCode)}
                    className={`text-sm px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                      copiedCode === order.pickupCode
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                    title="Copiar código de recogida"
                  >
                    {copiedCode === order.pickupCode ? (
                      <>
                        <Check size={14} />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        Copiar
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Banner Promocional */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 md:p-8 text-white">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0 text-6xl">
            🎁
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">¡Ofertas Especiales!</h3>
            <p className="text-white/90 mb-4">
              Aprovecha hasta 30% de descuento en productos seleccionados. Válido hasta fin de mes.
            </p>
            <Link 
              to="/productos"
              className="inline-block bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors"
            >
              Ver Ofertas
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardCliente




