import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AddUser from './addUser';

class Header extends Component {
    constructor(props){
        super(props);
    }
    addUser(){
        console.log("test");
        ReactDOM.render(<AddUser/>, document.querySelector("#container"));
    }
    render(){
        return (
            <div>
                <button className="btn btn-primary" onClick={this.addUser}>Add User</button>
            </div>
        )
    }
}

export default Header;