const fetch = require('node-fetch'); // You might need to install node-fetch if not present, but let's try native fetch or http
// Actually, node 18+ has native fetch. Let's assume modern node or use http.
// Using standard http to avoid dependency issues.

const http = require('http');

const data = JSON.stringify({
    studentNumber: '2021022336',
    password: 'password123'
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log('BODY:', body);
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
