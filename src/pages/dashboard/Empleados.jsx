import { useState } from 'react'
import { UserPlus, Search, MoreVertical, Edit, Trash2, Mail, Phone, Calendar, Shield } from 'lucide-react'

const Empleados = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('todos')
  const [showAddModal, setShowAddModal] = useState(false)

  // Datos de ejemplo - Reemplazar con API real
  const empleados = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      email: 'juan.perez@ortomediq.com',
      telefono: '871-123-4567',
      rol: 'empleado',
      estado: 'activo',
      fechaIngreso: '2024-01-15',
      avatar: 'JP',
      ultimaActividad: 'Hace 5 minutos'
    },
    {
      id: 2,
      nombre: 'María González',
      email: 'maria.gonzalez@ortomediq.com',
      telefono: '871-234-5678',
      rol: 'empleado',
      estado: 'activo',
      fechaIngreso: '2024-02-20',
      avatar: 'MG',
      ultimaActividad: 'Hace 15 minutos'
    },
    {
      id: 3,
      nombre: 'Carlos Ruiz',
      email: 'carlos.ruiz@ortomediq.com',
      telefono: '871-345-6789',
      rol: 'empleado',
      estado: 'activo',
      fechaIngreso: '2024-03-10',
      avatar: 'CR',
      ultimaActividad: 'Hace 1 hora'
    },
    {
      id: 4,
      nombre: 'Ana Martínez',
      email: 'ana.martinez@ortomediq.com',
      telefono: '871-456-7890',
      rol: 'empleado',
      estado: 'inactivo',
      fechaIngreso: '2023-12-05',
      avatar: 'AM',
      ultimaActividad: 'Hace 2 días'
    },
    {
      id: 5,
      nombre: 'Luis Torres',
      email: 'luis.torres@ortomediq.com',
      telefono: '871-567-8901',
      rol: 'admin',
      estado: 'activo',
      fechaIngreso: '2023-06-01',
      avatar: 'LT',
      ultimaActividad: 'Hace 30 minutos'
    }
  ]

  // Filtrar empleados
  const empleadosFiltrados = empleados.filter(emp => {
    const matchSearch = emp.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       emp.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchRole = filterRole === 'todos' || emp.rol === filterRole
    return matchSearch && matchRole
  })

  // Estadísticas
  const totalEmpleados = empleados.length
  const empleadosActivos = empleados.filter(e => e.estado === 'activo').length
  const empleadosInactivos = empleados.filter(e => e.estado === 'inactivo').length
  const administradores = empleados.filter(e => e.rol === 'admin').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Empleados</h1>
          <p className="text-gray-600 mt-1">Gestiona tu equipo de trabajo</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
        >
          <UserPlus size={20} />
          <span>Agregar Empleado</span>
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Empleados</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalEmpleados}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Shield className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Activos</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{empleadosActivos}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Shield className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inactivos</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">{empleadosInactivos}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Shield className="text-orange-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Administradores</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{administradores}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Shield className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Búsqueda */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filtro por rol */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="todos">Todos los roles</option>
            <option value="admin">Administradores</option>
            <option value="empleado">Empleados</option>
          </select>
        </div>
      </div>

      {/* Lista de Empleados */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Empleado</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Contacto</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Rol</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Estado</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Fecha Ingreso</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Última Actividad</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleadosFiltrados.map((empleado) => (
                <tr key={empleado.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  {/* Empleado */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                        {empleado.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{empleado.nombre}</p>
                        <p className="text-sm text-gray-500">{empleado.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Contacto */}
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={14} />
                        <span className="text-xs">{empleado.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={14} />
                        <span className="text-xs">{empleado.telefono}</span>
                      </div>
                    </div>
                  </td>

                  {/* Rol */}
                  <td className="py-4 px-4">
                    <span className={`
                      inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                      ${empleado.rol === 'admin' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-blue-100 text-blue-700'
                      }
                    `}>
                      <Shield size={12} />
                      {empleado.rol === 'admin' ? 'Administrador' : 'Empleado'}
                    </span>
                  </td>

                  {/* Estado */}
                  <td className="py-4 px-4">
                    <span className={`
                      inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                      ${empleado.estado === 'activo' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                      }
                    `}>
                      <span className={`w-1.5 h-1.5 rounded-full ${empleado.estado === 'activo' ? 'bg-green-600' : 'bg-orange-600'}`}></span>
                      {empleado.estado === 'activo' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>

                  {/* Fecha Ingreso */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={14} />
                      <span>{new Date(empleado.fechaIngreso).toLocaleDateString('es-MX', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  </td>

                  {/* Última Actividad */}
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {empleado.ultimaActividad}
                  </td>

                  {/* Acciones */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        title="Más opciones"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No hay resultados */}
        {empleadosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <Shield className="mx-auto text-gray-300 mb-3" size={48} />
            <p className="text-gray-600 font-medium">No se encontraron empleados</p>
            <p className="text-sm text-gray-500 mt-1">Intenta ajustar los filtros de búsqueda</p>
          </div>
        )}
      </div>

      {/* Modal Agregar Empleado (Placeholder) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Agregar Nuevo Empleado</h3>
            <p className="text-gray-600 mb-4">Funcionalidad en construcción...</p>
            <button
              onClick={() => setShowAddModal(false)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Empleados


