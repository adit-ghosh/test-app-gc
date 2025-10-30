"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Lightbulb, TrendingUp, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function AISuggestions() {
  const [carouselIndex, setCarouselIndex] = useState(0)

  const suggestions = [
    {
      id: 1,
      title: "Complete AWS Certification",
      description: "Boost your technical credibility with industry-recognized certification",
      impact: "+12 points",
      difficulty: "Medium",
      timeframe: "3 months",
      status: "recommended",
    },
    {
      id: 2,
      title: "Build a Full-Stack Project",
      description: "Create a portfolio project showcasing your end-to-end development skills",
      impact: "+15 points",
      difficulty: "Hard",
      timeframe: "2-3 months",
      status: "recommended",
    },
    {
      id: 3,
      title: "Improve LinkedIn Profile",
      description: "Add professional photo, detailed headline, and recent achievements",
      impact: "+8 points",
      difficulty: "Easy",
      timeframe: "1 week",
      status: "quick-win",
    },
    {
      id: 4,
      title: "Contribute to Open Source",
      description: "Make meaningful contributions to popular GitHub projects",
      impact: "+10 points",
      difficulty: "Medium",
      timeframe: "1-2 months",
      status: "recommended",
    },
    {
      id: 5,
      title: "Write Technical Blog Posts",
      description: "Share your knowledge through 3-5 technical articles",
      impact: "+9 points",
      difficulty: "Medium",
      timeframe: "2 months",
      status: "recommended",
    },
  ]

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev === 0 ? suggestions.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCarouselIndex((prev) => (prev === suggestions.length - 1 ? 0 : prev + 1))
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
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">AI-Powered Suggestions</h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Personalized recommendations to boost your GC Score
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
                    {suggestions.map((suggestion) => (
                      <div key={suggestion.id} className="w-full flex-shrink-0">
                        <Card className="overflow-hidden">
                          <div className="p-4 sm:p-6">
                            <div className="flex items-start gap-2">
                              <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-1" />
                              <h3 className="text-base sm:text-lg font-semibold text-foreground">{suggestion.title}</h3>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">{suggestion.description}</p>
                            <div className="mt-4 flex flex-wrap gap-3 text-xs sm:text-sm">
                              <div className="flex items-center gap-1">
                                <TrendingUp className="h-4 w-4 text-green-500" />
                                <span className="font-semibold text-green-600">{suggestion.impact}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-blue-500" />
                                <span className="text-muted-foreground">{suggestion.timeframe}</span>
                              </div>
                              <div className="rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                                {suggestion.difficulty}
                              </div>
                            </div>
                            <Button className="mt-6 w-full">Start Now</Button>
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
                {suggestions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      idx === carouselIndex ? "bg-primary w-6" : "bg-muted w-2",
                    )}
                    aria-label={`Go to suggestion ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop List */}
          <div className="hidden md:space-y-4">
            {suggestions.map((suggestion) => (
              <Card
                key={suggestion.id}
                className="overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-amber-500" />
                        <h3 className="text-lg font-semibold text-foreground">{suggestion.title}</h3>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{suggestion.description}</p>
                      <div className="mt-4 flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="font-semibold text-green-600">{suggestion.impact}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span className="text-muted-foreground">{suggestion.timeframe}</span>
                        </div>
                        <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                          {suggestion.difficulty}
                        </div>
                      </div>
                    </div>
                    <Button className="whitespace-nowrap">Start Now</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
