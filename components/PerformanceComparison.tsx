"use client"

import { Check, X } from "lucide-react"

interface PerformanceComparisonProps {
  performance1: number
  performance2: number
  productivity: number
  latency: number
}

export default function PerformanceComparison({
  performance1,
  performance2,
  productivity,
  latency,
}: PerformanceComparisonProps) {
  const tolerance = 0.0001
  const isMatch = Math.abs(performance1 - performance2) < tolerance
  const difference = Math.abs(performance1 - performance2)

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-4">Mathematical Proof</h3>

      <div className="space-y-4">
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <div className="text-sm text-gray-400 mb-2">Method 1: Direct Calculation</div>
          <div className="text-2xl font-bold text-blue-400">Performance = Actuality ÷ Potentiality</div>
          <div className="text-3xl font-bold text-white mt-2">{(performance1 * 100).toFixed(2)}%</div>
        </div>

        <div className="flex items-center justify-center">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isMatch ? "bg-green-500/20 border-2 border-green-500" : "bg-red-500/20 border-2 border-red-500"
            }`}
          >
            {isMatch ? <Check className="w-6 h-6 text-green-500" /> : <X className="w-6 h-6 text-red-500" />}
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <div className="text-sm text-gray-400 mb-2">Method 2: Multiplicative Relationship</div>
          <div className="text-2xl font-bold text-purple-400">Performance = Productivity × Latency</div>
          <div className="text-lg text-gray-300 mt-2">
            = {(productivity * 100).toFixed(2)}% × {(latency * 100).toFixed(2)}%
          </div>
          <div className="text-3xl font-bold text-white mt-2">{(performance2 * 100).toFixed(2)}%</div>
        </div>

        {!isMatch && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            <div className="text-sm text-red-400">Difference: {(difference * 100).toFixed(4)}%</div>
          </div>
        )}

        {isMatch && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
            <div className="text-sm text-green-400 text-center">
              ✓ Both methods produce identical results, confirming the mathematical relationship
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
