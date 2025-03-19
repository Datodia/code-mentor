'use client'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { axiosInstance } from '@/lib/axios-instance'
import { Course } from '@/types'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DeleteCourse from './components/delete-course'
import AddOrUpdate from './components/add-or-update'

export default function Couses() {
  const [courses, setCourses] = useState<Course[] | null>(null)
  const [courseId, setCourseId] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showAddOrUpdate, setShowAddOrUpdate] = useState(false)
  const [shouldFetch, setShouldFetch] = useState(false)

  const getCourses = async () => {
    const resp = await axiosInstance.get('/courses')
    setCourses(resp.data)
  }

  const handleDelete = async (e: any, id: string) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDeleteModal(true)
    setCourseId(id)
  }

  const handleRowClick = (id: string) => {
    setShowAddOrUpdate(true)
    setCourseId(id)
  }

  const handleAddNewCourse = () => {
    setShowAddOrUpdate(true)
    setCourseId(null)
  }

  useEffect(() => {
    getCourses()
  }, [shouldFetch])

  return (
    <div className='px-4'>
      {
        showAddOrUpdate ?
          <AddOrUpdate
            courseId={courseId!}
            showAddOrUpdate={showAddOrUpdate}
            setShouldFetch={setShouldFetch}
            setShowAddOrUpdate={setShowAddOrUpdate}
          />
          : null
      }
      {
        showDeleteModal ?
          <DeleteCourse
            courseId={courseId!}
            setShouldFetch={setShouldFetch}
            setShowDeleteModal={setShowDeleteModal}
            showDeleteModal={showDeleteModal}
          /> : null
      }
      <div className='flex items-center justify-between'>
        <h1>Courses</h1>
        <Button onClick={handleAddNewCourse}><Plus /> Add New Course</Button>
      </div>
      <div className='border-2 border-foreground mt-10'>
        <Table>
          <TableCaption>{courses?.length} Courses Found</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total students/enrolments</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>


          <TableBody>
            {!courses?.length ?
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No blogs found
                </TableCell>
              </TableRow>
              :
              courses.map((course) => (
                <TableRow className='relative' key={course._id} onClick={() => handleRowClick(course._id)}>
                  <TableCell className="font-medium">{course._id}</TableCell>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell className="font-medium">
                    {course.price}
                  </TableCell>
                  <TableCell>{course.totalStudents}/{course.totalEnrollments} </TableCell>
                  <TableCell className='relative z-20'>
                    <Button onClick={(e) => handleDelete(e, course._id)} variant={'destructive'} >Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
