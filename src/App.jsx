import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import About from './Components/About'
import ServicesSection from './Components/ServicesSection'
import Membership from './Components/Membership'
import Footer from './Components/Footer'

function App() {

  return (
    <>
      <Navbar />
      <Home />
      <About />
      <ServicesSection />
      <Membership />
      <Footer />
    </>
  )
}

export default App
