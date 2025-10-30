"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { ArrowLeft, AlertCircle, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function CareerDiversion() {
  const [carouselIndex, setCarouselIndex] = useState(0)

  const diversions = [
    {
      title: "Product Manager",
      successRate: 78,
      difficulty: "Medium",
      timeframe: "6-12 months",
      challenges: [
        "Need to develop business acumen",
        "Requires cross-functional experience",
        "Competitive field with high demand",
      ],
      roadmap: ["Take product management course", "Lead cross-functional projects", "Build product portfolio"],
    },
    {
      title: "Data Scientist",
      successRate: 65,
      difficulty: "Hard",
      timeframe: "12-18 months",
      challenges: [
        "Requires advanced math and statistics",
        "Need machine learning expertise",
        "Highly competitive market",
      ],
      roadmap: ["Master Python and SQL", "Learn ML algorithms", "Build data science projects"],
    },
    {
      title: "DevOps Engineer",
      successRate: 82,
      difficulty: "Medium",
      timeframe: "6-9 months",
      challenges: [
        "Need cloud platform expertise",
        "Requires infrastructure knowledge",
        "Continuous learning required",
      ],
      roadmap: ["Learn Docker and Kubernetes", "Master cloud platforms (AWS/GCP)", "Set up CI/CD pipelines"],
    },
  ]

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev === 0 ? diversions.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCarouselIndex((prev) => (prev === diversions.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-br from-primary/5 to-accent/5 px-4 py-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/dashboard"
            className="mb-4 sm:mb-6 inline-flex items-center text-xs sm:text-sm text-primary hover:text-primary/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Career Diversion Analysis</h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Explore alternative career paths and your likelihood of success
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-8 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="transition-transform duration-300"
                  style={{
                    transform: `translateX(-${carouselIndex * 100}%)`,
                  }}
                >
                  <div className="flex">
                    {diversions.map((diversion, idx) => (
                      <div key={idx} className="w-full flex-shrink-0">
                        <Card className="overflow-hidden">
                          <div className="p-4 sm:p-6">
                            <div className="mb-4 flex items-start justify-between">
                              <div>
                                <h3 className="text-lg sm:text-xl font-bold text-foreground">{diversion.title}</h3>
                                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                                  Timeframe: {diversion.timeframe}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-muted-foreground">Success Rate</p>
                                <p className="text-2xl font-bold text-primary">{diversion.successRate}%</p>
                              </div>
                            </div>

                            <div className="mb-4">
                              <Progress value={diversion.successRate} className="h-2" />
                            </div>

                            <div className="space-y-4">
                              <div>
                                <h4 className="mb-2 flex items-center gap-2 font-semibold text-foreground text-sm">
                                  <AlertCircle className="h-4 w-4 text-amber-500" />
                                  Key Challenges
                                </h4>
                                <ul className="space-y-1">
                                  {diversion.challenges.map((challenge, i) => (
                                    <li key={i} className="text-xs sm:text-sm text-muted-foreground">
                                      • {challenge}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="mb-2 flex items-center gap-2 font-semibold text-foreground text-sm">
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                  Your Roadmap
                                </h4>
                                <ul className="space-y-1">
                                  {diversion.roadmap.map((step, i) => (
                                    <li key={i} className="text-xs sm:text-sm text-muted-foreground">
                                      {i + 1}. {step}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <Button className="mt-4 w-full">Explore This Path</Button>
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Carousel Controls */}
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Carousel Indicators */}
              <div className="mt-4 flex justify-center gap-2">
                {diversions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      idx === carouselIndex ? "bg-primary w-6" : "bg-muted w-2",
                    )}
                    aria-label={`Go to diversion ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop List */}
          <div className="hidden md:space-y-6">
            {diversions.map((diversion, idx) => (
              <Card key={idx} className="overflow-hidden">
                <div className="p-6">
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{diversion.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Timeframe: {diversion.timeframe}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Success Rate</p>
                      <p className="text-3xl font-bold text-primary">{diversion.successRate}%</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <Progress value={diversion.successRate} className="h-2" />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                        Key Challenges
                      </h4>
                      <ul className="space-y-2">
                        {diversion.challenges.map((challenge, i) => (
                          <li key={i} className="text-sm text-muted-foreground">
                            • {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Your Roadmap
                      </h4>
                      <ul className="space-y-2">
                        {diversion.roadmap.map((step, i) => (
                          <li key={i} className="text-sm text-muted-foreground">
                            {i + 1}. {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Button className="mt-6 w-full">Explore This Path</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
