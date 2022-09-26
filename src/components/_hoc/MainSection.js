import { Container } from "@mui/material";
import React from "react";

const MainSection = ({ children, className }) => {
  return (
    <div
      className={`my-16 py-10 bg-white/[0.15] px-1.5 md:px-5 rounded ${className || ""}`}
    >
      <Container maxWidth="xl">{children}</Container>
    </div>
  );
};

export default MainSection;
