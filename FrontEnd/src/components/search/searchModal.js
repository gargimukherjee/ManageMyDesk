import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const SearchModal = ({updateDocDetails, showModalValidation}) => {
    return (
        <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
      
            <div className="modal-header">
              <h4 className="modal-title">Document Details
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              </h4>
              
            </div>
      
            <div className="modal-body">
              <label className="form-label">Document Name</label>
              <p id="docName"></p>
              <label className="form-label">Document Category</label>
              <input type="text" className="form-control" id="docCategory"/>
              <label className="form-label">Document Keywords</label>
              <input type="text" className="form-control" id="docKeyword"/>
              {showModalValidation ===  true &&
                   <p className="invalid-feedback">Category or Keyword is mandatory.</p>
               }
            </div>
      
            <div className="modal-footer">
              <button type="button" className="btn btn-primary btnId" onClick={updateDocDetails}>Update Document Details</button>
            </div>
      
          </div>
        </div>
      </div>
    );
};

export default SearchModal;