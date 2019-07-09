const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write(
          '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
        );
        res.write('</html>');
        return res.end(); // return will prevent the code below the if statement from executing
      }
      if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
          console.log(chunk);
          body.push(chunk);
        });
        return req.on('end', () => {
          const parsedBody = Buffer.concat(body).toString();
            // at this point, `body` has the entire request body stored in it as a string   
          const message = parsedBody.split('=')[1];
            // fs.writeFileSync('message.txt', message);
            //  writeFileSync() will prevent other code from running until it is done, which could slow down your app
            //  Better practice is to use writeFile() and move the res. logic into the callback
          fs.writeFile('message.txt', message, err => {
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end(); // return will prevent the code below the if statement from executing
          });
        });
      }
     // This is a very cumbersome method, this is essentially what express.js does for us in more elegant way
      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write('<head><title>My First Page</title><head>');
      res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
      res.write('</html>');
      res.end(); // Don't write anymore after res.end()
};
    
module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded text'
};