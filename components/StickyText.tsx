import React from 'react';

const StickyText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="fixed top-0 right-0 h-screen w-6 bg-gray-800 text-white text-[10px] flex items-center justify-center ">
    <div className="transform -rotate-90 whitespace-nowrap origin-center">
      {text}
    </div>
  </div>
  );
};

export default StickyText;