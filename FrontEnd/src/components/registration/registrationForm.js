import React from 'react';
import { Link } from 'react-router';

const RegistrationForm = ({handleChange,showValidationMessage,validationMessage,registerUser}) => {
    return (
        <div className="login-form">
            <p className="heading">Let's get you set up</p>
            <p className="sub-heading">It should take only couple of minutes...</p>
            <form>
                <ul className="form-group">
                    <li>
                        <label className="form-label">Username</label>
                        <input type="text" name="username" className="form-control" placeholder="Username" onBlur={handleChange}/></li>
                    <li>
                        <label className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" placeholder="Email" onBlur={handleChange}/></li>
                    <li>
                        <label className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" placeholder="Password" onBlur={handleChange}/>
                        {showValidationMessage === true && <p className="invalid-feedback">{validationMessage}</p> }
                    </li>
                    <li className="btn-holder">
                        <button type="button" className="btn btn-primary user-btn" onClick={registerUser}>Register</button>
                        <Link to="/login" className="btn btn-secondary">Registered User? Login Here..</Link>
                    </li>
                </ul>
            </form>
        </div>
    );
};

export default RegistrationForm