function apiAsyncFunction(method,url,payload,action,uploadProgree) {
    let baseApiUrl = "http://localhost:4000/api/";
    let xhttp = new XMLHttpRequest();
    xhttp.open(method, baseApiUrl + url, true);

    let apiPromise = new Promise((resolve, reject) => {
        xhttp.onload = () => { resolve({"responseText": xhttp.responseText, "responseStatus": xhttp.status}); };
        xhttp.onerror = () => reject(xhttp.responseText);
      });

    if(action === "login" || action === "registration"){
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send(JSON.stringify(payload)); 
    }
    else{
        let userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
        let token = userDetails.token;
        xhttp.setRequestHeader('x-auth-token', token);
        if(action === 'delete'){
            xhttp.send();
        }
        else if(action === 'search' ){
            xhttp.setRequestHeader('Content-type', 'text/plain');
            xhttp.send(JSON.stringify(payload));
        }
        else if(action === "upload"){
            if(uploadProgree){ 
                xhttp.upload.addEventListener("progress", uploadProgree);
            }
            xhttp.send(payload);
        }
    }
    return apiPromise;
    
  }
  
  export default apiAsyncFunction;