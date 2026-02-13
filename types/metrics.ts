export interface BeerMetrics {
  actuality: number
  capability: number
  potentiality: number
  productivity: number
  latency: number
  performance1: number // Direct: Actuality / Potentiality
  performance2: number // Multiplicative: Productivity × Latency
}

export interface ValidationErrors {
  actuality?: string
  capability?: string
  potentiality?: string
}
