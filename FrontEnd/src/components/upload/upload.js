import React from 'react';
import  apiAsyncFunction from '../../api/api';
import  checkValidUser from '../../middleware/checkValidUser';
import Navigation from '../navigation/navigation';
import UploadForm from './uploadForm';

class Upload extends React.Component{

    constructor(props){
        super(props);

        this.state={
            docCategory: "",
            docKeywords: "",
            showValidation: false,
            fileDisabled: false, 
            validUser: true, 
            validUserMsg : "",
            documentMessage: ""
        };
        this.uploadDocument = this.uploadDocument.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.progressListener1 = this.progressListener.bind(this);
        this.progressElement = null;
    }

    handleChange(event){
        this.setState({showValidation: false});
        this.setState({[event.target.name]: event.target.value});
    }

    progressListener(evt){
        if (evt.lengthComputable) {
            let percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);
            this.refs.progressElement.value = percentComplete;
        }
    }

    uploadDocument(event){
        if(checkValidUser() != false){

            let file = document.getElementById("myFileField").files[0];

            if(this.state.docCategory === "" || this.state.docKeywords === "" || file === undefined){
                this.setState({showValidation: true});
                return;
            }

            this.setState({fileDisabled: true});
            let formData = new FormData();
            formData.append("categories", this.state.docCategory.toLowerCase());
            formData.append("keywords", this.state.docKeywords.toLowerCase());
            formData.append("myFile", document.getElementById("myFileField").files[0]);
            
            let uploadDocument = apiAsyncFunction('POST','document/upload', 
                                formData, 'upload', this.progressListener1);

            uploadDocument.then(result => {
                if(result.responseStatus === 200){
                    this.setState({documentMessage: "Document upload successfully!", fileDisabled: false});
                }
                else if(result.responseStatus === 404){
                    this.setState({documentMessage: "Document upload failed"});
                }
                else if(result.responseStatus === 400 || result.responseStatus === 500){
                    this.setState({validUser: false, validUserMsg: "Invalid User! Please register!"});
                }
            });

            uploadDocument.catch(result => { });
        }

        else { this.setState({validUser: false, validUserMsg: "You are not logged in yet. Please login yourself!"}); }
    }
    render(){
        return(
            <div className="main">
            <Navigation {...this.props}/>
             
            <div className="main-container" >
                {this.state.loggedIn === false && <div className="toast-message">{this.state.validUserMsg}</div>}
                    <div className="upload-images"></div>
                    <p className="upload-text">Upload your documents here...</p>
                    <div className="content">
                    <progress value="1" max="100" ref='progressElement' className='progress-bar'></progress>
                    <UploadForm fileDisabled={this.state.fileDisabled} handleChange={this.handleChange}
                        showValidation = {this.state.showValidation} uploadDocument={this.uploadDocument} />
                    <div>{this.state.documentMessage}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Upload;