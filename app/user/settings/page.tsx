"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/base/card"
import { Button } from "@/components/base/button"
import { cn } from "@/lib/utils"
import {
  User, Settings, LogOut, Crown, Menu, ChevronLeft, ChevronRight,
  X, Shield, Bell, Eye, Trash2, Key, Mail, Phone, Globe,
  Download, Upload, AlertTriangle, Check, Briefcase
} from "lucide-react"
import { motion } from "framer-motion"

/* ------------------------------------------------------------- */
/* Types                                                         */
/* ------------------------------------------------------------- */

type AccountSettings = {
  email: string
  phone: string
  notifications: {
    email: boolean
    push: boolean
    marketing: boolean
  }
  privacy: {
    profileVisible: boolean
    showEmail: boolean
    showPhone: boolean
  }
  security: {
    twoFactor: boolean
    lastPasswordChange: string
  }
}

const DEFAULT_SETTINGS: AccountSettings = {
  email: "",
  phone: "",
  notifications: {
    email: true,
    push: true,
    marketing: false
  },
  privacy: {
    profileVisible: true,
    showEmail: false,
    showPhone: false
  },
  security: {
    twoFactor: false,
    lastPasswordChange: "Never"
  }
}

/* ------------------------------------------------------------- */
/* Page                                                          */
/* ------------------------------------------------------------- */

export default function AccountSettingsPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [settings, setSettings] = useState<AccountSettings>(DEFAULT_SETTINGS)
  const [activeSection, setActiveSection] = useState<"account" | "notifications" | "privacy" | "security" | "data">("account")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  /* Load Settings */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("account_settings")
      if (saved) setSettings(JSON.parse(saved))
    } catch {
      setSettings(DEFAULT_SETTINGS)
    }
  }, [])

  const saveSettings = (newSettings: Partial<AccountSettings>) => {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)
    localStorage.setItem("account_settings", JSON.stringify(updated))
  }

  const exportData = () => {
    const profileData = localStorage.getItem("profile_data")
    const accountData = localStorage.getItem("account_settings")
    
    const exportData = {
      profile: profileData ? JSON.parse(profileData) : {},
      settings: accountData ? JSON.parse(accountData) : {},
      exportDate: new Date().toISOString()
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "growth-charter-data.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const deleteAccount = () => {
    localStorage.clear()
    router.push("/")
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
              collapsed={sidebarCollapsed}
              onClick={() => router.push("/user/resume")}
            />
            <SidebarItem 
              icon={<Settings />} 
              label="Account Settings" 
              active 
              collapsed={sidebarCollapsed}
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
              <h1 className="text-3xl font-bold text-[#1b4332] mb-2">Account Settings</h1>
              <p className="text-[#4f6f56]">Manage your account preferences and security settings</p>
            </div>

            {/* Settings Navigation - Horizontal */}
            <div className="mb-8">
              <nav className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-lg w-fit">
                <SettingsNavItem
                  icon={<User />}
                  label="Account"
                  active={activeSection === "account"}
                  onClick={() => setActiveSection("account")}
                />
                <SettingsNavItem
                  icon={<Bell />}
                  label="Notifications"
                  active={activeSection === "notifications"}
                  onClick={() => setActiveSection("notifications")}
                />
                <SettingsNavItem
                  icon={<Eye />}
                  label="Privacy"
                  active={activeSection === "privacy"}
                  onClick={() => setActiveSection("privacy")}
                />
                <SettingsNavItem
                  icon={<Shield />}
                  label="Security"
                  active={activeSection === "security"}
                  onClick={() => setActiveSection("security")}
                />
                <SettingsNavItem
                  icon={<Download />}
                  label="Data & Export"
                  active={activeSection === "data"}
                  onClick={() => setActiveSection("data")}
                />
              </nav>
            </div>

            {/* Settings Content */}
            <div>
              {activeSection === "account" && <AccountSection settings={settings} onSave={saveSettings} />}
              {activeSection === "notifications" && <NotificationsSection settings={settings} onSave={saveSettings} />}
              {activeSection === "privacy" && <PrivacySection settings={settings} onSave={saveSettings} />}
              {activeSection === "security" && <SecuritySection settings={settings} onSave={saveSettings} />}
              {activeSection === "data" && <DataSection onExport={exportData} onDelete={() => setShowDeleteConfirm(true)} />}
            </div>
          </div>
        </section>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-md p-6 bg-white">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-semibold text-red-600">Delete Account</h2>
            </div>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={deleteAccount}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Delete Account
              </Button>
            </div>
          </Card>
        </div>
      )}
    </main>
  )
}

/* ------------------------------------------------------------- */
/* Settings Sections                                             */
/* ------------------------------------------------------------- */

function AccountSection({ settings, onSave }: { settings: AccountSettings; onSave: (settings: Partial<AccountSettings>) => void }) {
  const [email, setEmail] = useState(settings.email)
  const [phone, setPhone] = useState(settings.phone)

  const handleSave = () => {
    onSave({ email, phone })
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-[#1b4332] mb-6">Account Information</h2>
      
      <Card className="p-6 bg-white border-[#dce2dc] mb-6">
        <h3 className="text-lg font-semibold text-[#1b4332] mb-4">Contact Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1b4332] mb-2">Email Address</label>
            <div className="flex gap-2">
              <Mail className="w-5 h-5 text-gray-400 mt-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1b4332] mb-2">Phone Number</label>
            <div className="flex gap-2">
              <Phone className="w-5 h-5 text-gray-400 mt-2" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b4332] focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
          <Button onClick={handleSave} className="bg-[#1b4332] hover:bg-[#2d6a4f]">
            Save Changes
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-white border-[#dce2dc]">
        <h3 className="text-lg font-semibold text-[#1b4332] mb-4">Account Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Account Type</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Free</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Member Since</span>
            <span className="text-sm text-gray-600">November 2024</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Profile Completion</span>
            <span className="text-sm text-gray-600">75%</span>
          </div>
        </div>
      </Card>
    </div>
  )
}

function NotificationsSection({ settings, onSave }: { settings: AccountSettings; onSave: (settings: Partial<AccountSettings>) => void }) {
  const updateNotification = (key: keyof AccountSettings["notifications"], value: boolean) => {
    onSave({
      notifications: {
        ...settings.notifications,
        [key]: value
      }
    })
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-[#1b4332] mb-6">Notification Preferences</h2>
      
      <Card className="p-6 bg-white border-[#dce2dc]">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-[#1b4332]">Email Notifications</h3>
              <p className="text-sm text-gray-600">Receive updates about your profile and applications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => updateNotification("email", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1b4332]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1b4332]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-[#1b4332]">Push Notifications</h3>
              <p className="text-sm text-gray-600">Get notified about important updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) => updateNotification("push", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1b4332]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1b4332]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-[#1b4332]">Marketing Communications</h3>
              <p className="text-sm text-gray-600">Receive tips, news, and product updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.marketing}
                onChange={(e) => updateNotification("marketing", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1b4332]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1b4332]"></div>
            </label>
          </div>
        </div>
      </Card>
    </div>
  )
}

function PrivacySection({ settings, onSave }: { settings: AccountSettings; onSave: (settings: Partial<AccountSettings>) => void }) {
  const updatePrivacy = (key: keyof AccountSettings["privacy"], value: boolean) => {
    onSave({
      privacy: {
        ...settings.privacy,
        [key]: value
      }
    })
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-[#1b4332] mb-6">Privacy Settings</h2>
      
      <Card className="p-6 bg-white border-[#dce2dc]">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-[#1b4332]">Profile Visibility</h3>
              <p className="text-sm text-gray-600">Make your profile visible to recruiters and employers</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.profileVisible}
                onChange={(e) => updatePrivacy("profileVisible", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1b4332]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1b4332]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-[#1b4332]">Show Email Address</h3>
              <p className="text-sm text-gray-600">Display your email on your public profile</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.showEmail}
                onChange={(e) => updatePrivacy("showEmail", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1b4332]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1b4332]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-[#1b4332]">Show Phone Number</h3>
              <p className="text-sm text-gray-600">Display your phone number on your public profile</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.showPhone}
                onChange={(e) => updatePrivacy("showPhone", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1b4332]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1b4332]"></div>
            </label>
          </div>
        </div>
      </Card>
    </div>
  )
}

function SecuritySection({ settings, onSave }: { settings: AccountSettings; onSave: (settings: Partial<AccountSettings>) => void }) {
  const toggleTwoFactor = () => {
    onSave({
      security: {
        ...settings.security,
        twoFactor: !settings.security.twoFactor
      }
    })
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-[#1b4332] mb-6">Security Settings</h2>
      
      <div className="space-y-6">
        <Card className="p-6 bg-white border-[#dce2dc]">
          <h3 className="text-lg font-semibold text-[#1b4332] mb-4">Password</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-gray-600">Last changed: {settings.security.lastPasswordChange}</p>
              </div>
              <Button variant="outline" className="border-[#1b4332]/30 text-[#1b4332]">
                <Key className="w-4 h-4 mr-2" />
                Change
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border-[#dce2dc]">
          <h3 className="text-lg font-semibold text-[#1b4332] mb-4">Two-Factor Authentication</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enable 2FA</p>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <div className="flex items-center gap-3">
              {settings.security.twoFactor && (
                <span className="flex items-center gap-1 text-green-600 text-sm">
                  <Check className="w-4 h-4" />
                  Enabled
                </span>
              )}
              <Button 
                onClick={toggleTwoFactor}
                variant={settings.security.twoFactor ? "outline" : "default"}
                className={settings.security.twoFactor ? "border-[#1b4332]/30 text-[#1b4332]" : "bg-[#1b4332] hover:bg-[#2d6a4f]"}
              >
                {settings.security.twoFactor ? "Disable" : "Enable"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

function DataSection({ onExport, onDelete }: { onExport: () => void; onDelete: () => void }) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-[#1b4332] mb-6">Data & Export</h2>
      
      <div className="space-y-6">
        <Card className="p-6 bg-white border-[#dce2dc]">
          <h3 className="text-lg font-semibold text-[#1b4332] mb-4">Export Your Data</h3>
          <p className="text-gray-600 mb-4">
            Download a copy of all your data including profile information, resume, and settings.
          </p>
          <Button onClick={onExport} className="gap-2 bg-[#1b4332] hover:bg-[#2d6a4f]">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
        </Card>

        <Card className="p-6 bg-white border-red-200">
          <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Delete Account</h4>
              <p className="text-gray-600 mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button 
                onClick={onDelete}
                variant="outline" 
                className="gap-2 border-red-300 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
                Delete Account
              </Button>
            </div>
          </div>
        </Card>
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

function SettingsNavItem({ icon, label, active = false, onClick }: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap",
        active
          ? "bg-white text-[#1b4332] shadow-sm"
          : "text-gray-600 hover:text-[#1b4332] hover:bg-white/50"
      )}
      onClick={onClick}
    >
      <div className="h-4 w-4 grid place-items-center">{icon}</div>
      {label}
    </button>
  )
}