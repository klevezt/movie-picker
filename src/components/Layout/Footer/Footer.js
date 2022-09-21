import React from 'react'

const Footer = () => {
  return (
    <div className="flex items-center justify-center h-[4vh] bg-customDark text-white">
      <p className=" m-0">
        {new Date().getFullYear()} &copy; KP Work. All rights reserved.
      </p>
    </div>
  );
}

export default Footer