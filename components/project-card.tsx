'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

type ProjectProps = {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  projectType?: string;
};

export default function ProjectCard({
  title,
  description,
  tags,
  imageUrl,
  projectType = 'web',
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.33 1'],
  });
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const isMobile = projectType === 'mobile';

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgess,
        opacity: opacityProgess,
      }}
      className="group mb-4 sm:mb-12 last:mb-0 px-4 sm:px-0"
    >
      <section className="bg-white/80 backdrop-blur-lg dark:bg-white/10 dark:hover:bg-white/15 max-w-[50rem] border border-black/5 rounded-3xl overflow-hidden relative sm:h-[26rem] hover:bg-gray-50/90 transition-all duration-500 shadow-2xl hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] dark:text-white group">
        <div className="pt-8 pb-10 px-8 sm:pl-12 sm:pr-4 sm:pt-12 sm:max-w-[45%] flex flex-col h-full relative z-10">
          <h3 className="text-4xl font-extrabold tracking-tight bg-gradient-to-br from-gray-950 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            {title}
          </h3>
          <p className="mt-5 leading-relaxed text-gray-700 dark:text-white/80 text-lg flex-grow">
            {description}
          </p>
          <ul className="flex flex-wrap mt-8 gap-2.5">
            {tags.map((tag, index) => (
              <li
                className="bg-gray-900 dark:bg-white/20 px-4 py-1.5 text-[0.8rem] font-semibold uppercase tracking-widest text-white rounded-full dark:text-white/90 border border-white/10"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Premium Large Mockup — right side */}
        <div className="absolute hidden sm:flex sm:items-center sm:justify-start top-0 right-[-10%] h-full w-[65%] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03] group-hover:-translate-x-6">
          {isMobile ? (
            /* Premium iPhone 15 Pro style Mockup (Larger) */
            <div className="relative border-[#1e1e1e] bg-[#1e1e1e] border-[9px] rounded-[3.5rem] h-[22rem] w-[10.8rem] shadow-[0_30px_70px_rgba(0,0,0,0.4)] flex-shrink-0 outline outline-1 outline-white/20 ml-12">
              {/* Dynamic Island */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-20 flex items-center justify-end px-2">
                <div className="w-1.5 h-1.5 bg-blue-500/20 rounded-full blur-[1px]"></div>
              </div>
              
              {/* Buttons */}
              <div className="w-[3px] h-[1.4rem] bg-[#2a2a2a] absolute -left-[12px] top-[4.5rem] rounded-l-md border-r border-white/10"></div>
              <div className="w-[3px] h-[2.2rem] bg-[#2a2a2a] absolute -left-[12px] top-[6.8rem] rounded-l-md border-r border-white/10"></div>
              <div className="w-[3px] h-[2.2rem] bg-[#2a2a2a] absolute -left-[12px] top-[9.5rem] rounded-l-md border-r border-white/10"></div>
              <div className="w-[3px] h-[2.8rem] bg-[#2a2a2a] absolute -right-[12px] top-[7.5rem] rounded-r-md border-l border-white/10"></div>
              
              {/* Screen */}
              <div className="rounded-[2.8rem] overflow-hidden w-full h-full bg-black relative">
                <Image
                  src={imageUrl}
                  alt="Project Phone Mockup"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  quality={100}
                  width={400}
                  height={800}
                />
                {/* Screen Reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>
          ) : (
            /* Premium MacBook Pro style Mockup (Larger) */
            <div className="w-[32rem] drop-shadow-[0_35px_60px_rgba(0,0,0,0.5)] translate-x-8">
              {/* Screen Container */}
              <div className="relative border-[#1a1a1a] bg-[#1a1a1a] border-[10px] rounded-t-2xl shadow-inner" style={{ aspectRatio: '16/10' }}>
                {/* Refined Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#1a1a1a] rounded-b-lg z-20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-black rounded-full border border-white/5"></div>
                </div>
                
                {/* Display */}
                <div className="overflow-hidden w-full h-full rounded-sm bg-black relative">
                  <Image
                    src={imageUrl}
                    alt="Project Laptop Mockup"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                    quality={100}
                    width={800}
                    height={500}
                  />
                  {/* Subtle screen glare */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
                </div>
              </div>
              {/* Refined Hinge/Base */}
              <div className="relative">
                {/* Main Base - Slightly Thicker */}
                <div className="bg-[#2a2a2a] h-[12px] w-[104%] -left-[2%] relative rounded-b-2xl border-t border-white/20 shadow-xl"></div>
                {/* Front Lip / Hand Grip */}
                <div className="bg-[#1a1a1a] w-1/5 h-[5px] mx-auto rounded-b-md relative z-10 border-t border-black/30"></div>
              </div>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
