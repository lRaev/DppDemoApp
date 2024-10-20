import React from 'react';

const StickyText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white text-sm py-2 text-center z-[9999]">
      {text}
    </div>
  );
};

export default StickyText;