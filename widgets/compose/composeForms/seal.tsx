/** @format */

import { Button } from "@/components/ui/button";
import { useState } from "react";

const SealButton = () => {
  const [showSeal, setShowSeal] = useState(false);

  const handleClick = () => {
    setShowSeal(true);
  };

  return (
    <div>
      <Button
        className='bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold py-2 px-4 rounded'
        onClick={handleClick}
      >
        ማህተም ጨምር
      </Button>

      {showSeal && (
        <div className='relative '>
          <div className='absolute  right-6 bottom-1 transform -translate-y-1/2'>
            <div className='w-40 h-40  rounded-full'>
              <h1 className='text-xl font-bold mb-72 text-violet-900 py-2 px-4 rounded-full transform  -rotate-45'>
                ልዑል ሥዩም የሚኒስትር ጽ/ቤት ኃላፊ
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SealButton;
