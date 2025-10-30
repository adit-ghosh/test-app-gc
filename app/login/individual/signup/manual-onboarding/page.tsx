"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { User, BookOpen, Briefcase, Users, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

import { OnboardingPersonal } from "@/components/onboarding-personal"
import { OnboardingAcademic } from "@/components/onboarding-academic"
import { OnboardingSkills } from "@/components/onboarding-skills"
import { OnboardingReferences } from "@/components/onboarding-references"

type TabType = "personal" | "academic" | "skills" | "references"

export default function ManualOnboardingPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>("personal")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const [formData, setFormData] = useState({
    personal: null,
    academic: null,
    skills: null,
    references: null,
  })

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "personal", label: "Personal", icon: <User className="w-4 h-4" /> },
    { id: "academic", label: "Academic", icon: <BookOpen className="w-4 h-4" /> },
    { id: "skills", label: "Skills", icon: <Briefcase className="w-4 h-4" /> },
    { id: "references", label: "References", icon: <Users className="w-4 h-4" /> },
  ]

  const handleSavePersonal = (data: any) => {
    setFormData((prev) => ({ ...prev, personal: data }))
    // Move to next tab
    setActiveTab("academic")
  }

  const handleSaveAcademic = (data: any) => {
    setFormData((prev) => ({ ...prev, academic: data }))
    setActiveTab("skills")
  }

  const handleSaveSkills = (data: any) => {
    setFormData((prev) => ({ ...prev, skills: data }))
    setActiveTab("references")
  }

  const handleSaveReferences = (data: any) => {
    setFormData((prev) => ({ ...prev, references: data }))
    // Save all data to localStorage or send to backend
    localStorage.setItem("onboardingData", JSON.stringify({ ...formData, references: data }))
  }

  const handleGoToDashboard = () => {
    // Save current form data before navigating
    localStorage.setItem("onboardingData", JSON.stringify(formData))
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed md:relative w-64 h-screen bg-card border-r border-border p-6 overflow-y-auto transition-transform duration-300 z-50 md:z-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          )}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-foreground">Growth Charter</h2>
              <p className="text-sm text-muted-foreground">Complete your profile</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-border bg-card">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-foreground">Complete Your Profile</h1>
            <div className="w-9" />
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto flex items-start justify-center p-4 md:p-8">
            <Card className="w-full max-w-2xl p-6 md:p-8">
              {activeTab === "personal" && (
                <OnboardingPersonal onSave={handleSavePersonal} initialData={formData.personal} />
              )}
              {activeTab === "academic" && (
                <OnboardingAcademic onSave={handleSaveAcademic} initialData={formData.academic} />
              )}
              {activeTab === "skills" && <OnboardingSkills onSave={handleSaveSkills} initialData={formData.skills} />}
              {activeTab === "references" && (
                <OnboardingReferences onSave={handleSaveReferences} initialData={formData.references} />
              )}

              {/* Not Done Yet Message */}
              <div className="mt-8 p-6 bg-muted rounded-lg border border-border">
                <p className="text-center text-muted-foreground mb-4">Not done yet? You can complete this later.</p>
                <Button onClick={handleGoToDashboard} className="w-full">
                  Go to Dashboard
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
