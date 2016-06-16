const apiKey = 'c3b2666e-7427-4346-bca3-da2774945210';

export const get = (url) => {
  // Return a new promise.
  return new Promise((resolve, reject) => {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();

    req.open('GET', url);
    req.setRequestHeader('Authorization', 'Basic ' + window.btoa(apiKey+':') );

    req.onload = () => {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = () => {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}

export const getJsonP = (url) => {
  return get(url).then(JSON.parse).catch(function(err) {
    console.log("getJSON failed for", url, err);
    throw err;
  });
};