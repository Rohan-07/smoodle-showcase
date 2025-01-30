'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProjectForm() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const response = await fetch('/api/projects', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      
      if (data.success) {
        alert('Project submitted successfully!')
        router.push('/')
        router.refresh()
      } else {
        throw new Error(data.error || 'Failed to submit project')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Error submitting project: ' + (error as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <div className="form-group">
        <label htmlFor="projectName">Project Name</label>
        <input
          type="text"
          id="projectName"
          name="projectName"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="creatorName">Creator Name</label>
        <input
          type="text"
          id="creatorName"
          name="creatorName"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="projectUrl">Project URL</label>
        <input
          type="url"
          id="projectUrl"
          name="projectUrl"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="screenshot">Screenshot</label>
        <input
          type="file"
          id="screenshot"
          name="screenshot"
          accept="image/*"
          required
          onChange={handleImageChange}
        />
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
          </div>
        )}
      </div>

      <button type="submit" className="submit-btn" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Project'}
      </button>
    </form>
  )
}
