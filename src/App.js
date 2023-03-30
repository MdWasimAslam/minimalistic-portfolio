import React from 'react'
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import About from './Components/About.js';
import Skill from './Components/Skill';
import Projects from './Components/Projects';
import Timeline from './Components/Timeline';
import { useMediaQuery } from 'react-responsive'


function App() {


  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

  return (
    <>
 
    {isDesktopOrLaptop && 
    <>
       <Navbar/>
    <Hero/>
    <About/>
    <Skill/>
    <Projects/>
    <Timeline/>
    </>
    }

{isTabletOrMobile && <p style={{color:"white"}}> Aha!😕 Currently Mobile Phones are not supported. Use Desktop/Laptop Instead 👨‍💻.</p>}

    </>
  )
}

export default App