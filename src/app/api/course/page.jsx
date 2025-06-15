'use client'
import React, { useEffect, useState } from 'react'

export default function CourseForm() {
  const [categories, setCategories] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selected, setSelected] = useState([])

  useEffect(() => {
    fetch('/api/category')
      .then(res => res.json())
      .then(data => setCategories(data))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          creatorId: 'user-id-here', // Replace with actual user
          categoryIds: selected,
        }),
      })
      
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to create course')
      }
      
      const data = await res.json()
      console.log('Created:', data)
    } catch (error) {
      console.error('Error creating course:', error)
      alert('Failed to create course: ' + error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-lg">
      <h2 className="text-xl font-bold mb-4">Create Course</h2>

      <input
        type="text"
        placeholder="Title"
        className="w-full mb-2 p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="w-full mb-2 p-2 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label className="block mb-2">Select Categories</label>
      <select
        multiple
        className="w-full p-2 border rounded"
        value={selected}
        onChange={(e) =>
          setSelected(Array.from(e.target.selectedOptions, (o) => o.value))
        }
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Save Course
      </button>
    </form>
  )
}
