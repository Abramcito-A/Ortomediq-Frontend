import { DollarSign, ShoppingCart, TrendingUp, Clock } from 'lucide-react'
import StatCard from '../../components/dashboard/StatCard'
import { stats, recentSales, recentActivity } from '../../data/dashboard/mockData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const DashboardEmpleado = () => {
  const empleadoStats = stats.empleado

  // Datos de ventas del empleado (últimos 5 días)
  const myRecentSales = recentSales.slice(0, 3)
  
  const mySalesData = [
    { day: 'Lun', ventas: 450 },
    { day: 'Mar', ventas: 680 },
    { day: 'Mié', ventas: 520 },
    { day: 'Jue', ventas: 890 },
    { day: 'Vie', ventas: 660 },
  ]

  return (
    <div className="space-y-6">
      {/* Título */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Mi Dashboard</h1>
        <p className="text-gray-600 mt-1">Tu rendimiento y ventas del día</p>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <StatCard
          title="Mis Ventas Hoy"
          value={empleadoStats.misVentas.value}
          change={empleadoStats.misVentas.change}
          changeType={empleadoStats.misVentas.changeType}
          icon={DollarSign}
          iconColor="green"
        />
        <StatCard
          title="Mi Comisión"
          value={empleadoStats.comision.value}
          change={empleadoStats.comision.change}
          changeType={empleadoStats.comision.changeType}
          icon={TrendingUp}
          iconColor="blue"
        />
        <StatCard
          title="Pedidos Atendidos"
          value={empleadoStats.pedidosHoy.value}
          change={empleadoStats.pedidosHoy.change}
          changeType={empleadoStats.pedidosHoy.changeType}
          icon={ShoppingCart}
          iconColor="purple"
        />
      </div>

      {/* Acciones Rápidas */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition-all text-left">
            <div className="text-2xl mb-2">🛍️</div>
            <p className="font-semibold">Nueva Venta</p>
            <p className="text-sm text-white/80 mt-1">Registrar una venta</p>
          </button>
          <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition-all text-left">
            <div className="text-2xl mb-2">📦</div>
            <p className="font-semibold">Ver Inventario</p>
            <p className="text-sm text-white/80 mt-1">Consultar stock</p>
          </button>
          <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition-all text-left">
            <div className="text-2xl mb-2">👥</div>
            <p className="font-semibold">Buscar Cliente</p>
            <p className="text-sm text-white/80 mt-1">Ver historial</p>
          </button>
        </div>
      </div>

      {/* Gráfica de Mis Ventas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Mis Ventas - Última Semana
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mySalesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
            <Bar dataKey="ventas" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Mis Ventas Recientes y Actividad */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mis Ventas de Hoy */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Mis Ventas de Hoy
            </h3>
            <span className="text-sm text-gray-500">{myRecentSales.length} ventas</span>
          </div>
          <div className="space-y-4">
            {myRecentSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                    {sale.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{sale.customer}</p>
                    <p className="text-sm text-gray-500">{sale.products} productos • {sale.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${sale.total}</p>
                  <span className={`
                    text-xs px-2 py-1 rounded-full
                    ${sale.statusColor === 'green' ? 'bg-green-100 text-green-700' : ''}
                    ${sale.statusColor === 'yellow' ? 'bg-yellow-100 text-yellow-700' : ''}
                  `}>
                    {sale.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Ver Todas Mis Ventas
          </button>
        </div>

        {/* Actividad Reciente */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Actividad Reciente
            </h3>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tips y Consejos */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
            💡
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">Tip del Día</h3>
            <p className="text-white/90">
              Recuerda ofrecer productos complementarios a tus clientes. Las rodilleras suelen venderse junto con fajas lumbares. 
              ¡Esto puede aumentar tus comisiones hasta en un 30%!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardEmpleado




