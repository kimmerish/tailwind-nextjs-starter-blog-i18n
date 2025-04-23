// components/HeroBlock.tsx
import React from 'react';

interface HeroBlockProps {
  content: string;
  language: 'uk' | 'en';
}

const HeroBlock: React.FC<HeroBlockProps> = ({ content, language }) => {
  return (
    <section className="relative flex flex-col items-center justify-center h-[70vh] bg-yellow-400 text-white text-center">
      <div className="z-10 text-5xl font-bold whitespace-pre-line">
        {content}
      </div>
      <div className="absolute bottom-4 flex gap-4 text-sm opacity-80">
        <div className="bg-yellow-300 px-4 py-2 rounded shadow">22<br />Day&apos;s</div>
        <div className="bg-yellow-300 px-4 py-2 rounded shadow">08<br />Hours</div>
        <div className="bg-yellow-300 px-4 py-2 rounded shadow">42<br />Minutes</div>
        <div className="bg-yellow-300 px-4 py-2 rounded shadow">37<br />Seconds</div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-white rounded-b-full" style={{ height: '120%' }}></div>
    </section>
  );
};

export default HeroBlock;
