"use client"

import { useState, useEffect } from "react"
import MetricInputs from "@/components/MetricInputs"
import PerformanceComparison from "@/components/PerformanceComparison"
import RatioCards from "@/components/RatioCards"
import Visualizations from "@/components/Visualizations"
import InsightsPanel from "@/components/InsightsPanel"
import type { BeerMetrics, ValidationErrors } from "@/types/metrics"

interface Metrics {
  actuality: number
  capability: number
  potentiality: number
}

interface Ratios {
  productivity: number
  latency: number
  performance: number
}

interface HistoricalData {
  timestamp: string
  productivity: number
  latency: number
  performance: number
}

export default function PerformanceDashboard() {
  const [actuality, setActuality] = useState(60)
  const [capability, setCapability] = useState(80)
  const [potentiality, setPotentiality] = useState(100)
  const [errors, setErrors] = useState<ValidationErrors>({})

  const [metrics, setMetrics] = useState<BeerMetrics>({
    actuality: 60,
    capability: 80,
    potentiality: 100,
    productivity: 0.75,
    latency: 0.8,
    performance1: 0.6,
    performance2: 0.6,
  })

  const [historicalData, setHistoricalData] = useState([
    { time: "T-5", productivity: 70, latency: 75, performance: 52.5 },
    { time: "T-4", productivity: 72, latency: 76, performance: 54.7 },
    { time: "T-3", productivity: 73, latency: 78, performance: 56.9 },
    { time: "T-2", productivity: 74, latency: 79, performance: 58.5 },
    { time: "T-1", productivity: 75, latency: 80, performance: 60.0 },
  ])

  const validateInputs = (a: number, c: number, p: number): ValidationErrors => {
    const newErrors: ValidationErrors = {}

    if (a > c) {
      newErrors.actuality = "Actuality must be ≤ Capability"
    }
    if (c < a) {
      newErrors.capability = "Capability must be ≥ Actuality"
    }
    if (c > p) {
      newErrors.capability = "Capability must be ≤ Potentiality"
    }
    if (p < c) {
      newErrors.potentiality = "Potentiality must be ≥ Capability"
    }

    return newErrors
  }

  useEffect(() => {
    const newErrors = validateInputs(actuality, capability, potentiality)
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0 && capability > 0 && potentiality > 0) {
      const productivity = actuality / capability
      const latency = capability / potentiality
      const performance1 = actuality / potentiality
      const performance2 = productivity * latency

      const newMetrics: BeerMetrics = {
        actuality,
        capability,
        potentiality,
        productivity,
        latency,
        performance1,
        performance2,
      }

      setMetrics(newMetrics)

      // Update historical data
      setHistoricalData((prev) => {
        const newEntry = {
          time: "Now",
          productivity: productivity * 100,
          latency: latency * 100,
          performance: performance1 * 100,
        }
        return [...prev.slice(-4), newEntry]
      })
    }
  }, [actuality, capability, potentiality])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Performance Metrics Dashboard
          </h1>
          <p className="text-gray-400 text-lg">Based on Stafford Beer's Viable System Model from 'Brain of the Firm'</p>

          <div className="mt-6 bg-gray-800 rounded-xl p-4 border border-gray-700">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/capabilities-k0J3gs0paHE8bLccy91vxOPX66Ap1x.jpg"
              alt="Stafford Beer's capacity model diagram"
              className="w-full max-w-2xl mx-auto rounded-lg"
            />
            <p className="text-xs text-gray-500 text-center mt-2">
              Figure 28: Three measures of capacity generating three measures of achievement
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Capacity Measures</h2>
            <MetricInputs
              actuality={actuality}
              capability={capability}
              potentiality={potentiality}
              onActualityChange={setActuality}
              onCapabilityChange={setCapability}
              onPotentialityChange={setPotentiality}
              errors={errors}
            />
          </div>

          <PerformanceComparison
            performance1={metrics.performance1}
            performance2={metrics.performance2}
            productivity={metrics.productivity}
            latency={metrics.latency}
          />

          <RatioCards
            productivity={metrics.productivity}
            latency={metrics.latency}
            performance={metrics.performance1}
          />

          <Visualizations
            actuality={actuality}
            capability={capability}
            potentiality={potentiality}
            productivity={metrics.productivity}
            latency={metrics.latency}
            performance={metrics.performance1}
            historicalData={historicalData}
          />

          <InsightsPanel
            productivity={metrics.productivity}
            latency={metrics.latency}
            performance={metrics.performance1}
            actuality={actuality}
            capability={capability}
            potentiality={potentiality}
          />
        </div>
      </div>
    </div>
  )
}
