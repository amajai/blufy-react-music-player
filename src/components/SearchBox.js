import React from "react";

const SearchBox = ({searchChange}) => {
    return(
        <div className="search">
            <input id="library-search" type='text' placeholder="Search track" onChange={searchChange}/>
        </div>
    )
}

export default SearchBox