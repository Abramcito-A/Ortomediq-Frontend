import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import { FiUser, FiMail, FiPhone } from 'react-icons/fi'
import Input from '../common/Input'
import PasswordInput from './PasswordInput'
import Button from '../common/Button'

// Esquema de validación
const registerSchema = yup.object({
  nombreCompleto: yup
    .string()
    .required('El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras'),
  email: yup
    .string()
    .email('El email no es válido')
    .required('El email es obligatorio'),
  telefono: yup
    .string()
    .required('El teléfono es obligatorio')
    .matches(/^[0-9]{10}$/, 'El teléfono debe tener 10 dígitos'),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
    .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
    .matches(/[0-9]/, 'Debe contener al menos un número'),
  confirmPassword: yup
    .string()
    .required('Debes confirmar la contraseña')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
  aceptaTerminos: yup
    .boolean()
    .oneOf([true], 'Debes aceptar los términos y condiciones'),
}).required()

const RegisterForm = ({ onSubmit, isLoading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onBlur',
  })

  const password = watch('password')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Nombre Completo */}
      <Input
        label="Nombre completo"
        type="text"
        placeholder="Juan Pérez García"
        icon={FiUser}
        error={errors.nombreCompleto?.message}
        {...register('nombreCompleto')}
      />

      {/* Email */}
      <Input
        label="Email"
        type="email"
        placeholder="tu@email.com"
        icon={FiMail}
        error={errors.email?.message}
        {...register('email')}
      />

      {/* Teléfono */}
      <Input
        label="Teléfono"
        type="tel"
        placeholder="8711234567"
        icon={FiPhone}
        error={errors.telefono?.message}
        maxLength={10}
        {...register('telefono')}
      />

      {/* Contraseña */}
      <PasswordInput
        label="Contraseña"
        placeholder="••••••••"
        showStrength={true}
        error={errors.password?.message}
        {...register('password')}
      />

      {/* Confirmar Contraseña */}
      <PasswordInput
        label="Confirmar contraseña"
        placeholder="••••••••"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      {/* Términos y Condiciones */}
      <div>
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
            {...register('aceptaTerminos')}
          />
          <span className="text-sm text-gray-700">
            Acepto los{' '}
            <Link to="/terminos" className="text-blue-600 hover:underline">
              términos y condiciones
            </Link>
            {' '}y la{' '}
            <Link to="/privacidad" className="text-blue-600 hover:underline">
              política de privacidad
            </Link>
          </span>
        </label>
        {errors.aceptaTerminos && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <span>⚠</span>
            {errors.aceptaTerminos.message}
          </p>
        )}
      </div>

      {/* Botón Submit */}
      <Button type="submit" isLoading={isLoading}>
        Crear Cuenta
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

      {/* Link a Login */}
      <div className="text-center">
        <p className="text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </form>
  )
}

export default RegisterForm








