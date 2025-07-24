"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, MapPin, Mail, Phone, Globe, Linkedin, Edit, Download, Briefcase, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"
import { storage } from "@/lib/storage"
import Link from "next/link"

export default function ProfilePage() {
  const [resumeData, setResumeData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const data = storage.getResumeData()
    setResumeData(data)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
      </div>
    )
  }

  if (!resumeData || !resumeData.personalInfo?.fullName) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-12">
            <CardContent>
              <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
              <p className="text-gray-600 mb-6">Create your resume first to build your professional profile</p>
              <Button asChild className="bg-gray-800 hover:bg-gray-700">
                <Link href="/resume">Build Resume</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const { personalInfo, summary, experience, education, skills, languages } = resumeData

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div className="relative h-48 bg-gradient-to-r from-gray-800 to-gray-600">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-6">
          <div className="flex items-end space-x-6">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage src="/placeholder.svg?height=128&width=128" />
              <AvatarFallback className="text-2xl bg-white text-gray-800">
                {getInitials(personalInfo.fullName)}
              </AvatarFallback>
            </Avatar>
            <div className="pb-4">
              <h1 className="text-3xl font-bold text-white mb-2">{personalInfo.fullName}</h1>
              <div className="flex items-center space-x-4 text-gray-200">
                {personalInfo.location && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.email && (
                  <div className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span>{personalInfo.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {summary && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Professional Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">{summary}</p>
                      </CardContent>
                    </Card>
                  )}

                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {personalInfo.phone && (
                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-gray-600" />
                          <span>{personalInfo.phone}</span>
                        </div>
                      )}
                      {personalInfo.email && (
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-gray-600" />
                          <span>{personalInfo.email}</span>
                        </div>
                      )}
                      {personalInfo.linkedin && (
                        <div className="flex items-center space-x-3">
                          <Linkedin className="h-5 w-5 text-gray-600" />
                          <a href={personalInfo.linkedin} className="text-blue-600 hover:underline">
                            LinkedIn Profile
                          </a>
                        </div>
                      )}
                      {personalInfo.website && (
                        <div className="flex items-center space-x-3">
                          <Globe className="h-5 w-5 text-gray-600" />
                          <a href={personalInfo.website} className="text-blue-600 hover:underline">
                            Personal Website
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="experience">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Briefcase className="h-5 w-5" />
                        <span>Work Experience</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {experience && experience.length > 0 ? (
                        <div className="space-y-6">
                          {experience.map((exp: any, index: number) => (
                            <div key={exp.id || index} className="border-l-2 border-gray-200 pl-4 pb-6">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                                  <p className="text-gray-600">{exp.company}</p>
                                  <p className="text-sm text-gray-500">{exp.location}</p>
                                </div>
                                <div className="text-sm text-gray-500">
                                  {exp.startDate} - {exp.endDate || "Present"}
                                </div>
                              </div>
                              {exp.description && <p className="text-gray-700 mt-2">{exp.description}</p>}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-8">No work experience added yet</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="education">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <GraduationCap className="h-5 w-5" />
                        <span>Education</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {education && education.length > 0 ? (
                        <div className="space-y-4">
                          {education.map((edu: any, index: number) => (
                            <div key={edu.id || index} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                                  <p className="text-gray-600">{edu.institution}</p>
                                  <p className="text-sm text-gray-500">{edu.location}</p>
                                  {edu.gpa && <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>}
                                </div>
                                <div className="text-sm text-gray-500">{edu.graduationDate}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-8">No education information added yet</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="skills">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Skills</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {skills && skills.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {skills.map((skill: string, index: number) => (
                              <Badge key={index} variant="secondary" className="px-3 py-1">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-center py-8">No skills added yet</p>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Languages</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {languages && languages.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {languages.map((language: string, index: number) => (
                              <Badge key={index} variant="outline" className="px-3 py-1">
                                {language}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-center py-8">No languages added yet</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full bg-gray-800 hover:bg-gray-700">
                  <Link href="/resume">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Resume
                  </Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/jobs">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Find Jobs
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Personal Info</span>
                    <span className="text-green-600">✓</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Summary</span>
                    <span className={summary ? "text-green-600" : "text-gray-400"}>{summary ? "✓" : "○"}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Experience</span>
                    <span className={experience?.length > 0 ? "text-green-600" : "text-gray-400"}>
                      {experience?.length > 0 ? "✓" : "○"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Education</span>
                    <span className={education?.length > 0 ? "text-green-600" : "text-gray-400"}>
                      {education?.length > 0 ? "✓" : "○"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Skills</span>
                    <span className={skills?.length > 0 ? "text-green-600" : "text-gray-400"}>
                      {skills?.length > 0 ? "✓" : "○"}
                    </span>
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
