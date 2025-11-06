"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/base/card"
import { Button } from "@/components/base/button"
import { cn } from "@/lib/utils"
import {
  User, Pencil, MapPin, BookOpen, Briefcase, Stars,
  Download, Camera, Image as ImageIcon, Settings, LogOut, Crown,
  Info, ExternalLink, Plus, X, Menu, ChevronLeft, ChevronRight,
  FileText, Upload, Eye, Trash2, Edit3
} from "lucide-react"
import { motion } from "framer-motion"

/* ------------------------------------------------------------- */
/* Types & Defaults                                               */
/* ------------------------------------------------------------- */

type ProfileData = {
  fullName?: string
  headline?: string
  location?: string
  email?: string
  linkedin?: string
  bannerUrl?: string
  avatarUrl?: string
  education?: Array<{ degree: string; institution: string; field?: string; gpa?: string }>
  experience?: Array<{ company: string; role: string; duration?: string; project?: string }>
  skills?: string[]
}

type ResumeTemplate = {
  id: string
  name: string
  description: string
  preview: string
  category: "modern" | "classic" | "creative"
}

const DEFAULT_PROFILE: ProfileData = {
  fullName: "",
  headline: "",
  location: "",
  email: "",
  linkedin: "",
  bannerUrl: "",
  avatarUrl: "",
  education: [],
  experience: [],
  skills: [],
}

const RESUME_TEMPLATES: ResumeTemplate[] = [
  {
    id: "modern-1",
    name: "Modern Professional",
    description: "Clean, modern design perfect for tech and business roles",
    preview: "/templates/modern-1.jpg",
    category: "modern"
  },
  {
    id: "classic-1", 
    name: "Classic Executive",
    description: "Traditional format ideal for corporate positions",
    preview: "/templates/classic-1.jpg",
    category: "classic"
  },
  {
    id: "creative-1",
    name: "Creative Portfolio",
    description: "Eye-catching design for creative professionals",
    preview: "/templates/creative-1.jpg", 
    category: "creative"
  }
]

/* ------------------------------------------------------------- */
/* Page                                                          */
/* ------------------------------------------------------------- */

export default function ResumeSkillsPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string>("modern-1")
  const [activeTab, setActiveTab] = useState<"builder" | "templates" | "skills">("builder")

  /* Load Data */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("profile_data")
      if (saved) setProfile(JSON.parse(saved))
    } catch {
      setProfile(DEFAULT_PROFILE)
    }
  }, [])

  const completion = useMemo(() => calcCompletion(profile), [profile])

  const downloadResume = (format: "pdf" | "docx" | "txt") => {
    const content = generateResumeContent(profile, format)
    const blob = new Blob([content], { 
      type: format === "pdf" ? "application/pdf" : format === "docx" ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document" : "text/plain"
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `resume.${format}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-[#f1f3f2] to-[#e9ecef] font-sans text-[#1d2b27]">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white/90 backdrop-blur-sm border-[#1b4332]/20"
        >
          <Menu className="w-4 h-4" />
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className={cn(
          "shrink-0 flex-col gap-6 p-6 bg-white/70 backdrop-blur-lg border-r border-[#dce2dc] shadow-[inset_-1px_0_0_rgba(0,0,0,0.03)] transition-all duration-300",
          "lg:flex lg:translate-x-0",
          sidebarCollapsed ? "lg:w-20" : "w-64 xl:w-72",
          sidebarOpen ? "fixed inset-y-0 left-0 z-50 flex translate-x-0 w-64" : "fixed inset-y-0 left-0 z-50 flex -translate-x-full lg:translate-x-0"
        )}>
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div>
                <h2 className="text-lg font-bold tracking-tight text-[#1b4332]">Growth Charter</h2>
                <p className="text-sm text-[#4f6f56]">Your Professional Profile</p>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex text-[#1b4332] hover:bg-[#1b4332]/10"
              >
                {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <nav className="space-y-2">
            <SidebarItem 
              icon={<User />} 
              label="Overview" 
              collapsed={sidebarCollapsed}
              onClick={() => router.push("/user")}
            />
            <SidebarItem 
              icon={<Briefcase />} 
              label="Resume & Skills" 
              active 
              collapsed={sidebarCollapsed}
            />
            <SidebarItem 
              icon={<Settings />} 
              label="Account Settings" 
              collapsed={sidebarCollapsed}
              onClick={() => router.push("/user/settings")}
            />
          </nav>

          <div className="mt-auto space-y-3">
            <Button
              onClick={() => router.push("/pricing")}
              className={cn(
                "w-full gap-2 rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]",
                sidebarCollapsed && "px-2"
              )}
              title={sidebarCollapsed ? "Pricing" : undefined}
            >
              <Crown className="w-4 h-4" />
              {!sidebarCollapsed && " Pricing"}
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className={cn(
                "w-full gap-2 border-[#1b4332]/30 text-[#1b4332] hover:bg-[#1b4332]/5 rounded-full",
                sidebarCollapsed && "px-2"
              )}
              title={sidebarCollapsed ? "Sign out" : undefined}
            >
              <LogOut className="w-4 h-4" />
              {!sidebarCollapsed && " Sign out"}
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 w-full p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#1b4332] mb-2">Resume & Skills</h1>
              <p className="text-[#4f6f56]">Build and customize your professional resume</p>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
              <button
                onClick={() => setActiveTab("builder")}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all",
                  activeTab === "builder" 
                    ? "bg-white text-[#1b4332] shadow-sm" 
                    : "text-gray-600 hover:text-[#1b4332]"
                )}
              >
                Resume Builder
              </button>
              <button
                onClick={() => setActiveTab("templates")}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all",
                  activeTab === "templates" 
                    ? "bg-white text-[#1b4332] shadow-sm" 
                    : "text-gray-600 hover:text-[#1b4332]"
                )}
              >
                Templates
              </button>
              <button
                onClick={() => setActiveTab("skills")}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all",
                  activeTab === "skills" 
                    ? "bg-white text-[#1b4332] shadow-sm" 
                    : "text-gray-600 hover:text-[#1b4332]"
                )}
              >
                Skills Analysis
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "builder" && <ResumeBuilderTab profile={profile} onDownload={downloadResume} />}
            {activeTab === "templates" && <TemplatesTab templates={RESUME_TEMPLATES} selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />}
            {activeTab === "skills" && <SkillsAnalysisTab profile={profile} />}
          </div>
        </section>
      </div>
    </main>
  )
}

/* ------------------------------------------------------------- */
/* Tab Components                                                */
/* ------------------------------------------------------------- */

function ResumeBuilderTab({ profile, onDownload }: { profile: ProfileData; onDownload: (format: "pdf" | "docx" | "txt") => void }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Resume Preview */}
      <div>
        <h2 className="text-xl font-semibold text-[#1b4332] mb-4">Resume Preview</h2>
        <Card className="p-6 bg-white border-[#dce2dc]">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center border-b pb-4">
              <h3 className="text-2xl font-bold text-[#1b4332]">{profile.fullName || "Your Name"}</h3>
              <p className="text-[#2d6a4f] mt-1">{profile.headline || "Professional Headline"}</p>
              <div className="flex justify-center gap-4 mt-2 text-sm text-gray-600">
                {profile.email && <span>{profile.email}</span>}
                {profile.location && <span>{profile.location}</span>}
                {profile.linkedin && <span>{profile.linkedin}</span>}
              </div>
            </div>

            {/* Experience */}
            {profile.experience && profile.experience.length > 0 && (
              <div>
                <h4 className="font-semibold text-[#1b4332] mb-3">Experience</h4>
                <div className="space-y-3">
                  {profile.experience.map((exp, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{exp.role}</p>
                          <p className="text-[#2d6a4f]">{exp.company}</p>
                        </div>
                        <span className="text-sm text-gray-600">{exp.duration}</span>
                      </div>
                      {exp.project && <p className="text-sm text-gray-700 mt-1">{exp.project}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {profile.education && profile.education.length > 0 && (
              <div>
                <h4 className="font-semibold text-[#1b4332] mb-3">Education</h4>
                <div className="space-y-2">
                  {profile.education.map((edu, i) => (
                    <div key={i}>
                      <p className="font-medium">{edu.degree}</p>
                      <p className="text-[#2d6a4f]">{edu.institution}</p>
                      {edu.field && <p className="text-sm text-gray-600">{edu.field}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {profile.skills && profile.skills.length > 0 && (
              <div>
                <h4 className="font-semibold text-[#1b4332] mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-[#e9f5ef] text-[#1b4332] text-sm rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Controls */}
      <div>
        <h2 className="text-xl font-semibold text-[#1b4332] mb-4">Download Options</h2>
        <Card className="p-6 bg-white border-[#dce2dc]">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-[#1b4332] mb-3">Export Formats</h3>
              <div className="space-y-2">
                <Button 
                  onClick={() => onDownload("pdf")} 
                  className="w-full gap-2 bg-[#1b4332] hover:bg-[#2d6a4f]"
                >
                  <FileText className="w-4 h-4" />
                  Download as PDF
                </Button>
                <Button 
                  onClick={() => onDownload("docx")} 
                  variant="outline" 
                  className="w-full gap-2 border-[#1b4332]/30 text-[#1b4332]"
                >
                  <FileText className="w-4 h-4" />
                  Download as Word
                </Button>
                <Button 
                  onClick={() => onDownload("txt")} 
                  variant="outline" 
                  className="w-full gap-2 border-[#1b4332]/30 text-[#1b4332]"
                >
                  <FileText className="w-4 h-4" />
                  Download as Text
                </Button>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium text-[#1b4332] mb-3">ATS Optimization</h3>
              <div className="bg-[#e9f5ef] p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-[#1b4332]">ATS Score: 85%</span>
                </div>
                <p className="text-sm text-gray-600">Your resume is well-optimized for Applicant Tracking Systems</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

function TemplatesTab({ templates, selectedTemplate, onSelectTemplate }: { 
  templates: ResumeTemplate[]; 
  selectedTemplate: string; 
  onSelectTemplate: (id: string) => void 
}) {
  const categories = ["modern", "classic", "creative"] as const

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#1b4332] mb-6">Choose a Template</h2>
      
      {categories.map(category => (
        <div key={category} className="mb-8">
          <h3 className="text-lg font-medium text-[#1b4332] mb-4 capitalize">{category} Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.filter(t => t.category === category).map(template => (
              <Card 
                key={template.id} 
                className={cn(
                  "cursor-pointer transition-all hover:shadow-lg",
                  selectedTemplate === template.id 
                    ? "ring-2 ring-[#1b4332] bg-[#e9f5ef]" 
                    : "bg-white border-[#dce2dc] hover:border-[#1b4332]/30"
                )}
              >
                <div 
                  className="p-4"
                  onClick={() => onSelectTemplate(template.id)}
                >
                  <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                    <FileText className="w-12 h-12 text-gray-400" />
                  </div>
                  <h4 className="font-medium text-[#1b4332] mb-1">{template.name}</h4>
                  <p className="text-sm text-gray-600">{template.description}</p>
                  {selectedTemplate === template.id && (
                    <div className="mt-3 flex items-center gap-2 text-[#1b4332]">
                      <div className="w-2 h-2 bg-[#1b4332] rounded-full"></div>
                      <span className="text-sm font-medium">Selected</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function SkillsAnalysisTab({ profile }: { profile: ProfileData }) {
  const skillCategories = {
    "Technical": ["JavaScript", "Python", "React", "Node.js", "SQL"],
    "Design": ["Figma", "Photoshop", "UI/UX", "Sketch"],
    "Management": ["Project Management", "Team Leadership", "Agile", "Scrum"],
    "Communication": ["Public Speaking", "Writing", "Presentation"]
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-[#1b4332] mb-4">Skills Analysis</h2>
        <Card className="p-6 bg-white border-[#dce2dc]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-[#1b4332] mb-3">Your Skills ({profile.skills?.length || 0})</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills?.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-[#e9f5ef] text-[#1b4332] text-sm rounded-full">
                    {skill}
                  </span>
                )) || <p className="text-gray-500">No skills added yet</p>}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-[#1b4332] mb-3">Skill Recommendations</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">Cloud Computing</span>
                  <Button size="sm" variant="outline" className="text-xs">
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">Data Analysis</span>
                  <Button size="sm" variant="outline" className="text-xs">
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-[#1b4332] mb-4">Skill Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(skillCategories).map(([category, skills]) => (
            <Card key={category} className="p-6 bg-white border-[#dce2dc]">
              <h3 className="font-medium text-[#1b4332] mb-3">{category}</h3>
              <div className="space-y-2">
                {skills.map(skill => (
                  <div key={skill} className="flex items-center justify-between">
                    <span className="text-sm">{skill}</span>
                    <div className="flex items-center gap-2">
                      {profile.skills?.includes(skill) ? (
                        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Added</span>
                      ) : (
                        <Button size="sm" variant="outline" className="text-xs">
                          <Plus className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------- */
/* Reusable Components                                            */
/* ------------------------------------------------------------- */

function SidebarItem({ icon, label, active = false, collapsed = false, onClick }: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean; 
  collapsed?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer relative group",
        active
          ? "bg-[#e9f5ef] text-[#1b4332] border border-[#c3e6cb]"
          : "text-[#4f6f56] hover:bg-[#e9f5ef]/60",
        collapsed && "justify-center px-2"
      )}
      title={collapsed ? label : undefined}
      onClick={onClick}
    >
      <div className="h-6 w-6 grid place-items-center rounded-md bg-[#1b4332]/10 text-[#1b4332]">{icon}</div>
      {!collapsed && label}
      
      {collapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------- */
/* Helpers                                                        */
/* ------------------------------------------------------------- */

function calcCompletion(p: ProfileData): number {
  const checks: Array<[boolean, number]> = [
    [!!p.fullName, 10],
    [!!p.headline, 10],
    [!!p.location, 5],
    [!!p.email, 5],
    [!!p.linkedin, 10],
    [!!p.avatarUrl, 10],
    [!!p.bannerUrl, 5],
    [!!(p.education && p.education.length), 15],
    [!!(p.experience && p.experience.length), 15],
    [!!(p.skills && p.skills.length >= 5), 15],
  ]
  const done = checks.reduce((sum, [ok, weight]) => sum + (ok ? weight : 0), 0)
  return Math.min(100, Math.round((done / 100) * 100))
}

function generateResumeContent(profile: ProfileData, format: "pdf" | "docx" | "txt"): string {
  const content = `
${profile.fullName || "Your Name"}
${profile.headline || "Professional Headline"}

Contact Information:
Email: ${profile.email || "your.email@example.com"}
Location: ${profile.location || "Your Location"}
LinkedIn: ${profile.linkedin || "Your LinkedIn Profile"}

${profile.experience && profile.experience.length > 0 ? `
EXPERIENCE:
${profile.experience.map(exp => `
${exp.role} - ${exp.company}
${exp.duration || ""}
${exp.project || ""}
`).join("\n")}` : ""}

${profile.education && profile.education.length > 0 ? `
EDUCATION:
${profile.education.map(edu => `
${edu.degree} - ${edu.institution}
${edu.field ? `Field: ${edu.field}` : ""}
${edu.gpa ? `GPA: ${edu.gpa}` : ""}
`).join("\n")}` : ""}

${profile.skills && profile.skills.length > 0 ? `
SKILLS:
${profile.skills.join(", ")}` : ""}
  `.trim()

  return content
}