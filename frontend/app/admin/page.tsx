"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data
  const stats = {
    totalUsers: 2847,
    activeCourses: 12,
    jobListings: 156,
    completionRate: 78
  }

  const courses = [
    {
      id: 1,
      title: 'Digital Marketing Fundamentals',
      instructor: 'Priya Sharma',
      students: 1250,
      status: 'active',
      created: '2024-01-15',
      completion: 85
    },
    {
      id: 2,
      title: 'Basic Computer Skills',
      instructor: 'Rajesh Thapa',
      students: 2100,
      status: 'active',
      created: '2024-01-10',
      completion: 92
    },
    {
      id: 3,
      title: 'English Communication',
      instructor: 'Sarah Johnson',
      students: 890,
      status: 'draft',
      created: '2024-01-20',
      completion: 0
    }
  ]

  const jobListings = [
    {
      id: 1,
      title: 'Digital Marketing Assistant',
      company: 'Tech Solutions Pvt. Ltd.',
      location: 'Kathmandu',
      salary: 'Rs. 25,000 - 35,000',
      status: 'active',
      posted: '2024-01-22',
      applications: 45
    },
    {
      id: 2,
      title: 'Customer Service Rep',
      company: 'Call Center Nepal',
      location: 'Lalitpur',
      salary: 'Rs. 20,000 - 28,000',
      status: 'active',
      posted: '2024-01-21',
      applications: 32
    },
    {
      id: 3,
      title: 'Data Entry Operator',
      company: 'Business Hub',
      location: 'Bhaktapur',
      salary: 'Rs. 18,000 - 25,000',
      status: 'expired',
      posted: '2024-01-15',
      applications: 78
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'expired': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  const AddCourseDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Course</DialogTitle>
          <DialogDescription>
            Create a new micro-course for the platform
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="courseTitle">Course Title</Label>
              <Input id="courseTitle" placeholder="Enter course title" />
            </div>
            <div>
              <Label htmlFor="instructor">Instructor</Label>
              <Input id="instructor" placeholder="Instructor name" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Course description" rows={3} />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" placeholder="e.g., 4 weeks" />
            </div>
            <div>
              <Label htmlFor="level">Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <Select\
