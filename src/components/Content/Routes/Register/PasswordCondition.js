import React from 'react'

const PasswordCondition = ({text, error, success}) => {
  return (
    <li
      className={`border-l-2 pl-2 m-0 text-sm  ${
        error ? "border-rose text-rose" : ""
      } ${
        success ? "border-customSuccess text-customSuccess" : ""
      } text-[#6c757d]`}
    >
      {text}
    </li>
  );
}

export default PasswordCondition