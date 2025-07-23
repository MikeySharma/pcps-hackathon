"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Globe, User, Heart } from "lucide-react"
import Link from "next/link"

export default function OnboardingPage() {
  const [language, setLanguage] = useState("english")
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    education: "",
  })
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const interests = [
    "Technology",
    "Healthcare",
    "Education",
    "Business",
    "Agriculture",
    "Tourism",
    "Construction",
    "Manufacturing",
    "Finance",
    "Arts & Design",
    "Transportation",
    "Food Service",
    "Retail",
    "Government",
    "NGO Work",
  ]

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto max-w-2xl px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to KaamSathi!</h1>
          <p className="text-muted-foreground">Let's get to know you better to provide personalized career guidance</p>
        </div>

        <div className="space-y-6">
          {/* Language Selector */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Choose Your Language / भाषा छान्नुहोस्
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={language === "english" ? "default" : "outline"}
                  onClick={() => setLanguage("english")}
                  className="h-12"
                >
                  English
                </Button>
                <Button
                  variant={language === "nepali" ? "default" : "outline"}
                  onClick={() => setLanguage("nepali")}
                  className="h-12"
                >
                  नेपाली
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Tell us about yourself</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Your age"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Select onValueChange={(value) => handleInputChange("location", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kathmandu">Kathmandu</SelectItem>
                      <SelectItem value="pokhara">Pokhara</SelectItem>
                      <SelectItem value="chitwan">Chitwan</SelectItem>
                      <SelectItem value="lalitpur">Lalitpur</SelectItem>
                      <SelectItem value="bhaktapur">Bhaktapur</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="education">Education Level</Label>
                <Select onValueChange={(value) => handleInputChange("education", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slc">SLC/SEE</SelectItem>
                    <SelectItem value="plus2">+2/Intermediate</SelectItem>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="other">Other/No formal education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Interests Selector */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Your Interests
              </CardTitle>
              <CardDescription>Select areas you're interested in (choose multiple)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <Badge
                    key={interest}
                    variant={selectedInterests.includes(interest) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/80"
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">Selected: {selectedInterests.length} interests</p>
            </CardContent>
          </Card>

          {/* Continue Button */}
          <div className="flex justify-center pt-4">
            <Link href="/dashboard">
              <Button size="lg" className="px-8">
                Continue to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
