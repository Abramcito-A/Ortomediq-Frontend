import { useState, forwardRef } from 'react'
import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi'

const PasswordInput = forwardRef(({ 
  label = 'Contraseña', 
  error,
  showStrength = false,
  ...props 
}, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const [strength, setStrength] = useState(0)

  const calculateStrength = (password) => {
    if (!password) return 0
    let score = 0
    
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^a-zA-Z0-9]/.test(password)) score++
    
    return score
  }

  const handlePasswordChange = (e) => {
    if (showStrength) {
      setStrength(calculateStrength(e.target.value))
    }
    if (props.onChange) {
      props.onChange(e)
    }
  }

  const strengthColors = {
    0: 'bg-gray-300',
    1: 'bg-red-500',
    2: 'bg-orange-500',
    3: 'bg-yellow-500',
    4: 'bg-lime-500',
    5: 'bg-green-500',
  }

  const strengthLabels = {
    0: '',
    1: 'Muy débil',
    2: 'Débil',
    3: 'Regular',
    4: 'Fuerte',
    5: 'Muy fuerte',
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <FiLock size={20} />
        </div>
        
        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          className={`
            w-full px-4 py-3 pl-10 pr-12 rounded-lg border 
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}
            focus:outline-none focus:ring-2 focus:border-transparent
            transition-all duration-200
          `}
          onChange={handlePasswordChange}
          {...props}
        />
        
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      </div>

      {showStrength && strength > 0 && (
        <div className="mt-2">
          <div className="flex gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`h-1 flex-1 rounded-full transition-all ${
                  level <= strength ? strengthColors[strength] : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className={`text-xs ${strength <= 2 ? 'text-red-500' : strength <= 3 ? 'text-yellow-500' : 'text-green-500'}`}>
            {strengthLabels[strength]}
          </p>
        </div>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <span>⚠</span>
          {error}
        </p>
      )}
    </div>
  )
})

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput


