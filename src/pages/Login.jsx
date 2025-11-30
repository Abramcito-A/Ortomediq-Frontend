import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthLayout from '../components/auth/AuthLayout'
import LoginForm from '../components/auth/LoginForm'
// import { useAuth } from '../hooks/useAuth' // Descomentar cuando esté listo

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  // const { login } = useAuth() // Descomentar cuando esté listo

  const handleLogin = async (data) => {
    setIsLoading(true)
    
    try {
      console.log('Datos de login:', data)
      
      // TODO: Implementar llamada real al backend
      // await login(data)
      
      // Simulación de login (remover después)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success('¡Bienvenido a Ortomediq!')
      
      // TODO: Redirigir según rol del usuario
      // if (user.rol === 'admin' || user.rol === 'empleado') {
      //   navigate('/dashboard')
      // } else {
      //   navigate('/mi-cuenta')
      // }
      
      navigate('/dashboard') // Temporal
      
    } catch (error) {
      console.error('Error en login:', error)
      toast.error(error.message || 'Error al iniciar sesión. Verifica tus credenciales.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Iniciar Sesión"
      subtitle="Ingresa tus credenciales para acceder"
    >
      <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
    </AuthLayout>
  )
}

export default Login








