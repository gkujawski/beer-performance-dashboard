"use client"

import { AlertCircle } from "lucide-react"

interface MetricInputsProps {
  actuality: number
  capability: number
  potentiality: number
  onActualityChange: (value: number) => void
  onCapabilityChange: (value: number) => void
  onPotentialityChange: (value: number) => void
  errors: {
    actuality?: string
    capability?: string
    potentiality?: string
  }
}

export default function MetricInputs({
  actuality,
  capability,
  potentiality,
  onActualityChange,
  onCapabilityChange,
  onPotentialityChange,
  errors,
}: MetricInputsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-2">
        <label htmlFor="actuality" className="block text-sm font-medium text-gray-300">
          Actuality
          <span className="block text-xs text-gray-500 mt-1">What is actually being achieved</span>
        </label>
        <input
          id="actuality"
          type="number"
          min="0"
          step="1"
          value={actuality}
          onChange={(e) => onActualityChange(Number(e.target.value))}
          className={`w-full px-4 py-3 bg-gray-800 border ${
            errors.actuality ? "border-red-500" : "border-gray-700"
          } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.actuality && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.actuality}</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="capability" className="block text-sm font-medium text-gray-300">
          Capability
          <span className="block text-xs text-gray-500 mt-1">What could be achieved with current resources</span>
        </label>
        <input
          id="capability"
          type="number"
          min="0"
          step="1"
          value={capability}
          onChange={(e) => onCapabilityChange(Number(e.target.value))}
          className={`w-full px-4 py-3 bg-gray-800 border ${
            errors.capability ? "border-red-500" : "border-gray-700"
          } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.capability && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.capability}</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="potentiality" className="block text-sm font-medium text-gray-300">
          Potentiality
          <span className="block text-xs text-gray-500 mt-1">Maximum possible achievement</span>
        </label>
        <input
          id="potentiality"
          type="number"
          min="0"
          step="1"
          value={potentiality}
          onChange={(e) => onPotentialityChange(Number(e.target.value))}
          className={`w-full px-4 py-3 bg-gray-800 border ${
            errors.potentiality ? "border-red-500" : "border-gray-700"
          } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.potentiality && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.potentiality}</span>
          </div>
        )}
      </div>
    </div>
  )
}
