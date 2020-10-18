
//The querySelector() method returns the first element that matches a specified CSS selector
const weatherForm = document.querySelector('form')  //get the form element
const search = document.querySelector('input')  //get the input element
const messageOne = document.querySelector('#message-1') //get the paragraph element with id='message-1'
const messageTwo = document.querySelector('#message-2') //get the paragraph element with id='message-2'
const $useCurrentLocationButton = document.querySelector('#get-location')
const $searchButton = document.querySelector('#search')

$useCurrentLocationButton.addEventListener('click', (e) => {
    messageOne.textContent = 'Loading...'   //show loading... while fetching results
    messageTwo.textContent = ''

    if (!navigator.geolocation) {       //when browser does not support geolocation
        return alert('Geolocation is not supported by your browser!')
    }
    e.preventDefault()  //prevents refreshing of the whole page

    //fetch coordinates using browser's geolocation API
    navigator.geolocation.getCurrentPosition((position) => {
        const location = `${position.coords.longitude},${position.coords.latitude}`
        fetch('/weather?address=' + location).then((response) => {  //fetch() passess the address as a query to server side js
            //which then fetches the weather data as returns it as a response
    
            //The json() method takes a Response stream and reads it to completion.
            // It returns a promise that resolves with the result of parsing the body text as JSON.
            response.json().then((data) => {
                if(data.error){
                    messageOne.textContent = data.error
                }
                else{
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecastData
                }
            
            })
        })
    })
})

$searchButton.addEventListener('click', (e) => {     //on submit do the following
    messageOne.textContent = 'Loading...'   //show loading... while fetching results
    messageTwo.textContent = ''
    
    const location = search.value   //get the address from input element
    e.preventDefault()              //prevents refreshing of the whole page

    //The Fetch API provides an interface for fetching resources (including across the network)
    //similar to XMLHttpRequest
    fetch('/weather?address=' + location).then((response) => {  //fetch() passess the address as a query to server side js
        //which then fetches the weather data as returns it as a response

        //The json() method takes a Response stream and reads it to completion.
        // It returns a promise that resolves with the result of parsing the body text as JSON.
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            }
            else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastData
            }
        
        })
    })
})