import React from 'react'
import fitnessImage from "../assets/pngwing.png"
import gymImg1 from "../assets/gym-1.jpg"
import gymImg2 from "../assets/gym-2.jpg"
import "./Home.css"

const Home = () => {
  return (
    <div id='Home'>
        <div className="left">
            <img src={fitnessImage} className='fitness-icon'/>
            <p className='home-main-text-1'>Your Fitness,</p>
            <p className='home-main-text-2'>
              <img src={gymImg1} className='gym-1'/>
              Your Journey</p>
              <p className='home-sec-text'>
                Personalized coaching to help you achive your <br /> health and fitness goals with confidence
              </p>
            <button className="connect-btn">
              Connect Now
            </button>
        </div>
        <div className="home-mid">
            <img src={gymImg2} className='gym-2'/>
        </div> 
        <div className="right">
          <div className="home-text">
              WORKOUT <br />THAT IMPROVES <br /> AS YOU DO 
          </div>
          <div className="Home-tags">
            <span className="tag rotate-left">HealthyLifestyle</span>
            <span className="tag rotate-right">CleanEating</span>
            <span className="tag rotate-left">FitAndHealthy</span>
            <span className="tag rotate-right">StrengthAndNutrition</span>
            <span className="tag rotate-left">FitnessJourney</span>
            <span className="tag rotate-right ">FuelYourBody</span>
            <span className="tag rotate-left">WorkoutAndNutrition</span>
          </div>
        </div>
    </div>
  )
}

export default Home
