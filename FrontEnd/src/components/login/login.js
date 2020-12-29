import React from 'react';
import { Link } from 'react-router';
import  apiAsyncFunction from '../../api/api';
import LoginForm from './loginForm';
class Login extends React.Component{
    constructor(props){
        super(props);
        this.loginUser = this.loginUser.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            email: '',
            password: '',
            showEmptyFieldValidation: false,
            invalidUserDetails: false
        };
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value, 
            showEmptyFieldValidation: false, 
            invalidUserDetails: false
        });
    }

    loginUser(){
        if( this.state.email === "" || this.state.email.indexOf('@') == -1 || this.state.password === ""){
            this.setState({showEmptyFieldValidation: true});
            return;
        }
        else {
            let payload={ "email":this.state.email, "password":this.state.password };
            let login = apiAsyncFunction('POST','login', payload, 'login');
            
            login.then(result => {
                if(result.responseStatus === 200){
                    sessionStorage.setItem("userDetails", result.responseText);
                    this.props.history.push("/home");
                }
                else if(result.responseStatus === 400 || result.responseStatus === 500){
                    this.setState({invalidUserDetails:  true});
                }
            });
            login.catch(result => {
            });
        }
    }

    render(){
        return(
            <div className="main">
                <div className="login-container">
                    <div className="user-container">
                        <div className="logo"></div>
                        <p className="logo-text">Manage My Desk</p>
                    </div>
                   <div className="login-form">
                        <p className="heading">Manage your Documents.</p>
                        <p className="sub-heading">Login yourself here...</p>
                        <LoginForm
                            handleChange = {this.handleChange}
                            showEmptyFieldValidation = {this.state.showEmptyFieldValidation}
                            invalidUserDetails = {this.state.invalidUserDetails}
                            loginUser = {this.loginUser}
                        />
                    </div>
                </div>
            </div>
        );
    }}

export default Login;