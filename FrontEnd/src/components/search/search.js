import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import apiAsyncFunction from '../../api/api';
import checkValidUser from '../../middleware/checkValidUser';
import SearchTable from './searchTable';
import Navigation from '../navigation/navigation';
import SearchForm from './searchForm';
class Search extends React.Component{

    constructor(props){
        super(props);

        this.state = { 
            categories: '', 
            keywords: '', 
            modalCategories: '',
            modalKeywords: '',
            data: [{"name": '', "categories": '', "keywords": ''}],
            showValidation: false,
            showModalValidation: false,
            showResultTable: false,
            noResult: false,
            validUser: true, 
            validUserMsg : ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
        this.loadModal = this.loadModal.bind(this);
        this.updateDocument = this.updateDocument.bind(this);
        this.deleteDocument = this.deleteDocument.bind(this);

        let userDetails = sessionStorage.userDetails;
        if(userDetails === undefined){
            return;
        }
        else {
            let userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
            this.userId = userDetails.id;
        }
    }

    handleChange(event){
        this.setState({showValidation: false});
        this.setState({[event.target.name]: event.target.value});
    }

    processApiCall(method,url,payload,action){
        let apiCall = apiAsyncFunction(method,url,payload,action);
        apiCall.then(result => {
            if(result.responseStatus === 200){
                if(action === 'delete'){
                    let resultItem = JSON.parse(result.responseText);
                    let arr = this.state.data;
                    let newArr = arr.filter(function(item) {
                        return item._id != resultItem._id;
                    });
                    this.setState({data: newArr});
                }

                else if(action === "update"){
                    let resultItem = JSON.parse(result.responseText);
                    let arr = this.state.data;
                    let i = arr.findIndex(o => o._id === resultItem._id);
                    if (arr[i]) { arr[i] = resultItem } else { arr.push(resultItem); }
                    this.setState({data: arr});
                }

                else if(action === "search"){
                    let resultItems = JSON.parse(result.responseText);
                    this.setState({data: resultItems, noResult: false, showResultTable: true});
                }
            }

            else if(result.responseStatus === 404){
                this.setState({noResult: true, showResultTable: false});
            }
            
            else if(result.responseStatus === 400 || result.responseStatus === 500){
                this.setState({validUser: false, validUserMsg: "Invalid User! Please register!"});
            }
        });

        apiCall.catch(result => {
        });
    }

    deleteDocument(event){
        let id = event.target.id;
        checkValidUser() != false ? this.processApiCall('DELETE','document/delete/'+id, null, 'delete') :
        this.setState({validUser: false, validUserMsg: "You are not logged in yet. Please login yourself!"});
    }

    updateDocument(event){
        if(checkValidUser() != false){
            let docCateogry = document.getElementById('docCategory');
            let docKeyword = document.getElementById('docKeyword');
            let id = event.target.id;

            if(docCateogry.value === "" && docKeyword.value === ""){
                this.setState({showModalValidation: true});
                return;
            }
            else {
                let payload={ "categories":docCateogry.value.toLowerCase(), "keywords":docKeyword.value.toLowerCase()};
                this.processApiCall('PUT','document/update/'+id, payload, 'update');
            }
        }

        else { this.setState({validUser: false, validUserMsg: "You are not logged in yet. Please login yourself!"}); }
    }
   

    search(){
        if(checkValidUser() != false){
            if(this.state.categories === "" && this.state.keywords === ""){
                this.setState({showValidation: true});
                return;
            }
            else {
                let payload={"categories":this.state.categories.toLowerCase(),"keywords":this.state.keywords.toLowerCase()}; 
                this.processApiCall('POST','document/search/', payload, 'search');
            }
        }
        else { this.setState({validUser: false, validUserMsg: "You are not logged in yet. Please login yourself!"}); }
    }

    loadModal(event) {
            let button = $(event.target);
            let docName = button.data('name');
            let docCategory = button.attr('data-categories');
            let docKeywords = button.attr('data-keywords'); 
            let docId = button.attr('data-id'); 
            let modal = $("#myModal");
            modal.find('.btnId').attr('id', docId);
            modal.find('#docName').text(docName);
            modal.find('#docCategory').val(docCategory);
            modal.find('#docKeyword').val(docKeywords);
    }
    render(){
        return(
            <div className="main">
                <Navigation {...this.props}/>
                <div className="main-container">
                    {this.state.loggedIn === false && <div className="toast-message">{this.state.validUserMsg}</div>}
                    <div className="upload-images"></div>
                    <p className="upload-text">Search your documents here...</p>  
                    <div className="content">
                        <SearchForm  handleChange={this.handleChange} search={this.search} showValidation={this.state.showValidation}/>
                        {this.state.noResult === true && <div className="invalid-feedback">No Results Found!</div>}
                    </div>
                </div>
                {this.state.showResultTable === true && 
                    <SearchTable 
                        searchresult={this.state.data}
                        userId={this.userId} 
                        loadModal={this.loadModal}
                        deleteDocument = {this.deleteDocument}
                        updateDocument = {this.updateDocument}
                        showModalValidation = {this.showModalValidation}
                    />
               }
            </div>
        );
    }
}

export default Search;