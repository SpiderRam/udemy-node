const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    var username;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Assignment One</title><head>');
        res.write('<body><h1>Welcome!<h1>');
        res.write(
            '<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Add User</button></form></body>'
        );
        res.write('</html>');
        return res.end();
    }
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        req.on('end', () => {
            username = Buffer.concat(body).toString();
            console.log(username);
        })
    }
    if (url === '/users') {
        
        res.write('<html>');
        res.write('<head><title>Users</title><head>');
        res.write('<body><h1>Users:<h1>');
        res.write(
            `<ul method="GET"><li>Hardcoded</li><li>User</li></ul></body>`
        );
        res.write('</html>');
        return res.end();
    }
});
server.listen(3000);
