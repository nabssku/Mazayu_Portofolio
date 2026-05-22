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
      className="group mb-3 sm:mb-8 last:mb-0"
    >
      <section className="bg-white/70 backdrop-blur-md dark:bg-white/10 dark:hover:bg-white/15 max-w-[45rem] border border-black/5 rounded-2xl overflow-hidden sm:pr-8 relative sm:h-[22rem] hover:bg-gray-50/80 transition-all duration-300 shadow-xl hover:shadow-2xl dark:text-white group">
        <div className="pt-6 pb-8 px-6 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full">
          <h3 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            {title}
          </h3>
          <p className="mt-4 leading-relaxed text-gray-700 dark:text-white/70 text-base">
            {description}
          </p>
          <ul className="flex flex-wrap mt-6 gap-2 sm:mt-auto">
            {tags.map((tag, index) => (
              <li
                className="bg-gray-900/[0.9] dark:bg-white/10 px-4 py-1.5 text-[0.75rem] font-medium uppercase tracking-wider text-white/90 rounded-full dark:text-white/80 border border-white/5"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Premium Mockup — right side */}
        <div className="absolute hidden sm:flex sm:items-center sm:justify-center top-0 right-0 h-full w-[50%] transition-transform duration-500 ease-out group-hover:scale-[1.05] group-hover:-translate-x-4 group-hover:rotate-1">
          {isMobile ? (
            /* Premium iPhone 15 Pro style Mockup */
            <div className="relative border-[#1e1e1e] bg-[#1e1e1e] border-[8px] rounded-[3rem] h-[18rem] w-[8.8rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex-shrink-0 outline outline-1 outline-white/10">
              {/* Dynamic Island */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-black rounded-full z-20 flex items-center justify-end px-1.5">
                <div className="w-1 h-1 bg-blue-500/30 rounded-full blur-[1px]"></div>
              </div>
              
              {/* Buttons */}
              <div className="w-[3px] h-[1.2rem] bg-[#2a2a2a] absolute -left-[11px] top-[4rem] rounded-l-md border-r border-white/5"></div>
              <div className="w-[3px] h-[2rem] bg-[#2a2a2a] absolute -left-[11px] top-[6rem] rounded-l-md border-r border-white/5"></div>
              <div className="w-[3px] h-[2rem] bg-[#2a2a2a] absolute -left-[11px] top-[8.5rem] rounded-l-md border-r border-white/5"></div>
              <div className="w-[3px] h-[2.5rem] bg-[#2a2a2a] absolute -right-[11px] top-[6.5rem] rounded-r-md border-l border-white/5"></div>
              
              {/* Screen */}
              <div className="rounded-[2.4rem] overflow-hidden w-full h-full bg-black relative mask-image-linear">
                <Image
                  src={imageUrl}
                  alt="Project Phone Mockup"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  quality={95}
                  width={300}
                  height={650}
                />
                {/* Screen Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>
          ) : (
            /* Premium MacBook Pro style Mockup */
            <div className="w-[24rem] drop-shadow-2xl translate-x-4">
              {/* Screen Container */}
              <div className="relative border-[#1a1a1a] bg-[#1a1a1a] border-[8px] rounded-t-2xl outline outline-1 outline-white/5 shadow-inner" style={{ aspectRatio: '16/10' }}>
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3 bg-[#1a1a1a] rounded-b-md z-20"></div>
                
                {/* Display */}
                <div className="overflow-hidden w-full h-full rounded-sm bg-black relative">
                  <Image
                    src={imageUrl}
                    alt="Project Laptop Mockup"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    quality={95}
                    width={560}
                    height={350}
                  />
                  {/* Subtle glare */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
                </div>
              </div>
              {/* Hinge/Base */}
              <div className="relative">
                {/* Main Base */}
                <div className="bg-[#2a2a2a] h-[10px] w-[102%] -left-[1%] relative rounded-b-xl border-t border-white/10 shadow-lg"></div>
                {/* Front Lip / Inset */}
                <div className="bg-[#1a1a1a] w-1/4 h-[4px] mx-auto rounded-b-md relative z-10 border-t border-black/20"></div>
              </div>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
