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
      className="group"
    >
      <section className="bg-gray-100 max-w-[42rem] border border-black/5 rounded-lg overflow-hidden sm:pr-8 relative sm:h-[20rem] hover:bg-gray-200 transition dark:text-white dark:bg-white/10 dark:hover:bg-white/20">
        <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">
            {description}
          </p>
          <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto">
            {tags.map((tag, index) => (
              <li
                className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Mockup container: positioned on the right half, vertically centered */}
        <div className="absolute hidden sm:flex sm:items-center sm:justify-center top-0 right-0 h-full w-[55%] transition group-hover:scale-[1.04] group-hover:-translate-x-2 group-hover:translate-y-2 group-hover:-rotate-2 overflow-hidden">
          {isMobile ? (
            /* iPhone Mockup — scaled to ~11rem tall */
            <div className="relative border-gray-800 bg-gray-800 border-[10px] rounded-[2rem] h-[11rem] w-[5.5rem] shadow-xl flex-shrink-0">
              {/* Side buttons */}
              <div className="w-[2px] h-[1.2rem] bg-gray-700 absolute -left-[12px] top-[1.8rem] rounded-l-lg"></div>
              <div className="w-[2px] h-[1.6rem] bg-gray-700 absolute -left-[12px] top-[3.4rem] rounded-l-lg"></div>
              <div className="w-[2px] h-[1.6rem] bg-gray-700 absolute -left-[12px] top-[5.4rem] rounded-l-lg"></div>
              <div className="w-[2px] h-[2.2rem] bg-gray-700 absolute -right-[12px] top-[4rem] rounded-r-lg"></div>
              {/* Screen */}
              <div className="rounded-[1.4rem] overflow-hidden w-full h-full bg-white dark:bg-gray-800">
                <Image
                  src={imageUrl}
                  alt="Project Phone Mockup"
                  className="w-full h-full object-cover"
                  quality={95}
                  width={220}
                  height={440}
                />
              </div>
            </div>
          ) : (
            /* Macbook Mockup — scaled to fit card height */
            <div className="w-full px-2">
              {/* Screen */}
              <div className="border-gray-800 bg-gray-800 border-[6px] rounded-t-lg w-full" style={{ aspectRatio: '16/10' }}>
                <div className="overflow-hidden w-full h-full rounded-sm bg-white dark:bg-gray-800">
                  <Image
                    src={imageUrl}
                    alt="Project Laptop Mockup"
                    className="w-full h-full object-cover"
                    quality={95}
                    width={600}
                    height={375}
                  />
                </div>
              </div>
              {/* Base */}
              <div className="bg-gray-900 dark:bg-gray-700 rounded-b-lg h-[5px] w-full"></div>
              <div className="bg-gray-800 dark:bg-gray-600 rounded-b-md h-[3px] w-1/4 mx-auto"></div>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
