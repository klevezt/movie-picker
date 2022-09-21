import { useEffect, useCallback, useState } from "react";

const useValidator = (ref) => {
  const [uppercaseError, setUppercaseError] = useState(false);
  const [uppercaseSuccess, setUppercaseSuccess] = useState(false);

  const [numberError, setNumberError] = useState(false);
  const [numberSuccess, setNumberSuccess] = useState(false);

  const [specialError, setSpecialError] = useState(false);
  const [specialSuccess, setSpecialSuccess] = useState(false);

  const [lengthError, setLengthError] = useState(false);
  const [lengthSuccess, setLengthSuccess] = useState(false);

  const checkNumberValidity = useCallback(() => {
    if (!ref.match("^.*[0-9].*$")) {
      setNumberError(true);
      setNumberSuccess(false);
    } else {
      setNumberError(false);
      setNumberSuccess(true);
    }
    if (ref.length === 0) {
      setNumberError(false);
      setNumberSuccess(false);
    }
  }, [ref]);

  const checkUppercaseValidity = useCallback(() => {
    if (!ref.match("^.*[A-Z].*$")) {
      setUppercaseError(true);
      setUppercaseSuccess(false);
    } else {
      setUppercaseError(false);
      setUppercaseSuccess(true);
    }
    if (ref.length === 0) {
      setUppercaseError(false);
      setUppercaseSuccess(false);
    }
  }, [ref]);

  const checkSpecialValidity = useCallback(() => {
    if (!ref.match("^.*[!@#$%^&*()+_?].*$")) {
      setSpecialError(true);
      setSpecialSuccess(false);
    } else {
      setSpecialError(false);
      setSpecialSuccess(true);
    }
    if (ref.length === 0) {
      setSpecialError(false);
      setSpecialSuccess(false);
    }
  }, [ref]);


  const checkLengthValidity = useCallback(() => {
    if (ref.length < 8 || ref.length > 20) {
      setLengthError(true);
      setLengthSuccess(false);
    } else {
      setLengthError(false);
      setLengthSuccess(true);
    }
    if (ref.length === 0) {
      setLengthError(false);
      setLengthSuccess(false);
    }
  }, [ref]);

  useEffect(() => {
    checkUppercaseValidity();
    checkNumberValidity();
    checkSpecialValidity();
    checkLengthValidity();
  }, [
    checkLengthValidity,
    checkUppercaseValidity,
    checkNumberValidity,
    checkSpecialValidity,
  ]);

  return [
    uppercaseError,
    uppercaseSuccess,
    numberError,
    numberSuccess,
    specialError,
    specialSuccess,
    lengthError,
    lengthSuccess,
  ];
};

export default useValidator;
