import React from 'react'
import Card from './Card'
import "./ServicesSection.css"
import cardimg1 from "../assets/Card-1.jpg"
import cardimg2 from "../assets/Card-2.jpg"
import cardimg3 from "../assets/Card-3.jpg"
import cardimg4 from "../assets/Card-4.jpg"

const ServicesSection = () => {
  return (
      <section id="Services-section">
      <h2 className="services-heading">Our Services</h2>
      <p className="services-subtext">
        Personalized fitness plans, expert coaching, and nutrition guidance to help you achieve your goals.
      </p>

      <div className="cards-grid">
        <Card
          image= {cardimg1}
          title="Personalized Workout Plans"
          description="Tailored fitness routines designed to meet your specific goals and lifestyle."
        />
        <Card
          image={cardimg2}
          title="Nutrition Coaching"
          description="Expert guidance to create a balanced diet plan that fuels your fitness journey."
        />
        <Card
          image={cardimg3}
          title="One-on-One Coaching"
          description="Dedicated support from certified trainers to keep you motivated and on track."
        />
        <Card
          image={cardimg4}
          title="Progress Tracking and Analysis"
          description="Track your progress with detailed reports and adjust your plan for optimal results."
        />
      </div>

      <button className="view-all-btn">View All</button>
    </section>
  )
}

export default ServicesSection
