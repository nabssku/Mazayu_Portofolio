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

        <div className={`absolute hidden sm:block top-8 -right-40 w-[28.25rem] transition group-hover:scale-[1.04] group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2`}>
          {isMobile ? (
            /* iPhone Mockup */
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[30rem] w-[15rem] shadow-xl">
              <div className="w-[3px] h-[32px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
              <div className="w-[3px] h-[46px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
              <div className="w-[3px] h-[46px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
              <div className="w-[3px] h-[64px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
              <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-gray-800">
                <Image
                  src={imageUrl}
                  alt="Project Phone Mockup"
                  className="w-full h-full object-cover"
                  quality={95}
                  width={300}
                  height={600}
                />
              </div>
            </div>
          ) : (
            /* Macbook Mockup */
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[18rem] w-[28rem]">
              <div className="rounded-lg overflow-hidden h-full bg-white dark:bg-gray-800">
                <Image
                  src={imageUrl}
                  alt="Project Laptop Mockup"
                  className="w-full h-full object-cover"
                  quality={95}
                  width={600}
                  height={400}
                />
              </div>
              <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[12px] w-[32rem] -left-[2rem]"></div>
              <div className="relative mx-auto bg-gray-800 dark:bg-gray-600 rounded-b-md h-[4px] w-[4rem] -left-[2rem]"></div>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
