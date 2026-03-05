import CustomCursor from '@/components/CustomCursor'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Contact from '@/components/Contact'
import ClientSections from '@/components/ClientSections'

export default function Home() {
  return (
    <>
      {/* Custom cursor — client only */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="relative">
        <Hero />
        <About />
        <ClientSections />
        <Contact />
      </main>
    </>
  )
}
