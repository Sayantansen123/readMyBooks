import { ReactLenis } from "lenis/dist/lenis-react";
import React, { useEffect, useRef } from 'react'
import { FaBookReader } from "react-icons/fa";
import '../index.css';
import { motion, useMotionTemplate, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'





const LandingPage = () => {
  
  return (
    <div >
      <ReactLenis
      root
      options={{
        lerp: 0.05,
       
      }}>
      <Navbar />
      <Hero />
      <About />
      </ReactLenis>

    </div>
  )
}


const Navbar = () => {
  return (<nav className='fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-black'>
    <FaBookReader className='text-3xl '></FaBookReader>
  </nav>)
}

const section_height = 1500;

const Hero = () => {
  return (<div className='relative w-full'
    style={{ height: `calc(${section_height}px + 100vh)` }}>
    <CenterImage />
    <ParallaxImages />

    <div className='absolute bottom-0 left-0 right-0
        h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950'></div>
  </div>)
}

const CenterImage = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [section_height, section_height + 500], [1, 0]);
  const backgroundSize = useTransform(scrollY, [0, section_height + 500], ["30%", "100%"]);
  const clip1 = useTransform(scrollY, [0, section_height], [25, 0])
  const clip2 = useTransform(scrollY, [0, section_height], [75, 100])
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}% ,
    ${clip2}% ${clip1}% ,${clip2}% ${clip2}% ,${clip1}% ${clip2}% ,
    )`
  return <motion.div
    className='sticky top-0 h-screen w-full bg-cover '
    style={{
      opacity,
      backgroundSize,
      clipPath,
      backgroundImage: "url('/centerimage.jpg')",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  />
}

const ParallaxImages = () => {
  return (<div className='mx-auto  max-w-5xl px-4 pt-[200px] relative z-10'>
    <ParallaxImg
      src="/img2.jpg"
      alt="example of book"
      start={-200}
      end={200}
      className="w-1/3"

    />
    <ParallaxImg
      src="/img3.jpg"
      alt="example of book"
      start={200}
      end={-250}
      className="mx-auto w-2/3"

    />

    <ParallaxImg
      src="/img1.jpg"
      alt="example of book"
      start={100}
      end={-500}
      className="ml-auto w-1/3"

    />

<ParallaxImg
      src="/img4.jpg"
      alt="example of book"
        start={0}
        end={-700}
        className="ml-24 w-5/12"
    />


  </div>);
}

const ParallaxImg = ({
  className,
  alt,
  src,
  start,
  end, }
) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
}

const About = () => {
  return <div className=' overflow-hidden'>
    <motion.h1 
   
    initial={{ y: 48, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ ease: "easeInOut", duration: 0.75 }}
    className='text-3xl text-black pl-15 pt-10 '
      style={{
        fontFamily: `"Raleway", serif`
      }}>
      Welcome To <span className='font-bold text-pink-800'>BookHive</span>
    </motion.h1>
    <div className='w-[100vw] md:flex justify-center  '>
      <div className=' w-[50%] '>
        <motion.p
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className='text-black text-2xl pl-15 pt-0.5 '>a vibrant community where book lovers unite to share, discover, and explore the world of stories and ideas.

          Our platform empowers users to showcase their creativity by posting their own books, whether it’s an enchanting novel, a thought-provoking essay, or a personal collection of poetry.
        </motion.p>
        <motion.div
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }} 
        class="mt-4 pl-15">
          <div class="relative group">
            <button
              class="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
            >
              <span
                class="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              ></span>

              <span class="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                <div class="relative z-10 flex items-center space-x-2">
                  <span class="transition-all duration-500 group-hover:translate-x-1"
                  >Let's get started</span>
                  <svg
                    class="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                    data-slot="icon"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </span>
            </button>
          </div>
        </motion.div>



      </div>
      
      
      
    <motion.img
      src="/img3.jpg"
      alt="example of book"
      className="mx-auto w-1/4 pb-10"
    />

      

    </div>

  </div>
}


export default LandingPage
