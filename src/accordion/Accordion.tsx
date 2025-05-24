import React from 'react';
import AccordionItem from './AccordionItem';

export const Accordion: React.FC = () => {
  return (
    <div className="max-w-md mx-auto mt-10">
      <AccordionItem title="Section 1">
        This is the content for Section 1.
      </AccordionItem>
      <AccordionItem title="Section 2">
        This is the content for Section 2.
      </AccordionItem>
      <AccordionItem title="Section 3">
        This is the content for Section 3.
      </AccordionItem>
    </div>
  );
};

