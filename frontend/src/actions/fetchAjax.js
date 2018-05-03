
function handleResponse(response) {
    // console.log('response:', response);
    if(response.status === 200 || response.status === 400) {
        return response.text().then(function(text) {
            return text && text !== '' ? JSON.parse(text) : {}
        });

    } else {
        // console.log('status number', response.status);
        return response.status;
    }
}


export function fetchAjax(urlPath, method, body, success) {
    // console.log('fetching data');

    fetch(
        'http://localhost:80/szakdolgozat/back-end/API/' + urlPath,
        {
            method: method,
            credentials: 'include',
            header: { 'Content-Type': 'application/json' },
            body: body,
        }
    )
    .then(handleResponse)
    .then(function(data) {
        // console.log('fetchAjax success:', data);
        success(data);
    })
    .catch(function(error) {
        console.log('fetchAjax error:', error);
    });
}