const http = require('http')
const fs = require('fs')


const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    if(req.url === '/') {
        res.write('<html>')
        res.write('<body><form action="/message" method="post"><input type="text" name="message"/><button type="submit">submit</button></form></body>')
        res.write('</html>')
        return res.end()
    }

    if(req.url === '/message' && req.method === 'POST') {
        const body = []
        req.on('data', (chunk)=> {
            body.push(chunk)
        })
         return req.on('end', () => {
            const parsedData = Buffer.concat(body).toString();
            const message = parsedData.split("=")[1]
            fs.writeFile('message.txt', message, () => {
                res.statusCode = 302; //for redirection
                res.setHeader('Location', '/');
                return res.end();               
            });
        });
        
    }
    res.write('<html>')
    res.write('<head><title>This is a title</title></head>')
    res.write('<body><h1>This is from server side</h1></body>')
    res.write('</html>')
    res.end()
})

server.listen(3000)