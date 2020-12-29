import React from 'react';
import { Link, Redirect } from 'react-router';

class Navigation extends React.Component{
    constructor(props){
        super(props);

        this.logoutUser = this.logoutUser.bind(this);
    }

    logoutUser(){
        sessionStorage.clear();
        this.props.history.push("/login");
    }
    render(){
        return (
            <div className="navigation">
                <Link to="/home">Home</Link>
                <Link to="/document">Upload a Document</Link>
                <Link to="/search">Search a Document</Link>
                <span className="logout" onClick={this.logoutUser}>Logout</span>
            </div>
        );
    }
}

export default Navigation;