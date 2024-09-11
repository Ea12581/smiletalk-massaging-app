import {useRef} from "react";

function Display({setVal}){
    const nameRef = useRef(null);

  //check if ready to submit
  function setDis(){
      setVal(nameRef.current.value);
  }

    return(
        <div className="lable">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Display Name</span>
                </div>
                <input
                ref={nameRef}
                onKeyUp={() => {
                  setDis();
                }}
                type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1"></input>
            </div>
        </div>
        
        )
}
export default Display;