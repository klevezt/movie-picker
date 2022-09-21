import React from 'react'

const Headline = ({ title }) => {
  return (
    <div className="flex w-100 justify-center items-center mb-10">
      <img
        src="assets/images/section.png"
        alt="headline-logo"
        style={{
          objectFit: "contain",
        }}
      />
      <h2 className="ml-4 pl-4 border-l-2 border-rose text-5xl mb-0 ">
        {title}
      </h2>
    </div>
  );
};

export default Headline