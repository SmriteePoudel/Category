'use client'
import React, { useEffect, useState } from 'react'

export default function CategoryList() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('/api/category')
      .then(res => res.json())
      .then(data => setCategories(data))
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.id} className="border p-2 rounded">
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
