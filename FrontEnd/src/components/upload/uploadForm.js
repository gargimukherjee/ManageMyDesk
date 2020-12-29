import React from 'react';

const UploadForm = ({fileDisabled,handleChange,showValidation,uploadDocument}) => {
    return(
        <form className="form-group">
            <ul>
                <li className="text-center">
                
            {/* <div className="progress">
                <div className="progress-bar" role="progressbar"></div>
            </div> */}
            <label for="myFileField" className="btn btn-primary file-upload-btn">Choose a file
            <input type="file" id="myFileField" name="myFile" disabled={fileDisabled} className="inputfile" />
            </label>
            
                </li>
                <li>
                <label className="form-label">Assign category to your document</label>
            <input type="text" id="docCategory" name="docCategory" className="form-control" placeholder="Document Category" onChange={handleChange}/>
           
                </li>
                <li>
                <label className="form-label">Assign keywords to you document</label>
            <input type="text" id="docKeywords" name="docKeywords" className="form-control" placeholder="Document Keywords" onChange={handleChange}/>
            {showValidation === true &&
                <p className="invalid-feedback">
                    Please upload a file and mention category and keywords for the same.
                </p>
            }
                </li>
                <li className="btn-holder">
                    <button type="button" id="submit" name="submit" className="btn btn-primary" onClick={uploadDocument} disabled={fileDisabled}>Submit Form</button>
                </li>
            </ul>
        </form>
    );
};

export default UploadForm;