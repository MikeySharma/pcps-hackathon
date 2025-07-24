"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Eye, Plus, X, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface ResumeData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    linkedin: string
    website: string
  }
  summary: string
  experience: Array<{
    id: string
    title: string
    company: string
    location: string
    startDate: string
    endDate: string
    description: string
  }>
  education: Array<{
    id: string
    degree: string
    institution: string
    location: string
    graduationDate: string
    gpa: string
  }>
  skills: string[]
  languages: string[]
}

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState("personal")
  const [resumeStyle, setResumeStyle] = useState("modern")
  const [newSkill, setNewSkill] = useState("")
  const [newLanguage, setNewLanguage] = useState("")

  const defaultResumeData: ResumeData = {
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    languages: [],
  };

  function getInitialResumeData(): ResumeData {
    try {
      const data = localStorage.getItem("resumeData");
      if (data) {
        return JSON.parse(data) as ResumeData;
      }
    } catch (err) {
      console.error("Failed to parse resume data from localStorage", err);
    }
    return defaultResumeData;
  }

  const [resumeData, setResumeData] = useState<ResumeData>(getInitialResumeData());


  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }))
  }

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      location: "",
      graduationDate: "",
      gpa: "",
    }
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }))
  }

  const addSkill = () => {
    if (newSkill.trim()) {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const addLanguage = () => {
    if (newLanguage.trim()) {
      setResumeData((prev) => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()],
      }))
      setNewLanguage("")
    }
  }

  const removeSkill = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  const removeLanguage = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }))
  }

  const tabs = [
    { id: "personal", label: "Personal Info" },
    { id: "summary", label: "Summary" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Builder</h1>
          <p className="text-gray-600">Create a professional resume with AI-powered suggestions</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Style Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Resume Style</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={resumeStyle} onValueChange={setResumeStyle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Navigation Tabs */}
            <Card>
              <CardContent className="p-0">
                <div className="flex flex-wrap border-b border-gray-200">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                        ? "border-gray-800 text-gray-800"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="p-6">
                  {/* Personal Info Tab */}
                  {activeTab === "personal" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            value={resumeData.personalInfo.fullName}
                            onChange={(e) =>
                              setResumeData((prev) => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, fullName: e.target.value },
                              }))
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={resumeData.personalInfo.email}
                            onChange={(e) =>
                              setResumeData((prev) => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, email: e.target.value },
                              }))
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={resumeData.personalInfo.phone}
                            onChange={(e) =>
                              setResumeData((prev) => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, phone: e.target.value },
                              }))
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={resumeData.personalInfo.location}
                            onChange={(e) =>
                              setResumeData((prev) => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, location: e.target.value },
                              }))
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input
                            id="linkedin"
                            value={resumeData.personalInfo.linkedin}
                            onChange={(e) =>
                              setResumeData((prev) => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, linkedin: e.target.value },
                              }))
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            value={resumeData.personalInfo.website}
                            onChange={(e) =>
                              setResumeData((prev) => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, website: e.target.value },
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Summary Tab */}
                  {activeTab === "summary" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="summary">Professional Summary</Label>
                        <Textarea
                          id="summary"
                          rows={6}
                          placeholder="Write a brief summary of your professional background and career objectives..."
                          value={resumeData.summary}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              summary: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Get AI Suggestions
                      </Button>
                    </div>
                  )}

                  {/* Experience Tab */}
                  {activeTab === "experience" && (
                    <div className="space-y-4">
                      {resumeData.experience.map((exp, index) => (
                        <Card key={exp.id} className="border-gray-200">
                          <CardContent className="pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <Label>Job Title</Label>
                                <Input
                                  value={exp.title}
                                  onChange={(e) => {
                                    const newExp = [...resumeData.experience]
                                    newExp[index].title = e.target.value
                                    setResumeData((prev) => ({ ...prev, experience: newExp }))
                                  }}
                                />
                              </div>
                              <div>
                                <Label>Company</Label>
                                <Input
                                  value={exp.company}
                                  onChange={(e) => {
                                    const newExp = [...resumeData.experience]
                                    newExp[index].company = e.target.value
                                    setResumeData((prev) => ({ ...prev, experience: newExp }))
                                  }}
                                />
                              </div>
                              <div>
                                <Label>Location</Label>
                                <Input
                                  value={exp.location}
                                  onChange={(e) => {
                                    const newExp = [...resumeData.experience]
                                    newExp[index].location = e.target.value
                                    setResumeData((prev) => ({ ...prev, experience: newExp }))
                                  }}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <Label>Start Date</Label>
                                  <Input
                                    type="month"
                                    value={exp.startDate}
                                    onChange={(e) => {
                                      const newExp = [...resumeData.experience]
                                      newExp[index].startDate = e.target.value
                                      setResumeData((prev) => ({ ...prev, experience: newExp }))
                                    }}
                                  />
                                </div>
                                <div>
                                  <Label>End Date</Label>
                                  <Input
                                    type="month"
                                    value={exp.endDate}
                                    onChange={(e) => {
                                      const newExp = [...resumeData.experience]
                                      newExp[index].endDate = e.target.value
                                      setResumeData((prev) => ({ ...prev, experience: newExp }))
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <Label>Description</Label>
                              <Textarea
                                rows={4}
                                value={exp.description}
                                onChange={(e) => {
                                  const newExp = [...resumeData.experience]
                                  newExp[index].description = e.target.value
                                  setResumeData((prev) => ({ ...prev, experience: newExp }))
                                }}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <Button onClick={addExperience} variant="outline" className="w-full bg-transparent">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                  )}

                  {/* Education Tab */}
                  {activeTab === "education" && (
                    <div className="space-y-4">
                      {resumeData.education.map((edu, index) => (
                        <Card key={edu.id} className="border-gray-200">
                          <CardContent className="pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label>Degree</Label>
                                <Input
                                  value={edu.degree}
                                  onChange={(e) => {
                                    const newEdu = [...resumeData.education]
                                    newEdu[index].degree = e.target.value
                                    setResumeData((prev) => ({ ...prev, education: newEdu }))
                                  }}
                                />
                              </div>
                              <div>
                                <Label>Institution</Label>
                                <Input
                                  value={edu.institution}
                                  onChange={(e) => {
                                    const newEdu = [...resumeData.education]
                                    newEdu[index].institution = e.target.value
                                    setResumeData((prev) => ({ ...prev, education: newEdu }))
                                  }}
                                />
                              </div>
                              <div>
                                <Label>Location</Label>
                                <Input
                                  value={edu.location}
                                  onChange={(e) => {
                                    const newEdu = [...resumeData.education]
                                    newEdu[index].location = e.target.value
                                    setResumeData((prev) => ({ ...prev, education: newEdu }))
                                  }}
                                />
                              </div>
                              <div>
                                <Label>Graduation Date</Label>
                                <Input
                                  type="month"
                                  value={edu.graduationDate}
                                  onChange={(e) => {
                                    const newEdu = [...resumeData.education]
                                    newEdu[index].graduationDate = e.target.value
                                    setResumeData((prev) => ({ ...prev, education: newEdu }))
                                  }}
                                />
                              </div>
                              <div>
                                <Label>GPA (Optional)</Label>
                                <Input
                                  value={edu.gpa}
                                  onChange={(e) => {
                                    const newEdu = [...resumeData.education]
                                    newEdu[index].gpa = e.target.value
                                    setResumeData((prev) => ({ ...prev, education: newEdu }))
                                  }}
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <Button onClick={addEducation} variant="outline" className="w-full bg-transparent">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Education
                      </Button>
                    </div>
                  )}

                  {/* Skills Tab */}
                  {activeTab === "skills" && (
                    <div className="space-y-6">
                      <div>
                        <Label>Skills</Label>
                        <div className="flex space-x-2 mt-2">
                          <Input
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Add a skill"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault()
                                addSkill()
                              }
                            }}
                          />
                          <Button onClick={addSkill}>Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {resumeData.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                              <span>{skill}</span>
                              <button onClick={() => removeSkill(index)}>
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label>Languages</Label>
                        <div className="flex space-x-2 mt-2">
                          <Input
                            value={newLanguage}
                            onChange={(e) => setNewLanguage(e.target.value)}
                            placeholder="Add a language"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault()
                                addLanguage()
                              }
                            }}
                          />
                          <Button onClick={addLanguage}>Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {resumeData.languages.map((language, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                              <span>{language}</span>
                              <button onClick={() => removeLanguage(index)}>
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8">
            <Card className="h-fit">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Resume Preview</span>
                </CardTitle>
                <Button className="bg-gray-800 hover:bg-gray-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </CardHeader>
              <CardContent>
                <div className="bg-white border border-gray-200 rounded-lg p-6 min-h-[600px]">
                  {/* Resume Preview Content */}
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="text-center border-b border-gray-200 pb-4">
                      <h1 className="text-2xl font-bold text-gray-900">
                        {resumeData.personalInfo.fullName || "Your Name"}
                      </h1>
                      <div className="text-gray-600 mt-2 space-y-1">
                        {resumeData.personalInfo.email && <p>{resumeData.personalInfo.email}</p>}
                        {resumeData.personalInfo.phone && <p>{resumeData.personalInfo.phone}</p>}
                        {resumeData.personalInfo.location && <p>{resumeData.personalInfo.location}</p>}
                      </div>
                    </div>

                    {/* Summary */}
                    {resumeData.summary && (
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Professional Summary</h2>
                        <p className="text-gray-700 text-sm leading-relaxed">{resumeData.summary}</p>
                      </div>
                    )}

                    {/* Experience */}
                    {resumeData.experience.length > 0 && (
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">Experience</h2>
                        <div className="space-y-4">
                          {resumeData.experience.map((exp) => (
                            <div key={exp.id}>
                              <div className="flex justify-between items-start mb-1">
                                <h3 className="font-medium text-gray-900">{exp.title}</h3>
                                <span className="text-sm text-gray-600">
                                  {exp.startDate} - {exp.endDate}
                                </span>
                              </div>
                              <p className="text-gray-700 text-sm mb-1">
                                {exp.company}, {exp.location}
                              </p>
                              <p className="text-gray-600 text-sm">{exp.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Education */}
                    {resumeData.education.length > 0 && (
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">Education</h2>
                        <div className="space-y-3">
                          {resumeData.education.map((edu) => (
                            <div key={edu.id}>
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                                  <p className="text-gray-700 text-sm">
                                    {edu.institution}, {edu.location}
                                  </p>
                                </div>
                                <span className="text-sm text-gray-600">{edu.graduationDate}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    {resumeData.skills.length > 0 && (
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                          {resumeData.skills.map((skill, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Languages */}
                    {resumeData.languages.length > 0 && (
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Languages</h2>
                        <div className="flex flex-wrap gap-2">
                          {resumeData.languages.map((language, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                              {language}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
