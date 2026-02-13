"use client"

import { Lightbulb, TrendingUp, AlertTriangle } from "lucide-react"

interface InsightsPanelProps {
  productivity: number
  latency: number
  performance: number
  actuality: number
  capability: number
  potentiality: number
}

export default function InsightsPanel({
  productivity,
  latency,
  performance,
  actuality,
  capability,
  potentiality,
}: InsightsPanelProps) {
  const insights: Array<{ type: "success" | "warning" | "info"; message: string }> = []

  // Performance analysis
  if (performance >= 0.8) {
    insights.push({
      type: "success",
      message: "Excellent overall performance! The organization is achieving 80%+ of its maximum potential.",
    })
  } else if (performance < 0.5) {
    insights.push({
      type: "warning",
      message:
        "Performance is below 50%. Consider investigating both operational efficiency and strategic capability development.",
    })
  }

  // Productivity vs Latency analysis
  if (productivity > 0.8 && latency < 0.6) {
    insights.push({
      type: "info",
      message:
        "High productivity but low latency: Current resources are well-utilized, but there is significant untapped potential. Consider strategic investments to increase capability.",
    })
  } else if (productivity < 0.6 && latency > 0.8) {
    insights.push({
      type: "warning",
      message:
        "Low productivity but high latency: The organization has developed strong capabilities but is not utilizing them effectively. Focus on operational improvements to increase actuality.",
    })
  } else if (productivity > 0.7 && latency > 0.7) {
    insights.push({
      type: "success",
      message:
        "Balanced excellence: Both operational efficiency and strategic capability development are strong. This is the ideal state for sustainable high performance.",
    })
  }

  // Multiplicative relationship insight
  insights.push({
    type: "info",
    message: `Performance = Productivity × Latency demonstrates that overall success requires BOTH operational excellence (${(productivity * 100).toFixed(1)}%) AND strategic capability development (${(latency * 100).toFixed(1)}%). Improving either factor multiplies overall performance.`,
  })

  // Gap analysis
  const capabilityGap = potentiality - capability
  const actualityGap = capability - actuality

  if (capabilityGap > actualityGap && capabilityGap > potentiality * 0.3) {
    insights.push({
      type: "warning",
      message: `Large gap between Capability (${capability}) and Potentiality (${potentiality}): The organization has significant unrealized potential. Strategic investments in infrastructure, skills, or resources could unlock major growth.`,
    })
  }

  if (actualityGap > capabilityGap && actualityGap > capability * 0.3) {
    insights.push({
      type: "warning",
      message: `Large gap between Actuality (${actuality}) and Capability (${capability}): Current resources are underutilized. Focus on process optimization, motivation, or removing operational bottlenecks.`,
    })
  }

  // Beer's Law insight
  if (productivity < 0.5 || latency < 0.5) {
    insights.push({
      type: "info",
      message:
        "Stafford Beer's insight: When either Productivity or Latency falls below 50%, it creates a multiplicative drag on Performance. Small improvements in the weaker ratio can have outsized impact on overall results.",
    })
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <TrendingUp className="w-5 h-5 text-green-400" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      default:
        return <Lightbulb className="w-5 h-5 text-blue-400" />
    }
  }

  const getColorClass = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500/10 border-green-500/30"
      case "warning":
        return "bg-yellow-500/10 border-yellow-500/30"
      default:
        return "bg-blue-500/10 border-blue-500/30"
    }
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-yellow-400" />
        Insights & Analysis
      </h3>

      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div key={index} className={`rounded-lg p-4 border ${getColorClass(insight.type)}`}>
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-0.5">{getIcon(insight.type)}</div>
              <p className="text-sm text-gray-300 leading-relaxed">{insight.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
