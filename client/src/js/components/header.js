import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../../css/components/header.css';
import SearchResults from './searchResults';

class Header extends Component {
    constructor(props){
        super(props);
    }
    searchHandler(e){
        e.preventDefault();
        const inputValue = document.querySelector("#searchBar").value;
        ReactDOM.render(<SearchResults searchData={inputValue}/>, document.querySelector("#container"));
    }
    render(){
        return (
            <header>
                <div id="logoArea">
                    <img src="img/mern-blog-logo-white.png" alt="MERN Blog Logo"/>
                </div>
                <div id="searchArea">
                    <img
                        id="searchIcon"
                        src="img/search-icon-light-grey-xs.png"
                        onClick={this.searchHandler.bind(this)}
                    />
                    <form onSubmit={this.searchHandler.bind(this)}>
                        <input
                            id="searchBar"
                            placeholder="Search"
                            className="form-control"
                        />
                    </form>
                </div>
            </header>
        )
    }
}

export default Header;