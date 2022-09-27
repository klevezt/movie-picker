import { KeyboardArrowUp } from '@mui/icons-material';
import { Fab } from '@mui/material';
import React from 'react'
import ScrollToTop from './ScrollToTop';

const Footer = () => {
  return (
    <div className="flex items-center justify-center h-[4vh] bg-customDark text-white">
      <p className=" m-0">
        {new Date().getFullYear()} &copy; KP Work. All rights reserved.
      </p>
      <ScrollToTop>
        <Fab
          sx={{
            backgroundColor: "#f43f5e",
            color: "white",
          }}
          aria-label="scroll back to top"
        >
          <KeyboardArrowUp />
        </Fab>
      </ScrollToTop>
    </div>
  );
}

export default Footer