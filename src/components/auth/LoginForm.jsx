import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import { FiMail } from 'react-icons/fi'
import Input from '../common/Input'
import PasswordInput from './PasswordInput'
import Button from '../common/Button'

// Esquema de validación
const loginSchema = yup.object({
  email: yup
    .string()
    .email('El email no es válido')
    .required('El email es obligatorio'),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
}).required()

const LoginForm = ({ onSubmit, isLoading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur', // Valida al perder el foco
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email */}
      <Input
        label="Email"
        type="email"
        placeholder="tu@email.com"
        icon={FiMail}
        error={errors.email?.message}
        {...register('email')}
      />

      {/* Password */}
      <PasswordInput
        label="Contraseña"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register('password')}
      />

      {/* Recordarme y Olvidé contraseña */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            {...register('remember')}
          />
          <span className="text-sm text-gray-700">Recordarme</span>
        </label>

        <Link
          to="/forgot-password"
          className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      {/* Botón Submit */}
      <Button type="submit" isLoading={isLoading}>
        Iniciar Sesión
      </Button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">o</span>
        </div>
      </div>

      {/* Link a Registro */}
      <div className="text-center">
        <p className="text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
          >
            Crear cuenta
          </Link>
        </p>
      </div>
    </form>
  )
}

export default LoginForm


