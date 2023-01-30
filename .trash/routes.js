const fs = require('fs');


const requestHandler = (req,res) => {
    
    const url = req.url;
    const method = req.method;
    
    if(url === '/'){
        
        res.write('<html>');
        res.write('<head><title>Node App Form</title></head>');
        res.write('<body>  <form action="/message" method="post"> <input type="text" name="message"> <input type="submit" value="submit"> </form> </body>');
        res.write('</html>');
        return res.end();
    }

    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
        
        
    }

    res.setHeader('Content-Type', 'text/html')
    res.write('<html>');
    res.write('<head><title> Node Home</title></head>');
    res.write('<body> <h1>i am learning node js.</h1> </body>');
    res.write('</html>');
    res.end();
};

// module.exports = requestHandler;