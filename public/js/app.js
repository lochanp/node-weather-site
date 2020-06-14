console.log('is this workin');

const weatherSearch = document.querySelector('button');
const search = document.querySelector('input');
const msg1 = document.querySelector('#message-1');
const msg2 = document.querySelector('#message-2');


weatherSearch.addEventListener('click', (e) => {
    e.preventDefault();
    const location = search.value;
    msg1.textContent = 'loading..';
    msg2.textContent = '';
        fetch('http://localhost:3000/weather?address='+ location ).then((Response) => {
            Response.json().then((data) =>{
                if(data.error) {
                    msg1.textContent = 'unable to find the location.Try another address';
                }
                else {
                    msg1.textContent = data.forecast;
                    msg2.textContent = data.location;
                }
        })
    })
})

