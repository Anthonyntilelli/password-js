'use strict';

// Submit action with Fetch.
class SubmitAction {
  // Path must start with `/`
  // resolveOK - action on a 2xx.
  // resolveNotOK - action when not 2xx.
  // reject - action on network failure or permission issue.
 static get(path, resolveOK, resolveNotOK, reject){
  const configObj = this._mkConfigObj('GET', null);
  configObj.body = undefined;
  this._fetchRequest(path, configObj,  resolveOK, resolveNotOK, reject)
}
static post(path, bodyObj, resolveOK, resolveNotOK, reject){
  const configObj = this._mkConfigObj('POST', bodyObj);
  this._fetchRequest(path, configObj,  resolveOK, resolveNotOK, reject)
}
  static put(path, bodyObj, resolveOK, resolveNotOK, reject){
    const configObj = this._mkConfigObj('PUT', bodyObj);
    this._fetchRequest(path, configObj,  resolveOK, resolveNotOK, reject)
  }
  static delete(path, bodyObj, resolveOK, resolveNotOK, reject){
    const configObj = this._mkConfigObj('DELETE', bodyObj);
    this._fetchRequest(path, configObj,  resolveOK, resolveNotOK, reject)
  }
  static _mkConfigObj(method, bodyObj){
    return {
      method: method,
      headers: {
        "Content-Type": 'application/json;charset=utf-8',
        'Accept': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(bodyObj)
    };
  }
  static _fetchRequest(path, configObj, resolveOK, resolveNotOK, reject) {
    const url = `${window.location.protocol}//${window.location.host}` + path;
    fetch(url, configObj)
   .then(response => {
     if (response.ok) {
      response.json().then(data => resolveOK(data))
      .catch(error => reject(error.message));
     } else {
      response.json().then(data => resolveNotOK(data))
      .catch(error => reject(error.message));
     }
    })
   .catch(error => reject(error.message));
  }
}
