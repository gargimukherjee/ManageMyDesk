import React from 'react';

const SearchForm = ({handleChange,search,showValidation}) => {
    return (
        <div className="form-group user-form">
            <ul>
                <li>
                <label className="form-label">Search Category</label>
            <input className="form-control" type="text" placeholder="Category" name="categories" onBlur={handleChange}/>

                </li>
                <li>
                <label className="form-label">Search Keyword/s</label>
            <input className="form-control" type="text" placeholder="Keyword" name="keywords" onBlur={handleChange}/>
            {showValidation ===  true &&
                <p className="invalid-feedback">Category or Keyword is mandatory for search.</p>
            }

                </li>
                <li className="btn-holder">
            <button type="button" className="btn btn-primary" onClick={search}>Search</button>
            </li>
            </ul>
            
            
        </div>
    );
};

export default SearchForm;