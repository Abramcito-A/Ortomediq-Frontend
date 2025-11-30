const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    nuevo: 'bg-green-100 text-green-800',
    oferta: 'bg-red-100 text-red-800',
    agotado: 'bg-gray-300 text-gray-600',
    destacado: 'bg-blue-100 text-blue-800'
  }

  return (
    <span className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
      ${variants[variant]}
    `}>
      {children}
    </span>
  )
}

export default Badge








