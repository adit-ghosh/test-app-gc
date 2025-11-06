"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/base/card"
import { Button } from "@/components/base/button"
import { cn } from "@/lib/utils"
import {
  User, Pencil, MapPin, BookOpen, Briefcase, Stars,
  Download, Camera, Image as ImageIcon, Settings, LogOut, Crown,
  Info, ExternalLink, Plus, X, Menu, ChevronLeft, ChevronRight
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

/* ------------------------------------------------------------- */
/* Modal Components                                               */
/* ------------------------------------------------------------- */

function PersonalModal({ profile, onSave, onClose }: { profile: ProfileData; onSave: (data: Partial<ProfileData>) => void; onClose: () => void }) {
  const [data, setData] = useState({
    fullName: profile.fullName || "",
    headline: profile.headline || "",
    location: profile.location || "",
    email: profile.email || "",
    linkedin: profile.linkedin || "",
  })

  const handleSave = () => {
    onSave(data)
    onClose()
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#1b4332] mb-1">Full Name</label>
        <input
          type="text"
          value={data.fullName}
          onChange={(e) => setData({ ...data, fullName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent"
          placeholder="Your full name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#1b4332] mb-1">Professional Headline</label>
        <input
          type="text"
          value={data.headline}
          onChange={(e) => setData({ ...data, headline: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent"
          placeholder="e.g. Software Engineer at Google"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#1b4332] mb-1">Location</label>
        <input
          type="text"
          value={data.location}
          onChange={(e) => setData({ ...data, location: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent"
          placeholder="City, Country"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#1b4332] mb-1">Email</label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent"
          placeholder="your.email@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#1b4332] mb-1">LinkedIn Profile</label>
        <input
          type="text"
          value={data.linkedin}
          onChange={(e) => setData({ ...data, linkedin: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent"
          placeholder="linkedin.com/in/yourprofile"
        />
      </div>
      <div className="flex gap-3 pt-4">
        <Button onClick={handleSave} className="flex-1 bg-[#1b4332] hover:bg-[#2d6a4f]">
          Save Changes
        </Button>
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  )
}function 
EducationModal({ profile, onSave, onClose }: { profile: ProfileData; onSave: (data: Partial<ProfileData>) => void; onClose: () => void }) {
  const [education, setEducation] = useState(profile.education || [])

  const addEducation = () => {
    setEducation([...education, { degree: "", institution: "", field: "", gpa: "" }])
  }

  const updateEducation = (index: number, field: string, value: string) => {
    const updated = [...education]
    updated[index] = { ...updated[index], [field]: value }
    setEducation(updated)
  }

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    onSave({ education: education.filter(ed => ed.degree || ed.institution) })
    onClose()
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {education.map((ed, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-[#1b4332]">Education {index + 1}</h4>
            <Button variant="ghost" size="sm" onClick={() => removeEducation(index)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={ed.degree}
              onChange={(e) => updateEducation(index, "degree", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent"
              placeholder="Degree"
            />
            <input
              type="text"
              value={ed.institution}
              onChange={(e) => updateEducation(index, "institution", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent"
              placeholder="Institution"
            />
            <input
              type="text"
              value={ed.field || ""}
              onChange={(e) => updateEducation(index, "field", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent"
              placeholder="Field of Study"
            />
            <input
              type="text"
              value={ed.gpa || ""}
              onChange={(e) => updateEducation(index, "gpa", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent"
              placeholder="GPA (optional)"
            />
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={addEducation} className="w-full gap-2">
        <Plus className="w-4 h-4" /> Add Education
      </Button>
      <div className="flex gap-3 pt-4">
        <Button onClick={handleSave} className="flex-1 bg-[#1b4332] hover:bg-[#2d6a4f]">
          Save Changes
        </Button>
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  )
}

function ExperienceModal({ profile, onSave, onClose }: { profile: ProfileData; onSave: (data: Partial<ProfileData>) => void; onClose: () => void }) {
  const [experience, setExperience] = useState(profile.experience || [])

  const addExperience = () => {
    setExperience([...experience, { company: "", role: "", duration: "", project: "" }])
  }

  const updateExperience = (index: number, field: string, value: string) => {
    const updated = [...experience]
    updated[index] = { ...updated[index], [field]: value }
    setExperience(updated)
  }

  const removeExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    onSave({ experience: experience.filter(ex => ex.company || ex.role) })
    onClose()
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {experience.map((ex, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-[#1b4332]">Experience {index + 1}</h4>
            <Button variant="ghost" size="sm" onClick={() => removeExperience(index)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={ex.role}
              onChange={(e) => updateExperience(index, "role", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent"
              placeholder="Job Title"
            />
            <input
              type="text"
              value={ex.company}
              onChange={(e) => updateExperience(index, "company", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent"
              placeholder="Company"
            />
          </div>
          <input
            type="text"
            value={ex.duration || ""}
            onChange={(e) => updateExperience(index, "duration", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent"
            placeholder="Duration (e.g. Jan 2023 - Present)"
          />
          <textarea
            value={ex.project || ""}
            onChange={(e) => updateExperience(index, "project", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent"
            placeholder="Key project or achievement"
            rows={2}
          />
        </div>
      ))}
      <Button variant="outline" onClick={addExperience} className="w-full gap-2">
        <Plus className="w-4 h-4" /> Add Experience
      </Button>
      <div className="flex gap-3 pt-4">
        <Button onClick={handleSave} className="flex-1 bg-[#1b4332] hover:bg-[#2d6a4f]">
          Save Changes
        </Button>
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  )
}

function SkillsModal({ profile, onSave, onClose }: { profile: ProfileData; onSave: (data: Partial<ProfileData>) => void; onClose: () => void }) {
  const [skillInput, setSkillInput] = useState("")
  const [skills, setSkills] = useState(profile.skills || [])

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()])
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  const handleSave = () => {
    onSave({ skills })
    onClose()
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#1b4332] mb-2">Add Skills</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addSkill()}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent"
            placeholder="e.g. JavaScript, React, Python"
          />
          <Button onClick={addSkill} size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {skills.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-[#1b4332] mb-2">Your Skills</label>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-[#e9f5ef] text-[#1b4332] rounded-full text-sm"
              >
                {skill}
                <button onClick={() => removeSkill(skill)} className="hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button onClick={handleSave} className="flex-1 bg-[#1b4332] hover:bg-[#2d6a4f]">
          Save Changes
        </Button>
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------- */
/* Page                                                          */
/* ------------------------------------------------------------- */

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE)
  const [modal, setModal] = useState<null | "personal" | "education" | "experience" | "skills">(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  /* Load Data */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("profile_data")
      if (saved) setProfile(JSON.parse(saved))
    } catch {
      setProfile(DEFAULT_PROFILE)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("profile_data", JSON.stringify(profile))
  }, [profile])

  const completion = useMemo(() => calcCompletion(profile), [profile])

  const savePartial = (partial: Partial<ProfileData>) =>
    setProfile((p) => ({ ...p, ...partial }))

  const downloadATSResume = () => {
    const blob = new Blob([`Name: ${profile.fullName}\nHeadline: ${profile.headline}\nSkills: ${profile.skills?.join(", ")}`], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "ats_resume.txt"
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
              {/* Desktop collapse button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex text-[#1b4332] hover:bg-[#1b4332]/10"
              >
                {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </Button>
              {/* Mobile close button */}
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
            <SidebarItem icon={<User />} label="Overview" active collapsed={sidebarCollapsed} />
            <SidebarItem 
              icon={<Briefcase />} 
              label="Resume & Skills" 
              collapsed={sidebarCollapsed}
              onClick={() => router.push("/user/resume")}
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

        {/* Main Section */}
        <section className="flex-1 w-full">
          {/* Banner */}
          <header className="relative h-40 sm:h-48 md:h-56 bg-gradient-to-r from-[#1b4332] to-[#40916c] overflow-hidden">
            {profile.bannerUrl && (
              <img src={profile.bannerUrl} alt="Banner" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay" />
            )}
            <div className="absolute bottom-3 right-3">
              <UploadButton
                label="Change Banner"
                icon={<ImageIcon className="w-4 h-4" />}
                onPick={(file) => savePartial({ bannerUrl: URL.createObjectURL(file) })}
              />
            </div>
          </header>

          {/* Profile Header */}
          <div className="px-3 sm:px-6 -mt-12 md:-mt-16 py-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Card className="relative mx-auto max-w-5xl p-6 md:p-8 bg-white/70 backdrop-blur-md rounded-2xl border border-[#dce2dc] shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
                {/* Avatar */}
                <div className="absolute -top-10 left-6">
                  <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl bg-white">
                    {profile.avatarUrl ? (
                      <img src={profile.avatarUrl} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full grid place-items-center text-[#1b4332]/40">
                        <User className="w-10 h-10" />
                      </div>
                    )}
                    <div className="absolute bottom-1 right-1">
                      <UploadButton
                        label="Change"
                        icon={<Camera className="w-4 h-4" />}
                        onPick={(file) => savePartial({ avatarUrl: URL.createObjectURL(file) })}
                        small
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-10 sm:pt-6 md:pt-4 py-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h1 className="py-5 text-2xl font-semibold text-[#1b4332] tracking-tight">{profile.fullName || "Your Name"}</h1>
                      <p className="text-[#2d6a4f] text-sm sm:text-base">{profile.headline || "Add a professional headline"}</p>
                      <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-600">
                        {profile.location && <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {profile.location}</span>}
                        {profile.linkedin && <span className="inline-flex items-center gap-1"><ExternalLink className="w-3.5 h-3.5" /> {profile.linkedin}</span>}
                        {profile.email && <span>{profile.email}</span>}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button className="gap-2 rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] transition-all duration-300 shadow hover:scale-[1.02]" onClick={downloadATSResume}>
                        <Download className="w-4 h-4" /> Download Resume
                      </Button>
                      <Button
                        variant="outline"
                        className="gap-2 rounded-full border-[#1b4332]/30 text-[#1b4332] hover:bg-[#1b4332]/5"
                        onClick={() => setModal("personal")}
                      >
                        <Pencil className="w-4 h-4" /> Edit
                      </Button>
                    </div>
                  </div>

                  {/* Profile Completion */}
                  <div className="mt-6">
                    <div className="flex justify-between mb-1">
                      <p className="text-sm font-medium text-[#1b4332]">Profile Completeness</p>
                      <p className="text-sm text-[#2d6a4f]">{completion}%</p>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#74c69d] to-[#1b4332] transition-all duration-500"
                        style={{ width: `${completion}%` }}
                      />
                    </div>
                    {completion < 100 && (
                      <p className="mt-2 text-xs text-gray-600">Complete your profile to boost discoverability and recommendations.</p>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Details Grid */}
          <div className="mx-auto max-w-5xl p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="p-5 border-[#dce2dc] bg-white/60 rounded-2xl backdrop-blur-sm">
                <SectionHeader icon={<BookOpen />} title="Education" onEdit={() => setModal("education")} />
                {profile.education?.length ? (
                  <div className="space-y-3 mt-2">
                    {profile.education.map((ed, i) => (
                      <div key={i} className="p-3 rounded-lg border bg-white/70">
                        <p className="font-medium text-[#1b4332]">{ed.degree || "Degree"} {ed.institution ? `— ${ed.institution}` : ""}</p>
                        <p className="text-sm text-gray-600">{ed.field && `Field: ${ed.field}`} {ed.gpa && `GPA: ${ed.gpa}`}</p>
                      </div>
                    ))}
                  </div>
                ) : <EmptyState text="Add your highest degree and certifications." />}
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="p-5 border-[#dce2dc] bg-white/60 rounded-2xl backdrop-blur-sm">
                <SectionHeader icon={<Stars />} title="Skills" onEdit={() => setModal("skills")} />
                {profile.skills?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {profile.skills.map((s, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-full bg-[#e9f5ef] text-[#1b4332] text-sm font-medium shadow-sm">{s}</span>
                    ))}
                  </div>
                ) : <EmptyState text="Add 5+ skills to improve your ATS visibility." />}
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="p-5 border-[#dce2dc] bg-white/60 rounded-2xl backdrop-blur-sm lg:col-span-3">
                <SectionHeader icon={<Briefcase />} title="Experience" onEdit={() => setModal("experience")} />
                {profile.experience?.length ? (
                  <div className="mt-2 grid md:grid-cols-2 gap-3">
                    {profile.experience.map((ex, i) => (
                      <div key={i} className="p-4 rounded-lg border bg-white/70">
                        <p className="font-medium text-[#1b4332]">{ex.role || "Role"} — {ex.company}</p>
                        <p className="text-sm text-gray-600">{ex.duration}</p>
                        {ex.project && <p className="text-sm mt-1"><span className="font-medium">Project:</span> {ex.project}</p>}
                      </div>
                    ))}
                  </div>
                ) : <EmptyState text="Add internships, freelance or full-time roles." />}
              </Card>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Modals */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-[#1b4332]">
                Edit {modal === "personal" ? "Personal Info" : modal.charAt(0).toUpperCase() + modal.slice(1)}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setModal(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-6">
              {modal === "personal" && <PersonalModal profile={profile} onSave={savePartial} onClose={() => setModal(null)} />}
              {modal === "education" && <EducationModal profile={profile} onSave={savePartial} onClose={() => setModal(null)} />}
              {modal === "experience" && <ExperienceModal profile={profile} onSave={savePartial} onClose={() => setModal(null)} />}
              {modal === "skills" && <SkillsModal profile={profile} onSave={savePartial} onClose={() => setModal(null)} />}
            </div>
          </div>
        </div>
      )}
    </main>
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
      
      {/* Tooltip for collapsed state */}
      {collapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </div>
  )
}

function SectionHeader({ icon, title, onEdit }: { icon: React.ReactNode; title: string; onEdit?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 grid place-items-center rounded-lg bg-[#1b4332] text-white">{icon}</div>
        <h3 className="text-lg font-semibold text-[#1b4332]">{title}</h3>
      </div>
      {onEdit && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="text-[#1b4332] hover:bg-[#1b4332]/10"
        >
          <Pencil className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-gray-500 text-sm bg-gray-50 border border-dashed border-gray-200 rounded-lg p-3">
      <Info className="w-4 h-4 text-[#1b4332]/70" /> {text}
    </div>
  )
}

function UploadButton({ label, icon, onPick, small = false }: { label: string; icon: React.ReactNode; onPick: (file: File) => void; small?: boolean }) {
  const ref = useRef<HTMLInputElement | null>(null)
  return (
    <>
      <Button
        size={small ? "sm" : "default"}
        variant="secondary"
        className={cn(
          "gap-2 bg-white/80 text-[#1b4332] hover:bg-white rounded-full border border-[#1b4332]/10 shadow-sm transition-all",
          small ? "h-8 px-3 text-xs" : ""
        )}
        onClick={() => ref.current?.click()}
      >
        {icon} {label}
      </Button>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onPick(e.target.files[0])} />
    </>
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