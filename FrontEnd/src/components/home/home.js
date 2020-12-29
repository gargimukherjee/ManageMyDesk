import React from 'react';
import { Link, Redirect } from 'react-router';
import Navigation from '../navigation/navigation';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = { userName: "" };
    }

    componentDidMount(){
        let userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
        this.setState({userName:userDetails.name});
    }

    render(){
        return (
            <div className="main">
                <Navigation {...this.props}/>
                <div className="main-container welcome-container">
                    <div className="welcome-text">
                        <div className="welcome-images"></div>
                        Welcome {this.state.userName} !
                    </div>
                    <div className="text-center">
                        <Link to="/document" className="btn btn-primary upload-btn"><span>Upload a Document</span></Link>
                        <Link to="/search" className="btn btn-secondary search-btn"><span>Search a Document</span></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;