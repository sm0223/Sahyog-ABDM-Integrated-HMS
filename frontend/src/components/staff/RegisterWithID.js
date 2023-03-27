const RegisterWithID = (props)=> {
    return (
        <div className="container">
          <h1>Register Patient </h1>
          <form >
            <div className="form">
              <label htmlFor="email">Health ID</label><br/>
              <input className="input" type="text" id="healthId" onChange={props.handleChangeHealthId}/> <br/>
              {props.
                  showOTPInput && <div> <label htmlFor="email">Enter OTP </label> <br/>
                <input type="text" id="otp" onChange={props.handleChangeOTP}/>
              </div>}<br/>
            </div>
            {!props.showOTPInput && <button className= "btn btn-primary" type="button" onClick={props.handleSubmit}> Submit</button>}
            {props.showOTPInput && <button type="button" className= "btn btn-primary" onClick={props.handleOTPSubmit}> Verify OTP</button>}
          </form>
        </div>
    );
}
export default RegisterWithID;