"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/base/button"
import { User, Building2, ArrowRight, Apple, ArrowLeft } from "lucide-react"

type LoginStep = "selection" | "individual" | "organization"

export default function LoginPage() {
  const [currentStep, setCurrentStep] = useState<LoginStep>("selection")
  const [email, setEmail] = useState("")
  const router = useRouter()

  const socialProviders = [
    { name: "Google", icon: "G", color: "hover:bg-red-50 hover:border-red-200" },
    { name: "Microsoft", icon: "M", color: "hover:bg-blue-50 hover:border-blue-200" },
    { name: "Apple", icon: <Apple className="w-4 h-4" />, color: "hover:bg-gray-50 hover:border-gray-200" }
  ]

  const SocialButton = ({ name, icon, color }: { name: string; icon: any; color: string }) => (
    <button className={`flex items-center justify-center gap-2 w-full p-3 border border-border rounded-lg transition-all ${color}`}>
      {typeof icon === "string" ? <span className="font-bold">{icon}</span> : icon}
      <span className="text-sm font-medium">{name}</span>
    </button>
  )

  const handleEmailSignup = () => {
    if (email) {
      router.push(`/dashboard?email=${encodeURIComponent(email)}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl bg-background rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Account Type Selection */}
        {currentStep === "selection" && (
          <div className="flex h-[600px] transition-all duration-700 ease-in-out">
            {/* Individual Option */}
            <div className="w-1/2 p-12 flex flex-col justify-center items-center text-center border-r border-border">
              <User className="w-20 h-20 text-primary mb-6" />
              <h2 className="text-3xl font-bold text-primary mb-4">Individual</h2>
              <p className="text-muted-foreground mb-8 max-w-sm">
                Track your personal career growth, get AI recommendations, and unlock new opportunities
              </p>
              <Button 
                onClick={() => setCurrentStep("individual")}
                className="w-full max-w-xs rounded-full px-8 py-3"
              >
                Continue as Individual
              </Button>
            </div>

            {/* Organization Option */}
            <div className="w-1/2 p-12 flex flex-col justify-center items-center text-center">
              <Building2 className="w-20 h-20 text-muted-foreground mb-6" />
              <h2 className="text-3xl font-bold text-muted-foreground mb-4">Organization</h2>
              <p className="text-muted-foreground mb-8 max-w-sm">
                Manage teams, track progress, and scale growth across your organization
              </p>
              <Button 
                onClick={() => setCurrentStep("organization")}
                variant="outline"
                className="w-full max-w-xs rounded-full px-8 py-3"
              >
                Continue as Organization
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                Coming soon! We're focusing on individual growth first.
              </p>
            </div>
          </div>
        )}

        {/* Individual Signup Flow */}
        {currentStep === "individual" && (
          <div className="h-[600px] flex transition-all duration-700 ease-in-out">
            {/* Left Side - Branding */}
            <div className="w-1/2 bg-gradient-to-br from-primary to-primary/80 p-12 flex flex-col justify-center text-primary-foreground">
              <User className="w-16 h-16 mb-6" />
              <h1 className="text-4xl font-bold mb-4">Growth Charter</h1>
              <p className="text-lg opacity-90 mb-8">
                Your personal career growth companion. Track progress, get AI insights, and unlock opportunities.
              </p>
              <div className="space-y-3 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                  <span>AI-powered career recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                  <span>Skill tracking and development</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                  <span>Personalized growth insights</span>
                </div>
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="w-1/2 p-12 flex flex-col justify-center">
              <button 
                onClick={() => setCurrentStep("selection")}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to selection
              </button>

              <h2 className="text-2xl font-bold text-foreground mb-2">Join Growth Charter</h2>
              <p className="text-muted-foreground mb-8">Sign up to get started</p>

              {/* Email Signup */}
              <div className="space-y-4 mb-6">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleEmailSignup()}
                    className="flex-1 p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  />
                  <Button onClick={handleEmailSignup} className="px-4">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              {/* Social Signup */}
              <div className="space-y-3 mb-6">
                {socialProviders.map((provider) => (
                  <SocialButton key={provider.name} {...provider} />
                ))}
              </div>

              {/* Onboarding Options */}
              <div className="space-y-3 pt-4 border-t border-border">
                <p className="text-center text-sm font-medium text-foreground">Or start with onboarding</p>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => router.push("/login/individual/signup/manual-onboarding")}
                    variant="outline"
                    className="text-sm"
                  >
                    Manual Setup
                  </Button>
                  <Button
                    onClick={() => router.push("#")}
                    variant="outline"
                    className="text-sm"
                  >
                    Upload Resume
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Organization Coming Soon */}
        {currentStep === "organization" && (
          <div className="h-[600px] flex items-center justify-center transition-all duration-700 ease-in-out">
            <div className="text-center max-w-md">
              <button 
                onClick={() => setCurrentStep("selection")}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors mx-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to selection
              </button>
              
              <Building2 className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Organization Features</h2>
              <p className="text-muted-foreground mb-8">
                We're building powerful organization management tools. Stay tuned for team analytics, 
                bulk onboarding, and enterprise-grade growth tracking.
              </p>
              
              <div className="space-y-4">
                <Button 
                  onClick={() => setCurrentStep("individual")}
                  className="w-full"
                >
                  Try Individual Account Instead
                </Button>
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => console.log("Notify when ready")}
                >
                  Notify Me When Ready
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
