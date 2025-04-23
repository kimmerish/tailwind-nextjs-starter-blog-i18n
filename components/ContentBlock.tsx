'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';

type Props = {
  title: string;
  text: string;
  backgroundColor: string;
};

const ContentBlock: React.FC<Props> = ({ title, text, backgroundColor }) => {
  return (
    <section className={backgroundColor}>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 20px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{title}</h2>
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </section>
  );
};

export default ContentBlock;
