import { useRef, useState, useEffect } from "react";

function Password({ setIsReady, setVal }) {
  const pass1Ref = useRef(null);
  const pass2Ref = useRef(null);
  const [isMatch, setIsMatch] = useState(true);
  const [isCorrect, setIsCorrect] = useState(true);

  //check that the password is longer than 5 letters
  const checkCorrect = () => {
    const pass1 = pass1Ref.current.value;
    const isCorrect = pass1.length > 6;
    const hasUppercase = /[A-Z]/.test(pass1);
    const hasLowercase = /[a-z]/.test(pass1);
    setIsCorrect(isCorrect && hasUppercase && hasLowercase);
  };

  //check that the password validation is equal to the original password
  const checkValid = () => {
    const pass1 = pass1Ref.current.value;
    const pass2 = pass2Ref.current.value;
    const result = pass1 === pass2;
    setIsMatch(result);
  };

  //check if ready to submit
  useEffect(() => {
    let pass1 = pass1Ref.current.value;
    let pass2 = pass2Ref.current.value;
    if (isMatch && isCorrect && pass1 != '' && pass2 != '') {
      setIsReady(true);
      setVal(pass1);
    } else {
      setIsReady(false);
    }
  }, [isMatch, isCorrect, setIsReady, setVal]);

  return (
    <>
      {!isCorrect && (
        <div className="lable alert alert-danger">
          The password is shorter than 6 letters and has no upper case or lower case in it
        </div>
      )}
      <div className="container  lable">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Password
            </span>
          </div>
          <input
            ref={pass1Ref}
            onKeyUp={() => {
              checkCorrect();
            }}
            type="password"
            className="form-control"
            aria-label="password"
            aria-describedby="basic-addon1"
          ></input>
        </div>
      </div>
      {isCorrect && !isMatch && (
        <div className="lable alert alert-danger">
          The verification has no match
        </div>
      )}
      <div className="container  lable">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Password Verification
            </span>
          </div>
          <input
            ref={pass2Ref}
            onKeyUp={() => {
              checkValid();
            }}
            type="password"
            className="form-control"
            aria-label="password"
            aria-describedby="basic-addon1"
          ></input>
        </div>
      </div>
    </>
  );
}

export default Password;

 