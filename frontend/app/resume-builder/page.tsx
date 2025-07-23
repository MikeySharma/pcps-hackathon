"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { User, GraduationCap, Briefcase, Award, Download, Eye, Plus, Trash2, Phone, Mail, MapPin } from "lucide-react"

export default function ResumeBuilderPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPreview, setShowPreview] = useState(false)

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
  })

  const [education, setEducation] = useState([
    {
      degree: "",
      institution: "",
      year: "",
      grade: "",
    },
  ])

  const [experience, setExperience] = useState([
    {
      position: "",
      company: "",
      duration: "",
      description: "",
    },
  ])

  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")

  const steps = [
    { id: 1, title: "Personal Info", icon: <User className="h-4 w-4" /> },
    { id: 2, title: "Education", icon: <GraduationCap className="h-4 w-4" /> },
    { id: 3, title: "Experience", icon: <Briefcase className="h-4 w-4" /> },
    { id: 4, title: "Skills", icon: <Award className="h-4 w-4" /> },
  ]

  const addEducation = () => {
    setEducation([...education, { degree: "", institution: "", year: "", grade: "" }])
  }

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index))
  }

  const addExperience = () => {
    setExperience([...experience, { position: "", company: "", duration: "", description: "" }])
  }

  const removeExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index))
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={personalInfo.fullName}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  placeholder="+977-9800000000"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={personalInfo.address}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                  placeholder="City, District"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                value={personalInfo.summary}
                onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                placeholder="Brief description of your career goals and key strengths..."
                rows={4}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            {education.map((edu, index) => (
              <Card key={index}>
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Education {index + 1}</CardTitle>
                    {education.length > 1 && (
                      <Button variant="outline" size="sm" onClick={() => removeEducation(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Degree/Level *</Label>
                      <Select
                        value={edu.degree}
                        onValueChange={(value) => {
                          const newEducation = [...education]
                          newEducation[index].degree = value
                          setEducation(newEducation)
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select degree" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="slc">SLC/SEE</SelectItem>
                          <SelectItem value="plus2">+2/Intermediate</SelectItem>
                          <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                          <SelectItem value="master">Master's Degree</SelectItem>
                          <SelectItem value="diploma">Diploma</SelectItem>
                          <SelectItem value="certificate">Certificate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Institution *</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => {
                          const newEducation = [...education]
                          newEducation[index].institution = e.target.value
                          setEducation(newEducation)
                        }}
                        placeholder="School/College name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Year of Completion</Label>
                      <Input
                        value={edu.year}
                        onChange={(e) => {
                          const newEducation = [...education]
                          newEducation[index].year = e.target.value
                          setEducation(newEducation)
                        }}
                        placeholder="2023"
                      />
                    </div>
                    <div>
                      <Label>Grade/Percentage</Label>
                      <Input
                        value={edu.grade}
                        onChange={(e) => {
                          const newEducation = [...education]
                          newEducation[index].grade = e.target.value
                          setEducation(newEducation)
                        }}
                        placeholder="A+ or 85%"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button variant="outline" onClick={addEducation} className="w-full bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Education
            </Button>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <Card key={index}>
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Experience {index + 1}</CardTitle>
                    {experience.length > 1 && (
                      <Button variant="outline" size="sm" onClick={() => removeExperience(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Job Title/Position</Label>
                      <Input
                        value={exp.position}
                        onChange={(e) => {
                          const newExperience = [...experience]
                          newExperience[index].position = e.target.value
                          setExperience(newExperience)
                        }}
                        placeholder="e.g., Sales Assistant"
                      />
                    </div>
                    <div>
                      <Label>Company/Organization</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => {
                          const newExperience = [...experience]
                          newExperience[index].company = e.target.value
                          setExperience(newExperience)
                        }}
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Duration</Label>
                    <Input
                      value={exp.duration}
                      onChange={(e) => {
                        const newExperience = [...experience]
                        newExperience[index].duration = e.target.value
                        setExperience(newExperience)
                      }}
                      placeholder="Jan 2023 - Present"
                    />
                  </div>

                  <div>
                    <Label>Job Description</Label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => {
                        const newExperience = [...experience]
                        newExperience[index].description = e.target.value
                        setExperience(newExperience)
                      }}
                      placeholder="Describe your responsibilities and achievements..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button variant="outline" onClick={addExperience} className="w-full bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Experience
            </Button>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label>Add Skills</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Enter a skill"
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                />
                <Button onClick={addSkill}>Add</Button>
              </div>
            </div>

            <div>
              <Label>Your Skills</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="ml-2 hover:text-destructive">
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              {skills.length === 0 && (
                <p className="text-muted-foreground text-sm mt-2">
                  No skills added yet. Add some skills to make your resume stand out!
                </p>
              )}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Suggested Skills</CardTitle>
                <CardDescription>Click to add popular skills for your field</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Microsoft Office",
                    "Communication",
                    "Customer Service",
                    "Time Management",
                    "Teamwork",
                    "Problem Solving",
                    "English",
                    "Nepali",
                    "Hindi",
                    "Social Media",
                    "Basic Computer",
                    "Data Entry",
                  ].map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => !skills.includes(skill) && setSkills([...skills, skill])}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  const ResumePreview = () => (
    <div className="bg-white text-black p-8 max-w-2xl mx-auto shadow-lg">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-2xl font-bold">{personalInfo.fullName || "Your Name"}</h1>
        <div className="flex justify-center items-center gap-4 mt-2 text-sm text-gray-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.address && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {personalInfo.address}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 mb-2">PROFESSIONAL SUMMARY</h2>
          <p className="text-sm text-gray-700">{personalInfo.summary}</p>
        </div>
      )}

      {/* Education */}
      {education.some((edu) => edu.degree || edu.institution) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 mb-2">EDUCATION</h2>
          {education.map(
            (edu, index) =>
              (edu.degree || edu.institution) && (
                <div key={index} className="mb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{edu.degree}</h3>
                      <p className="text-sm text-gray-600">{edu.institution}</p>
                    </div>
                    <div className="text-right text-sm">
                      {edu.year && <p>{edu.year}</p>}
                      {edu.grade && <p className="text-gray-600">{edu.grade}</p>}
                    </div>
                  </div>
                </div>
              ),
          )}
        </div>
      )}

      {/* Experience */}
      {experience.some((exp) => exp.position || exp.company) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 mb-2">WORK EXPERIENCE</h2>
          {experience.map(
            (exp, index) =>
              (exp.position || exp.company) && (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-medium">{exp.position}</h3>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                    </div>
                    {exp.duration && <p className="text-sm text-gray-600">{exp.duration}</p>}
                  </div>
                  {exp.description && <p className="text-sm text-gray-700 mt-1">{exp.description}</p>}
                </div>
              ),
          )}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 mb-2">SKILLS</h2>
          <div className="flex flex-wrap gap-1">
            {skills.map((skill, index) => (
              <span key={index} className="text-sm bg-gray-100 px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Resume Builder</h1>
          <p className="text-muted-foreground">Create a professional resume tailored for the Nepali job market</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            {/* Step Navigation */}
            <div className="flex justify-between mb-8">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                    currentStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : currentStep > step.id
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-muted text-muted-foreground"
                  }`}
                  onClick={() => setCurrentStep(step.id)}
                >
                  {step.icon}
                  <span className="text-sm font-medium hidden sm:block">{step.title}</span>
                </div>
              ))}
            </div>

            {/* Form Content */}
            <Card>
              <CardHeader>
                <CardTitle>{steps[currentStep - 1].title}</CardTitle>
                <CardDescription>
                  Step {currentStep} of {steps.length}
                </CardDescription>
              </CardHeader>
              <CardContent>{renderStepContent()}</CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
                  <Eye className="h-4 w-4 mr-2" />
                  {showPreview ? "Hide" : "Show"} Preview
                </Button>

                {currentStep < steps.length ? (
                  <Button onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}>Next</Button>
                ) : (
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className={`${showPreview ? "block" : "hidden lg:block"}`}>
            <div className="sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
              <div className="border rounded-lg overflow-hidden bg-white">
                <ResumePreview />
              </div>

              {/* Template Selection */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Choose Template</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" className="h-16 bg-transparent">
                      Classic
                    </Button>
                    <Button variant="outline" size="sm" className="h-16 bg-transparent">
                      Modern
                    </Button>
                    <Button variant="outline" size="sm" className="h-16 bg-transparent">
                      Creative
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
