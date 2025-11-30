import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthLayout from '../components/auth/AuthLayout'
import RegisterForm from '../components/auth/RegisterForm'
// import { useAuth } from '../hooks/useAuth' // Descomentar cuando esté listo

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  // const { register: registerUser } = useAuth() // Descomentar cuando esté listo

  const handleRegister = async (data) => {
    setIsLoading(true)
    
    try {
      console.log('Datos de registro:', data)
      
      // TODO: Implementar llamada real al backend
      // await registerUser(data)
      
      // Simulación de registro (remover después)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('¡Cuenta creada exitosamente! Bienvenido a Ortomediq.')
      
      // Opción A: Login automático y redirigir
      navigate('/dashboard')
      
      // Opción B: Redirigir a login para que ingrese
      // navigate('/login')
      
    } catch (error) {
      console.error('Error en registro:', error)
      
      // Manejar errores específicos
      if (error.message?.includes('email')) {
        toast.error('Este email ya está registrado')
      } else {
        toast.error(error.message || 'Error al crear la cuenta. Intenta de nuevo.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Crear Cuenta"
      subtitle="Únete a Ortomediq y mejora tu bienestar"
    >
      <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
    </AuthLayout>
  )
}

export default Register








