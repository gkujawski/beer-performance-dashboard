"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts"

interface VisualizationsProps {
  actuality: number
  capability: number
  potentiality: number
  productivity: number
  latency: number
  performance: number
  historicalData: Array<{
    time: string
    productivity: number
    latency: number
    performance: number
  }>
}

export default function Visualizations({
  actuality,
  capability,
  potentiality,
  productivity,
  latency,
  performance,
  historicalData,
}: VisualizationsProps) {
  const capacityData = [
    { name: "Actuality", value: actuality, fill: "#3b82f6" },
    { name: "Capability", value: capability, fill: "#8b5cf6" },
    { name: "Potentiality", value: potentiality, fill: "#06b6d4" },
  ]

  const gaugeData = [
    { name: "Productivity", value: productivity * 100, color: "#3b82f6" },
    { name: "Latency", value: latency * 100, color: "#8b5cf6" },
    { name: "Performance", value: performance * 100, color: "#06b6d4" },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Capacity Levels Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={capacityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
              labelStyle={{ color: "#f3f4f6" }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Ratio Trends Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" tickFormatter={(value) => `${value}%`} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
              labelStyle={{ color: "#f3f4f6" }}
              formatter={(value: number) => `${value.toFixed(1)}%`}
            />
            <Legend />
            <Line type="monotone" dataKey="productivity" stroke="#3b82f6" strokeWidth={2} name="Productivity" />
            <Line type="monotone" dataKey="latency" stroke="#8b5cf6" strokeWidth={2} name="Latency" />
            <Line type="monotone" dataKey="performance" stroke="#06b6d4" strokeWidth={2} name="Performance" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Current Ratio Gauges</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gaugeData.map((item) => (
            <div key={item.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">{item.name}</span>
                <span className="text-white font-semibold">{item.value.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(item.value, 100)}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Relationship Diagram</h3>
        <div className="flex flex-col items-center justify-center space-y-4 py-8">
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-2">The Multiplicative Relationship</div>
            <div className="text-2xl font-bold text-white">Performance = Productivity × Latency</div>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="bg-blue-500/20 border-2 border-blue-500 rounded-lg px-6 py-4">
              <div className="text-xs text-gray-400">Productivity</div>
              <div className="text-2xl font-bold text-blue-400">{(productivity * 100).toFixed(1)}%</div>
            </div>

            <div className="text-3xl text-gray-400">×</div>

            <div className="bg-purple-500/20 border-2 border-purple-500 rounded-lg px-6 py-4">
              <div className="text-xs text-gray-400">Latency</div>
              <div className="text-2xl font-bold text-purple-400">{(latency * 100).toFixed(1)}%</div>
            </div>

            <div className="text-3xl text-gray-400">=</div>

            <div className="bg-cyan-500/20 border-2 border-cyan-500 rounded-lg px-6 py-4">
              <div className="text-xs text-gray-400">Performance</div>
              <div className="text-2xl font-bold text-cyan-400">{(performance * 100).toFixed(1)}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
