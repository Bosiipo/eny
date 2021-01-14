import React, {useEffect, useState} from 'react';
import style from  './filter.module.css';

const Filter = ({
    data, 
    filterBy,
    value,
    updateFilter
}) => {

    return (
        <>
           <select
            id="filter" 
            name="filter"
            value={value}
            className={style["filter"]}
            onChange={updateFilter}
            >
                <option value="">{filterBy}</option>
                {Object.keys(data).map((val) => (
                    <option value={val}>{val}</option>
                ))}
           </select> 
        </>
    )
}

export default Filter;


