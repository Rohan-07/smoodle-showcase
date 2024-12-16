'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import ProjectForm from '@/components/ProjectForm'

export default function Submit() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    })
  }, [])

  return (
    <main className="submit-container">
      <h2 data-aos="fade-up">Submit Your Project</h2>
      <ProjectForm />
    </main>
  )
}
