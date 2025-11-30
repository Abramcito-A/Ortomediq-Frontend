import { DollarSign, ShoppingCart, Package, Users, TrendingUp, AlertTriangle } from 'lucide-react'
import StatCard from '../../components/dashboard/StatCard'
import { stats, salesChartData, salesByCategory, topProducts, recentSales, stockAlerts } from '../../data/dashboard/mockData'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const DashboardAdmin = () => {
  const adminStats = stats.admin

  // Colores para el gráfico de pie
  const COLORS = salesByCategory.map(item => item.color)

  return (
    <div className="space-y-6">
      {/* Título */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Vista general de tu negocio</p>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Ventas del Mes"
          value={adminStats.ventasMes.value}
          change={adminStats.ventasMes.change}
          changeType={adminStats.ventasMes.changeType}
          icon={DollarSign}
          iconColor="green"
        />
        <StatCard
          title="Pedidos"
          value={adminStats.pedidos.value}
          change={adminStats.pedidos.change}
          changeType={adminStats.pedidos.changeType}
          icon={ShoppingCart}
          iconColor="blue"
        />
        <StatCard
          title="Productos"
          value={adminStats.productos.value}
          change={adminStats.productos.change}
          changeType={adminStats.productos.changeType}
          icon={Package}
          iconColor="purple"
        />
        <StatCard
          title="Clientes"
          value={adminStats.clientes.value}
          change={adminStats.clientes.change}
          changeType={adminStats.clientes.changeType}
          icon={Users}
          iconColor="orange"
        />
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfica de Ventas (Línea) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ventas - Últimos 7 Días
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="ventas" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                name="Ventas ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica de Ventas por Categoría (Pie) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ventas por Categoría
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salesByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {salesByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Productos Más Vendidos y Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Productos Más Vendidos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Productos Más Vendidos
            </h3>
            <TrendingUp className="text-green-600" size={20} />
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.sales} unidades</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${product.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alertas de Stock */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Alertas de Stock
            </h3>
            <AlertTriangle className="text-yellow-600" size={20} />
          </div>
          <div className="space-y-4">
            {stockAlerts.map((alert) => (
              <div 
                key={alert.id}
                className={`
                  p-4 rounded-lg border-l-4
                  ${alert.severity === 'critical' ? 'bg-red-50 border-red-500' : ''}
                  ${alert.severity === 'high' ? 'bg-orange-50 border-orange-500' : ''}
                  ${alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' : ''}
                `}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{alert.product}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Solo quedan <span className="font-semibold">{alert.stock}</span> unidades
                      <span className="text-gray-400 mx-1">•</span>
                      Mínimo: {alert.minStock}
                    </p>
                  </div>
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${alert.severity === 'critical' ? 'bg-red-100 text-red-700' : ''}
                    ${alert.severity === 'high' ? 'bg-orange-100 text-orange-700' : ''}
                    ${alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' : ''}
                  `}>
                    {alert.severity === 'critical' ? 'Crítico' : ''}
                    {alert.severity === 'high' ? 'Alto' : ''}
                    {alert.severity === 'medium' ? 'Medio' : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium">
            Ver Inventario Completo
          </button>
        </div>
      </div>

      {/* Grid de Últimas Ventas y Bitácora */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Últimas Ventas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Últimas Ventas
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Ver todas →
            </button>
          </div>
          <div className="space-y-3">
            {recentSales.slice(0, 5).map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                    {sale.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 truncate">{sale.customer}</p>
                    <p className="text-sm text-gray-500">{sale.products} items • {sale.date}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-3">
                  <p className="font-semibold text-gray-900">${sale.total}</p>
                  <span className={`
                    inline-block px-2 py-0.5 rounded-full text-xs font-medium
                    ${sale.statusColor === 'green' ? 'bg-green-100 text-green-700' : ''}
                    ${sale.statusColor === 'yellow' ? 'bg-yellow-100 text-yellow-700' : ''}
                    ${sale.statusColor === 'blue' ? 'bg-blue-100 text-blue-700' : ''}
                  `}>
                    {sale.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bitácora de Actividades */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Bitácora de Actividades
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Ver todo →
            </button>
          </div>
          <div className="space-y-3">
            {/* Actividades del sistema */}
            <div className="flex gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-semibold">Juan Pérez</span> actualizó el inventario de{' '}
                  <span className="font-medium">Rodillera Ortopédica</span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Hace 5 minutos</p>
              </div>
            </div>

            <div className="flex gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-semibold">María González</span> procesó una venta de{' '}
                  <span className="font-medium">$450.00</span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Hace 15 minutos</p>
              </div>
            </div>

            <div className="flex gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-semibold">Carlos Ruiz</span> agregó nuevo producto{' '}
                  <span className="font-medium">Faja Lumbar Premium</span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Hace 1 hora</p>
              </div>
            </div>

            <div className="flex gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex-shrink-0 w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-semibold">Ana Martínez</span> modificó precio de{' '}
                  <span className="font-medium">Muletas Ajustables</span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Hace 2 horas</p>
              </div>
            </div>

            <div className="flex gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-semibold">Luis Torres</span> generó reporte de{' '}
                  <span className="font-medium">Ventas Mensuales</span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Hace 3 horas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardAdmin




