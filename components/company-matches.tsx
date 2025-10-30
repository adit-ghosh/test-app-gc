"use client"

import { cn } from "@/lib/utils"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, MapPin, Users, TrendingUp, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export function CompanyMatches() {
  const [carouselIndex, setCarouselIndex] = useState(0)

  const companies = [
    {
      name: "TechCorp",
      role: "Senior Software Engineer",
      match: 92,
      location: "San Francisco, CA",
      employees: "5000+",
      salary: "$180K - $220K",
    },
    {
      name: "InnovateLabs",
      role: "Full Stack Developer",
      match: 88,
      location: "Remote",
      employees: "200-500",
      salary: "$150K - $190K",
    },
    {
      name: "DataFlow",
      role: "ML Engineer",
      match: 85,
      location: "New York, NY",
      employees: "1000-5000",
      salary: "$170K - $210K",
    },
    {
      name: "CloudNine",
      role: "DevOps Engineer",
      match: 82,
      location: "Austin, TX",
      employees: "500-1000",
      salary: "$160K - $200K",
    },
    {
      name: "StartupXYZ",
      role: "Full Stack Engineer",
      match: 79,
      location: "Remote",
      employees: "50-200",
      salary: "$140K - $180K",
    },
  ]

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev === 0 ? companies.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCarouselIndex((prev) => (prev === companies.length - 1 ? 0 : prev + 1))
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
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Company Matches</h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Companies that align with your profile and goals
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
                    {companies.map((company, idx) => (
                      <div key={idx} className="w-full flex-shrink-0">
                        <Card className="overflow-hidden">
                          <div className="p-4 sm:p-6">
                            <h3 className="text-lg font-semibold text-foreground">{company.name}</h3>
                            <p className="mt-1 text-sm font-medium text-primary">{company.role}</p>
                            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {company.location}
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                {company.employees}
                              </div>
                              <div className="flex items-center gap-2 font-medium text-green-600">
                                <TrendingUp className="h-4 w-4" />
                                {company.salary}
                              </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                              <div>
                                <p className="text-xs text-muted-foreground">Match Score</p>
                                <p className="text-2xl font-bold text-primary">{company.match}%</p>
                              </div>
                              <Button size="sm" className="gap-2">
                                <Download className="h-4 w-4" />
                                Send
                              </Button>
                            </div>
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
                {companies.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      idx === carouselIndex ? "bg-primary w-6" : "bg-muted w-2",
                    )}
                    aria-label={`Go to company ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop List */}
          <div className="hidden md:space-y-4">
            {companies.map((company, idx) => (
              <Card key={idx} className="overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{company.name}</h3>
                      <p className="mt-1 text-sm font-medium text-primary">{company.role}</p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {company.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {company.employees}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                          <TrendingUp className="h-4 w-4" />
                          {company.salary}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-4">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Match Score</p>
                        <p className="text-3xl font-bold text-primary">{company.match}%</p>
                      </div>
                      <Button className="gap-2">
                        <Download className="h-4 w-4" />
                        Send Resume
                      </Button>
                    </div>
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
