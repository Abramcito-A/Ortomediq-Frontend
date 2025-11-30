import { useState } from 'react'
import { BarChart3, TrendingUp, Download, Filter, Calendar, DollarSign, ShoppingCart, Package, Users } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const Reportes = () => {
  const [dateRange, setDateRange] = useState('mes')
  const [selectedReport, setSelectedReport] = useState('ventas')

  // Datos de ventas diarias
  const ventasDiarias = [
    { dia: 'Lun', ventas: 4200, pedidos: 12 },
    { dia: 'Mar', ventas: 5800, pedidos: 18 },
    { dia: 'Mié', ventas: 3900, pedidos: 14 },
    { dia: 'Jue', ventas: 6200, pedidos: 22 },
    { dia: 'Vie', ventas: 7100, pedidos: 25 },
    { dia: 'Sáb', ventas: 8900, pedidos: 31 },
    { dia: 'Dom', ventas: 4500, pedidos: 15 },
  ]

  // Datos de ventas por categoría
  const ventasPorCategoria = [
    { name: 'Rodilleras', value: 28, color: '#3b82f6' },
    { name: 'Fajas', value: 22, color: '#10b981' },
    { name: 'Muletas', value: 15, color: '#f59e0b' },
    { name: 'Plantillas', value: 18, color: '#8b5cf6' },
    { name: 'Soportes', value: 17, color: '#ef4444' },
  ]

  // Datos de productos más vendidos
  const productosVendidos = [
    { nombre: 'Rodillera Deportiva Pro', cantidad: 45, ingresos: 17100 },
    { nombre: 'Faja Lumbar Correctora', cantidad: 38, ingresos: 14440 },
    { nombre: 'Plantillas Ortopédicas', cantidad: 35, ingresos: 9450 },
    { nombre: 'Muletas Ajustables', cantidad: 22, ingresos: 18700 },
    { nombre: 'Soporte de Tobillo', cantidad: 28, ingresos: 7840 },
  ]

  // KPIs
  const kpis = [
    {
      title: 'Ventas Totales',
      value: '$36,700',
      change: '+12.5%',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Pedidos Completados',
      value: '137',
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'blue'
    },
    {
      title: 'Productos Vendidos',
      value: '168',
      change: '+15.3%',
      icon: Package,
      color: 'purple'
    },
    {
      title: 'Clientes Nuevos',
      value: '24',
      change: '+5.8%',
      icon: Users,
      color: 'orange'
    }
  ]

  const getColorIcon = (color) => {
    const colors = {
      green: 'text-green-600',
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600'
    }
    return colors[color]
  }

  const getColorBg = (color) => {
    const colors = {
      green: 'bg-green-100',
      blue: 'bg-blue-100',
      purple: 'bg-purple-100',
      orange: 'bg-orange-100'
    }
    return colors[color]
  }

  const handleExport = (format) => {
    console.log(`Exportando reporte en formato ${format}`)
    // Aquí iría la lógica de exportación
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Reportes</h1>
          <p className="text-gray-600 mt-1">Análisis detallado de ventas y productos</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleExport('pdf')}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors font-medium"
          >
            <Download size={20} />
            <span>PDF</span>
          </button>
          <button
            onClick={() => handleExport('excel')}
            className="flex items-center gap-2 px-4 py-2.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors font-medium"
          >
            <Download size={20} />
            <span>Excel</span>
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="semana">Esta semana</option>
              <option value="mes">Este mes</option>
              <option value="trimestre">Este trimestre</option>
              <option value="ano">Este año</option>
              <option value="personalizado">Rango personalizado</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ventas">Reporte de Ventas</option>
              <option value="productos">Reporte de Productos</option>
              <option value="clientes">Reporte de Clientes</option>
              <option value="inventario">Reporte de Inventario</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon
          return (
            <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${getColorBg(kpi.color)}`}>
                  <Icon className={`${getColorIcon(kpi.color)}`} size={24} />
                </div>
              </div>
              <p className={`text-sm font-medium ${kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.change} respecto al período anterior
              </p>
            </div>
          )
        })}
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de líneas - Ventas diarias */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ventas Diarias</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ventasDiarias}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="dia" stroke="#6b7280" />
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

        {/* Gráfico de pastel - Ventas por categoría */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ventas por Categoría</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ventasPorCategoria}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {ventasPorCategoria.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de barras - Pedidos diarios */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pedidos por Día</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ventasDiarias}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="dia" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
            <Legend />
            <Bar dataKey="pedidos" fill="#10b981" radius={[8, 8, 0, 0]} name="Pedidos" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla de productos más vendidos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900">Productos Más Vendidos</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">Producto</th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">Cantidad Vendida</th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">Ingresos</th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">% del Total</th>
              </tr>
            </thead>
            <tbody>
              {productosVendidos.map((producto, idx) => {
                const porcentaje = ((producto.ingresos / 67930) * 100).toFixed(1)
                return (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900">{producto.nombre}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-gray-600">{producto.cantidad} unidades</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-semibold text-gray-900">${producto.ingresos.toLocaleString()}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${porcentaje}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-600">{porcentaje}%</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pie del resumen */}
        <div className="bg-gray-50 border-t border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-900">Total de Ingresos</p>
            <p className="text-2xl font-bold text-blue-600">$67,930</p>
          </div>
        </div>
      </div>

      {/* Estadísticas por período */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resumen mensual */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen Mensual</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <span className="text-gray-600">Ventas Totales</span>
              <span className="font-bold text-gray-900">$257,100</span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <span className="text-gray-600">Pedidos Completados</span>
              <span className="font-bold text-gray-900">961</span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <span className="text-gray-600">Venta Promedio</span>
              <span className="font-bold text-gray-900">$267.74</span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <span className="text-gray-600">Ticket Promedio</span>
              <span className="font-bold text-gray-900">$267.74</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Tasa de Conversión</span>
              <span className="font-bold text-gray-900">3.24%</span>
            </div>
          </div>
        </div>

        {/* Estadísticas de clientes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas de Clientes</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <span className="text-gray-600">Clientes Nuevos</span>
              <span className="font-bold text-gray-900">168</span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <span className="text-gray-600">Clientes Recurrentes</span>
              <span className="font-bold text-gray-900">542</span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <span className="text-gray-600">Total de Clientes</span>
              <span className="font-bold text-gray-900">710</span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <span className="text-gray-600">Tasa de Retención</span>
              <span className="font-bold text-gray-900">76.3%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Valor Promedio por Cliente</span>
              <span className="font-bold text-gray-900">$362.11</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reportes

