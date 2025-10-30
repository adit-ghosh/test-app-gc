"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { ArrowLeft, Award, BookOpen, Briefcase, HeartIcon as CertIcon, Users, Share2 } from "lucide-react"

export function GCScoreDetail() {
  const scoreComponents = [
    {
      name: "Academic Performance",
      score: 85,
      icon: BookOpen,
      description: "GPA, courses, and educational achievements",
    },
    {
      name: "Work Experience",
      score: 72,
      icon: Briefcase,
      description: "Job history, roles, and responsibilities",
    },
    {
      name: "Certifications",
      score: 68,
      icon: CertIcon,
      description: "Professional certifications and credentials",
    },
    {
      name: "Projects & Portfolio",
      score: 78,
      icon: Award,
      description: "Personal and professional projects",
    },
    {
      name: "Social & Network",
      score: 65,
      icon: Users,
      description: "LinkedIn presence and professional network",
    },
  ]

  const overallScore = Math.round(scoreComponents.reduce((sum, item) => sum + item.score, 0) / scoreComponents.length)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-br from-primary/5 to-accent/5 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link href="/dashboard" className="mb-6 inline-flex items-center text-sm text-primary hover:text-primary/80">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-foreground">GC Score Breakdown</h1>
          <p className="mt-2 text-muted-foreground">Understand what makes up your Growth Charter Score</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Overall Score */}
          <Card className="mb-8 bg-gradient-to-br from-primary/10 to-accent/10 p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall GC Score</p>
                <p className="mt-2 text-5xl font-bold text-foreground">{overallScore}</p>
                <p className="mt-2 text-sm text-muted-foreground">You're in the top 35% of candidates</p>
              </div>
              <div className="text-right">
                <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-primary/20">
                  <span className="text-3xl font-bold text-primary">{overallScore}%</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Score Components */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Score Components</h2>
            {scoreComponents.map((component) => {
              const Icon = component.icon
              return (
                <Card key={component.name} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-foreground">{component.name}</h3>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{component.description}</p>
                      <div className="mt-4 flex items-center gap-4">
                        <Progress value={component.score} className="flex-1" />
                        <span className="text-lg font-bold text-foreground">{component.score}%</span>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <Button asChild className="flex-1">
              <Link href="/dashboard/ai-suggestions">Get Improvement Tips</Link>
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Share2 className="mr-2 h-4 w-4" />
              Share Score
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
