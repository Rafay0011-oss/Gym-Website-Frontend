import React from 'react'
import gymImg3 from "../assets/gym-3.jpg"
import dumbells from "../assets/dumbbell.png"
import treadmill from "../assets/treadmill.png"
import "./About.css"

const About = ({ onJoinClick }) => {
    return (
        <div id='About'>
            <div className="about-left">
                <div className="about-header">
                    <div className="about-header-left">
                        <div className="about-header-left-small">About FitClub</div>
                        <div className="about-header-left-large">Join FitClub</div>
                    </div>
                    <div className="about-header-right">
                        <button className='about-btn' onClick={onJoinClick}>Join Us</button>
                    </div>
                </div>
                <div className="about-left-img">
                    <img src={gymImg3} />
                </div>
            </div>

            <div className="about-right">
                <div className="about-main-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. A, adipisci praesentium accusamus commodi nisi aliquid itaque eligendi voluptatibus? Mollitia, ad dolores dolorum itaque perspiciatis aspernatur debitis quos sapiente corrupti
                </div>

                <div className="about-bullits">
                    <div className="about-bullit-1">
                        <img src={dumbells} className='dumbbell-icon' />
                        <p className='dumbell-text'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus illum saepe excepturi porro cupiditate alias? Esse impedit corrupti vitae reprehenderit error ipsum, delectus, unde, accusamus ea obcaecati officiis cum placeat.</p>
                    </div>
                    <div className="about-bullit-2">
                        <img src={treadmill} className='treadmill-icon' />
                        <p className='treadmill-text'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus illum saepe excepturi porro cupiditate alias? Esse impedit corrupti vitae reprehenderit error ipsum, delectus, unde, accusamus ea obcaecati officiis cum placeat.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
