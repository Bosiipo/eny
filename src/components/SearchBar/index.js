import React from 'react';
import style from './searchBar.module.css';

const SearchBar = ({handleSearch}) => {
    return (
        <div>
            <input 
                type="text"
                className={style["search__bar"]}
                onChange={handleSearch}
            />
        </div>
    )
}

export default SearchBar;