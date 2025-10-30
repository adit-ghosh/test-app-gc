"use client"

import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, TrendingUp, Zap, Map, Building2, Brain } from "lucide-react"
import { ScoreCard } from "./score-card"
import { StrengthPentagon } from "./strength-pentagon"

export function DashboardHome() {
  const quickActions = [
    {
      title: "GC Score",
      description: "View detailed score breakdown",
      icon: TrendingUp,
      href: "/dashboard/gc-score",
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "AI Suggestions",
      description: "Get personalized career tips",
      icon: Zap,
      href: "/dashboard/ai-suggestions",
      color: "from-amber-500 to-orange-600",
    },
    {
      title: "Career Roadmap",
      description: "Explore your career path",
      icon: Map,
      href: "/dashboard/career-roadmap",
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "Career Diversion",
      description: "Analyze job change options",
      icon: Brain,
      href: "/dashboard/career-diversion",
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Company Matches",
      description: "Find ideal companies",
      icon: Building2,
      href: "/dashboard/company-matches",
      color: "from-rose-500 to-red-600",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b border-border bg-gradient-to-br from-primary/5 to-accent/5 px-4 py-8 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">Welcome back</h1>
            <p className="mt-2 text-base sm:text-lg text-muted-foreground">Your AI-powered career growth dashboard</p>
          </div>

          {/* Main Cards Grid */}
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
            {/* Score Card */}
            <div className="lg:col-span-1">
              <ScoreCard />
            </div>

            {/* Strength Pentagon */}
            <div className="lg:col-span-2">
              <Card className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">Your Strengths</h2>
                <div className="mt-4 overflow-x-auto">
                  <StrengthPentagon />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-8 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Explore Your Growth</h2>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link key={action.href} href={action.href}>
                  <Card className="group relative h-full overflow-hidden p-4 sm:p-6 transition-all hover:shadow-lg hover:shadow-primary/20">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 transition-opacity group-hover:opacity-5`}
                    />
                    <div className="relative">
                      <Icon className="mb-3 h-5 w-5 sm:h-6 sm:w-6 text-primary transition-transform group-hover:scale-110" />
                      <h3 className="font-semibold text-foreground text-sm sm:text-base">{action.title}</h3>
                      <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{action.description}</p>
                      <ArrowRight className="mt-4 h-4 w-4 text-primary opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
