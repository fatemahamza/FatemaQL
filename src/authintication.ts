const credentials = btoa('username:password');

fetch('https://learn.reboot01.com/api/auth/signin', {
    method: 'Post',
    headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
    }
})
.then(response => response.text())
.then(data => {
    console.log(data);
    if (data) {
        localStorage.setItem('jwt', data);
    } else {
        alert('Invalid credentials');
    }
})
.catch(error => console.error('Error: ', error));

  