function checkValidUser(){
    let userDetails = sessionStorage.userDetails;
    if(userDetails == undefined){
        return false;
    }
}

export default checkValidUser;