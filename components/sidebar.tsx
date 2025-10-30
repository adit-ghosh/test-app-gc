"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  X,
  Home,
  Zap,
  TrendingUp,
  Compass,
  Briefcase,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface SidebarProps {
  open: boolean
  onToggle: () => void
}

export function Sidebar({ open, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/gc-score", label: "GC Score", icon: Zap },
    { href: "/ai-suggestions", label: "AI Suggestions", icon: TrendingUp },
    { href: "/career-diversion", label: "Career Diversion", icon: Compass },
    { href: "/career-roadmap", label: "Career Roadmap", icon: Briefcase },
    { href: "/company-matches", label: "Company Matches", icon: Users },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onToggle} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:relative w-64 h-screen bg-card border-r border-border flex flex-col transition-all duration-300 z-50 md:z-0",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          isCollapsed && "md:w-20",
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold text-sm">GC</span>
            </div>
            {!isCollapsed && (
              <span className="font-semibold text-foreground hidden md:inline whitespace-nowrap">Growth Charter</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex p-1 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
            <button onClick={onToggle} className="md:hidden p-1 hover:bg-muted rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap",
                  isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted",
                  isCollapsed && "md:justify-center md:px-2",
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="font-medium hidden md:inline">{item.label}</span>}
                <span className="font-medium md:hidden">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Link href="/login">

            <button
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors",
                isCollapsed && "md:justify-center md:px-2",
              )}
              title={isCollapsed ? "Logout" : undefined}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium hidden md:inline">{!isCollapsed && "Logout"}</span>
              <span className="font-medium md:hidden">Logout</span>
            </button>
          </Link>
        </div>
      </aside>
    </>
  )
}
