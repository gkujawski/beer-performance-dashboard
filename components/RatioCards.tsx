"use client"

import { TrendingUp, TrendingDown, Activity } from "lucide-react"

interface RatioCardsProps {
  productivity: number
  latency: number
  performance: number
}

export default function RatioCards({ productivity, latency, performance }: RatioCardsProps) {
  const getColorClass = (value: number) => {
    if (value >= 0.8) return "text-green-400 bg-green-500/10 border-green-500/30"
    if (value >= 0.6) return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30"
    return "text-red-400 bg-red-500/10 border-red-500/30"
  }

  const getIcon = (value: number) => {
    if (value >= 0.7) return <TrendingUp className="w-6 h-6" />
    if (value >= 0.5) return <Activity className="w-6 h-6" />
    return <TrendingDown className="w-6 h-6" />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className={`rounded-xl p-6 border ${getColorClass(productivity)}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-300">Productivity</h3>
          {getIcon(productivity)}
        </div>
        <div className="text-4xl font-bold mb-2">{(productivity * 100).toFixed(1)}%</div>
        <div className="text-xs text-gray-400">Actuality ÷ Capability</div>
        <div className="text-xs text-gray-500 mt-2">How efficiently current resources are used</div>
      </div>

      <div className={`rounded-xl p-6 border ${getColorClass(latency)}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-300">Latency</h3>
          {getIcon(latency)}
        </div>
        <div className="text-4xl font-bold mb-2">{(latency * 100).toFixed(1)}%</div>
        <div className="text-xs text-gray-400">Capability ÷ Potentiality</div>
        <div className="text-xs text-gray-500 mt-2">How much potential is currently accessible</div>
      </div>

      <div className={`rounded-xl p-6 border ${getColorClass(performance)}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-300">Performance</h3>
          {getIcon(performance)}
        </div>
        <div className="text-4xl font-bold mb-2">{(performance * 100).toFixed(1)}%</div>
        <div className="text-xs text-gray-400">Actuality ÷ Potentiality</div>
        <div className="text-xs text-gray-500 mt-2">Overall organizational effectiveness</div>
      </div>
    </div>
  )
}
