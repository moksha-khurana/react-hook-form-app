import React, { useState } from 'react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="border rounded mb-2">
      <button
        className="w-full text-left p-4 bg-gray-100 font-semibold"
        onClick={toggleOpen}
      >
        {title}
      </button>
      {isOpen && (
        <div className="p-4 border-t bg-white text-gray-700">
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
