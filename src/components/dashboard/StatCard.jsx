import { TrendingUp, TrendingDown } from 'lucide-react'

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon: Icon,
  iconColor = 'blue'
}) => {
  const iconColorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
    yellow: 'bg-yellow-100 text-yellow-600',
  }

  const changeColorClasses = {
    positive: 'text-green-600 bg-green-50',
    negative: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50',
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {value}
          </h3>
          
          {change && (
            <div className={`
              inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
              ${changeColorClasses[changeType]}
            `}>
              {changeType === 'positive' && <TrendingUp size={14} />}
              {changeType === 'negative' && <TrendingDown size={14} />}
              <span>{change}</span>
            </div>
          )}
        </div>

        {Icon && (
          <div className={`
            w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
            ${iconColorClasses[iconColor]}
          `}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  )
}

export default StatCard



