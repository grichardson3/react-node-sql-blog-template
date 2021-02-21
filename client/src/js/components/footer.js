import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Footer extends Component {
    constructor(props){
        super(props);
    }
    getDate(){
        const copyrightDate = new Date();
        return copyrightDate.getFullYear();
    }
    render(){
        return (
            <footer>
                <span id="copyrightText">Copyright &copy; {this.getDate()} - Gareth Richardson Media <br></br><span>All Rights Reserved.</span></span>
            </footer>
        )
    }
}

export default Footer;
