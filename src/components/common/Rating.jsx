import { FiStar } from 'react-icons/fi'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'

const Rating = ({ rating = 0, numReviews = 0, showCount = true, size = 'sm' }) => {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    // Estrellas llenas
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`full-${i}`} className="text-yellow-400" />
      )
    }

    // Media estrella
    if (hasHalfStar && fullStars < 5) {
      stars.push(
        <FaStarHalfAlt key="half" className="text-yellow-400" />
      )
    }

    // Estrellas vacías
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FiStar key={`empty-${i}`} className="text-gray-300" />
      )
    }

    return stars
  }

  return (
    <div className="flex items-center gap-1">
      <div className={`flex gap-0.5 ${sizes[size]}`}>
        {renderStars()}
      </div>
      {showCount && numReviews > 0 && (
        <span className="text-sm text-gray-500">
          ({numReviews})
        </span>
      )}
    </div>
  )
}

export default Rating








