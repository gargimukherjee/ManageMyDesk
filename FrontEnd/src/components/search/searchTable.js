import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import SearchModal from './searchModal';

const SearchTable = ({searchresult, userId, loadModal, deleteDocument, updateDocument, showModalValidation}) =>{
        return(
                    <div>
                    <table className="table search-table">
                    <thead>
                        <tr>
                            
                            <th>Type</th>
                            <th className="document-name">Name</th>
                            <th className="document-category">Category</th>
                            <th className="document-keywords">Keywords</th>
                            <th colSpan="2" className="actions"></th>
                        </tr>
                    </thead>
                    <tbody>{searchresult.map(function(item, key) {
                        
                        return (
                            <tr key = {key}>
                                <td className="icons"><span className={"document-icon " + (item.name.slice((item.name.lastIndexOf(".") - 1 >>> 0) + 2))}></span></td>
                                <td className="document-name"><a href={"http://localhost:4000/public/"+ userId + "/"+item.name} download>{item.name}</a></td>
                                <td className="document-category">{item.categories}</td>
                                <td className="document-keywords">{item.keywords}</td>
                                <td>
                                    <button type="button" className="edit-icon" onClick={loadModal}
                                    data-toggle="modal" data-target="#myModal" data-name={item.name}
                                    data-categories={item.categories} data-id={item._id} data-keywords={item.keywords} ></button>
                                    <button id={item._id} type="button" className="delete-icon" onClick={deleteDocument}></button>
                                </td>
                              
                            </tr>
                            );
                        
                        }, this)}</tbody>
                    </table>

                   <SearchModal updateDocument={updateDocument} showModalValidation={showModalValidation} />

                    </div>
        );
};

export default SearchTable;