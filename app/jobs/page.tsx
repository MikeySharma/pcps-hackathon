"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Clock, DollarSign, Building, ExternalLink, Filter, Briefcase, Globe, Zap } from "lucide-react"
import { motion } from "framer-motion"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Remote"
  salary: string
  description: string
  requirements: string[]
  tags: string[]
  postedDate: string
  category: "local" | "remote"
  applyUrl: string
}

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Software Developer",
    company: "Tech Solutions Nepal",
    location: "Kathmandu, Nepal",
    type: "Full-time",
    salary: "NPR 80,000 - 120,000",
    description:
      "We are looking for a skilled software developer to join our growing team. You will be responsible for developing web applications using modern technologies.",
    requirements: ["Bachelor's in Computer Science", "2+ years experience", "JavaScript, React, Node.js"],
    tags: ["JavaScript", "React", "Node.js", "MongoDB"],
    postedDate: "2 days ago",
    category: "local",
    applyUrl: "#",
  },
  {
    id: "2",
    title: "Digital Marketing Specialist",
    company: "Himalayan Marketing",
    location: "Pokhara, Nepal",
    type: "Full-time",
    salary: "NPR 50,000 - 80,000",
    description:
      "Join our marketing team to create and execute digital marketing campaigns for local and international clients.",
    requirements: ["Marketing degree preferred", "Social media expertise", "Google Ads certification"],
    tags: ["Digital Marketing", "SEO", "Social Media", "Google Ads"],
    postedDate: "1 week ago",
    category: "local",
    applyUrl: "#",
  },
  {
    id: "3",
    title: "Frontend Developer (Remote)",
    company: "Global Tech Inc",
    location: "Remote",
    type: "Remote",
    salary: "$2,000 - $3,500 USD",
    description:
      "Remote opportunity for a frontend developer to work with international clients on cutting-edge web applications.",
    requirements: ["3+ years React experience", "TypeScript proficiency", "Strong English communication"],
    tags: ["React", "TypeScript", "Remote", "International"],
    postedDate: "3 days ago",
    category: "remote",
    applyUrl: "#",
  },
  {
    id: "4",
    title: "Graphic Designer",
    company: "Creative Studio Nepal",
    location: "Lalitpur, Nepal",
    type: "Full-time",
    salary: "NPR 40,000 - 70,000",
    description:
      "Creative graphic designer needed for branding, web design, and print media projects for diverse clients.",
    requirements: ["Design portfolio required", "Adobe Creative Suite", "2+ years experience"],
    tags: ["Graphic Design", "Adobe", "Branding", "Web Design"],
    postedDate: "5 days ago",
    category: "local",
    applyUrl: "#",
  },
  {
    id: "5",
    title: "Data Analyst (Remote)",
    company: "DataCorp International",
    location: "Remote",
    type: "Remote",
    salary: "$1,800 - $2,800 USD",
    description:
      "Analyze large datasets and create insights for business decision-making. Work with global teams remotely.",
    requirements: ["Statistics/Data Science background", "Python, SQL, Excel", "English proficiency"],
    tags: ["Data Analysis", "Python", "SQL", "Remote"],
    postedDate: "1 day ago",
    category: "remote",
    applyUrl: "#",
  },
  {
    id: "6",
    title: "Project Manager",
    company: "Build Nepal Construction",
    location: "Kathmandu, Nepal",
    type: "Full-time",
    salary: "NPR 90,000 - 150,000",
    description:
      "Lead construction projects from planning to completion. Manage teams, budgets, and timelines effectively.",
    requirements: ["Engineering degree", "PMP certification preferred", "5+ years project management"],
    tags: ["Project Management", "Construction", "Leadership", "PMP"],
    postedDate: "1 week ago",
    category: "local",
    applyUrl: "#",
  },
  {
    id: "7",
    title: "Content Writer (Remote)",
    company: "ContentPro Agency",
    location: "Remote",
    type: "Part-time",
    salary: "$800 - $1,200 USD",
    description: "Create engaging content for blogs, websites, and social media for international clients.",
    requirements: ["Excellent English writing", "SEO knowledge", "Portfolio of published work"],
    tags: ["Content Writing", "SEO", "Remote", "English"],
    postedDate: "4 days ago",
    category: "remote",
    applyUrl: "#",
  },
  {
    id: "8",
    title: "Banking Officer",
    company: "Nepal Investment Bank",
    location: "Kathmandu, Nepal",
    type: "Full-time",
    salary: "NPR 60,000 - 100,000",
    description: "Handle customer relations, loan processing, and banking operations in our main branch.",
    requirements: ["Bachelor's in Finance/Business", "Banking experience preferred", "Customer service skills"],
    tags: ["Banking", "Finance", "Customer Service", "Loans"],
    postedDate: "6 days ago",
    category: "local",
    applyUrl: "#",
  },
]

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [activeTab, setActiveTab] = useState("local")

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesLocation =
      selectedLocation === "all" || job.location.toLowerCase().includes(selectedLocation.toLowerCase())
    const matchesType = selectedType === "all" || job.type === selectedType
    const matchesCategory = job.category === activeTab

    return matchesSearch && matchesLocation && matchesType && matchesCategory
  })

  const handleSmartSearch = () => {
    const query = `${searchTerm} job Kathmandu site:linkedin.com`
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Search</h1>
          <p className="text-gray-600">Find your next opportunity in Nepal and around the world</p>
        </motion.div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search jobs, companies, or skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="w-[180px]">
                      <MapPin className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="kathmandu">Kathmandu</SelectItem>
                      <SelectItem value="pokhara">Pokhara</SelectItem>
                      <SelectItem value="lalitpur">Lalitpur</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-[150px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-center">
                <Button onClick={handleSmartSearch} variant="outline" className="bg-transparent">
                  <Zap className="h-4 w-4 mr-2" />
                  Smart Job Search on Google
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="local" className="flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <span>Local Jobs</span>
            </TabsTrigger>
            <TabsTrigger value="remote" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Remote Jobs</span>
            </TabsTrigger>
            <TabsTrigger value="smart" className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Smart Search</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="local" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                          <CardDescription className="text-base">
                            <div className="flex items-center space-x-4 mb-2">
                              <div className="flex items-center space-x-1">
                                <Building className="h-4 w-4" />
                                <span>{job.company}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{job.location}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <DollarSign className="h-4 w-4" />
                                <span>{job.salary}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{job.postedDate}</span>
                              </div>
                            </div>
                          </CardDescription>
                        </div>
                        <Badge variant={job.type === "Remote" ? "default" : "secondary"}>{job.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">{job.description}</p>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {job.requirements.map((req, i) => (
                            <li key={i} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <span className="text-sm text-gray-500">Posted {job.postedDate}</span>
                        <Button className="bg-gray-800 hover:bg-gray-700">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Apply Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="remote" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                          <CardDescription className="text-base">
                            <div className="flex items-center space-x-4 mb-2">
                              <div className="flex items-center space-x-1">
                                <Building className="h-4 w-4" />
                                <span>{job.company}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Globe className="h-4 w-4" />
                                <span>{job.location}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <DollarSign className="h-4 w-4" />
                                <span>{job.salary}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{job.postedDate}</span>
                              </div>
                            </div>
                          </CardDescription>
                        </div>
                        <Badge variant="default">{job.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">{job.description}</p>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {job.requirements.map((req, i) => (
                            <li key={i} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <span className="text-sm text-gray-500">Posted {job.postedDate}</span>
                        <Button className="bg-gray-800 hover:bg-gray-700">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Apply Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="smart" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Smart Job Search</span>
                </CardTitle>
                <CardDescription>Use AI-powered search to find jobs across the web</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={() =>
                      window.open(
                        "https://www.google.com/search?q=software+developer+job+Kathmandu+site:linkedin.com",
                        "_blank",
                      )
                    }
                    variant="outline"
                    className="h-auto p-4 text-left bg-transparent"
                  >
                    <div>
                      <div className="font-medium">Software Developer Jobs</div>
                      <div className="text-sm text-gray-600">Search LinkedIn for developer positions</div>
                    </div>
                  </Button>
                  <Button
                    onClick={() =>
                      window.open("https://www.google.com/search?q=remote+job+Nepal+site:upwork.com", "_blank")
                    }
                    variant="outline"
                    className="h-auto p-4 text-left bg-transparent"
                  >
                    <div>
                      <div className="font-medium">Remote Opportunities</div>
                      <div className="text-sm text-gray-600">Find remote work on Upwork</div>
                    </div>
                  </Button>
                  <Button
                    onClick={() =>
                      window.open(
                        "https://www.google.com/search?q=marketing+job+Kathmandu+site:jobsnepal.com",
                        "_blank",
                      )
                    }
                    variant="outline"
                    className="h-auto p-4 text-left bg-transparent"
                  >
                    <div>
                      <div className="font-medium">Marketing Positions</div>
                      <div className="text-sm text-gray-600">Search local job boards</div>
                    </div>
                  </Button>
                  <Button
                    onClick={() =>
                      window.open("https://www.google.com/search?q=government+job+Nepal+site:psc.gov.np", "_blank")
                    }
                    variant="outline"
                    className="h-auto p-4 text-left bg-transparent"
                  >
                    <div>
                      <div className="font-medium">Government Jobs</div>
                      <div className="text-sm text-gray-600">Public Service Commission</div>
                    </div>
                  </Button>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Custom Search</h3>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="e.g., Data Analyst job Pokhara"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button onClick={handleSmartSearch} className="bg-gray-800 hover:bg-gray-700">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {filteredJobs.length === 0 && activeTab !== "smart" && (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all jobs</p>
          </div>
        )}
      </div>
    </div>
  )
}
