import { BarChart2 } from "lucide-react"

export function Logo() {
  return (
    <div className="flex items-center gap-2 font-bold text-xl">
      <BarChart2 className="h-6 w-6 text-navy" />
      <span>
        <span className="text-navy">d</span>
        <span className="text-gold">P</span>
        <span className="text-navy">areto</span>
      </span>
    </div>
  )
}
