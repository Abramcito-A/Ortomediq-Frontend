import axios from './axiosConfig'

/**
 * Servicio de autenticación
 */

// Login de usuario
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('/auth/login', credentials)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error al iniciar sesión' }
  }
}

// Registro de nuevo usuario
export const registerUser = async (userData) => {
  try {
    const response = await axios.post('/auth/register', userData)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error al registrar usuario' }
  }
}

// Verificar token (para mantener sesión)
export const verifyToken = async (token) => {
  try {
    const response = await axios.get('/auth/verify', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Token inválido' }
  }
}

// Cerrar sesión
export const logoutUser = async () => {
  try {
    const response = await axios.post('/auth/logout')
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error al cerrar sesión' }
  }
}

// Recuperar contraseña
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post('/auth/forgot-password', { email })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error al enviar email de recuperación' }
  }
}

// Restablecer contraseña
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post('/auth/reset-password', {
      token,
      newPassword
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error al restablecer contraseña' }
  }
}








