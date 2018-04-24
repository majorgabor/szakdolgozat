
function handleResponse(response) {
    // console.log('response:', response);
    if(response.status === 200 || response.status === 400) {
        return response.text().then(function(text) {
            return text && text !== '' ? JSON.parse(text) : {}
        });

    } else {
        console.log('status number');
        return response.status;
    }
}


export function fetchAjax(url, options, success) {
    console.log('fetching data');

    fetch(url, options)
    .then(handleResponse)
    .then(function(data) {
        // console.log('fetchAjax success:', data);
        success(data);
    })
    .catch(function(error) {
        console.log('fetchAjax error:', error);
    });
}