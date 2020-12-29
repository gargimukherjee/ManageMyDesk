import React from 'react';
import PropTypes from 'prop-types';

class App extends React.Component{
    render(){
        return(
            <div>{this.props.children}</div>
        );
    }
}

export default App;
