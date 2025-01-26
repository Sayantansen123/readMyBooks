import React from 'react'
import { FaBookReader } from "react-icons/fa";
import {motion,useScroll } from 'framer-motion'


const LandingPage = () => {
  return (
    <div >
      <Navbar/>
      <Hero/>
      <div className='h-screen'></div>
    </div>
  )
}

const Navbar = () =>{
    return(<nav className='fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-white'>
        <FaBookReader className='text-3xl '></FaBookReader>
    </nav>)
}

const section_height = 1500;

const Hero = ()=>{
    return (<div className='relative w-full'
    style={{height: `calc(${section_height}px + 100vh)`}}>
        <CenterImage/>
    </div>)
}

const CenterImage = () =>{
    const {scrollY,scrollYProgress} = useScroll();


    return <motion.div
    className='sticky top-0 h-screen w-full bg-cover'
    style={{
        backgroundImage:"url('/pexels-lilartsy-3563625.jpg')",
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat",
    }}
    />
}

export default LandingPage
