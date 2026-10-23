import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import About from './Components/About'
import ServicesSection from './Components/ServicesSection'
import Membership from './Components/Membership'
import Footer from './Components/Footer'
import AuthModal from './Components/AuthModal'
import ContactModal from './Components/ContactModal'
import Toast from './Components/Toast'

function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [toast, setToast] = useState({ message: '', type: 'success' })

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  return (
    <>
      <Navbar onLoginClick={() => setAuthModalOpen(true)} />
      <Home onConnectClick={() => setContactModalOpen(true)} />
      <About onJoinClick={() => setAuthModalOpen(true)} />
      <ServicesSection />
      <Membership
        onJoinClick={() => setAuthModalOpen(true)}
        showToast={showToast}
      />
      <Footer
        onContactClick={() => setContactModalOpen(true)}
        showToast={showToast}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        onSuccess={(msg) => showToast(msg)}
      />

      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: 'success' })}
        />
      )}
    </>
  )
}

export default App
