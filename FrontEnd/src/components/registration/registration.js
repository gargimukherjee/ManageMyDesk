import React from 'react';
import  apiAsyncFunction from '../../api/api';
import RegistrationForm from './registrationForm';
class Registration extends React.Component{

    constructor(props){
        super(props);

        this.state = { 
            username: "", 
            email: "", 
            password: "", 
            registrationSuccessful: false, 
            validationMessage: "", 
            showValidationMessage: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value, 
            registrationSuccessful: false, 
            validationMessage: "", 
            showValidationMessage: false
        });
    }

    registerUser(){
        if( this.state.email === "" || this.state.email.indexOf('@') == -1 || 
            this.state.password === "" || this.state.username === ""){
                this.setState({
                    showValidationMessage: true, 
                    validationMessage: "All fields are mandatory and should be propery filled."
                });
                return;
        }
        else {
            let payload={ "name": this.state.username, "email":this.state.email, "password":this.state.password };
            let registration = apiAsyncFunction('POST','registration', payload, 'registration');

            registration.then(result => {
                if(result.responseStatus === 200){
                    this.setState({ registrationSuccessful: true });
                }
                else if(result.responseStatus === 400){
                    this.setState({
                        showValidationMessage: true, 
                        validationMessage: "User already exists...please login with the credentials",
                        registrationSuccessful: false
                    });
                }
            });
            registration.catch(result => {
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
                    {this.state.registrationSuccessful === true &&
                        <div className="toast-message">Registration successful. Login with valid credentials.</div>
                    }
                    <RegistrationForm
                        handleChange = {this.handleChange}
                        showValidationMessage = {this.state.showValidationMessage}
                        validationMessage = {this.state.validationMessage}
                        registerUser = {this.registerUser}
                    />
                </div>
            </div>
        );
    }}

export default Registration;

