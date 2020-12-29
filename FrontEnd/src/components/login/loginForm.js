import React from 'react';
import { Link } from 'react-router';

const LoginForm = ({handleChange,showEmptyFieldValidation, invalidUserDetails,loginUser}) => {
    return (
        <div>
        <form>
            <ul className="form-group">
            <li>
                <label className="form-label">User Email</label>
                <input className="form-control" name="email" placeholder="abc@gmail.com" type="email" onBlur={handleChange}/>
            </li>
            <li>
                <label className="form-label">Password</label>
                <input className="form-control" name="password" placeholder="******" type="password" onBlur={handleChange}/>
                {showEmptyFieldValidation === true && 
                    <p className="invalid-feedback">Email and Password is manadatory.</p>
                }
                {invalidUserDetails === true && 
                    <p className="invalid-feedback">Invalid Email or Password! Please enter valid credentials!</p>
                }
            </li>
            <li className="btn-holder">
                <button type="button" className="btn btn-primary user-btn" onClick={loginUser}>Login</button> 
                <Link to="/register" className="btn btn-secondary" type="button">New User? Register Here</Link>
            </li>
            </ul>
        </form>
        </div>
    );
};

export default LoginForm;