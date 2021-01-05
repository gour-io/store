// const http = require('http')
// const fs = require('fs')


// const server = http.createServer((req, res) => {
//     res.setHeader('Content-Type', 'text/html');
//     if(req.url === '/') {
//         res.write('<html>')
//         res.write('<body><form action="/message" method="post"><input type="text" name="message"/><button type="submit">submit</button></form></body>')
//         res.write('</html>')
//         return res.end()
//     }

//     if(req.url === '/message' && req.method === 'POST') {
//         const body = []
//         req.on('data', (chunk)=> {
//             body.push(chunk)
//         })
//          return req.on('end', () => {
//             const parsedData = Buffer.concat(body).toString();
//             const message = parsedData.split("=")[1]
//             fs.writeFile('message.txt', message, () => {
//                 res.statusCode = 302; //for redirection
//                 res.setHeader('Location', '/');
//                 return res.end();               
//             });
//         });
        
//     }
//     res.write('<html>')
//     res.write('<head><title>This is a title</title></head>')
//     res.write('<body><h1>This is from server side</h1></body>')
//     res.write('</html>')
//     res.end()
// })

// server.listen(3000)

const products = []

class Product {
    constructor(title, desctiption = 'This is demo', age=0, address="H.no 60, satnami nagar, sonagiri") {
        this.title = title;
        this.desctiption = desctiption;
        this.age = age;
        this.address = address;
    }

    save() {
        products.push(this)
    }

    static fetchAll() {
        return this.products
    }
}

const obj1 = new Product('Deepak', "big brother", 27, "Crystal IT Park")
const obj2 = new Product('Manish', "Alder brother")
const obj3 = new Product('Gayatri', "Papa ki pari")
const obj4 = new Product('Aman', 'My student')
const obj5 = new Product('Shahil')
const obj6 = new Product('Tipsi', 'my new pet')

obj1.save()
obj2.save()
obj3.save()
obj4.save()
obj5.save()
obj6.save()

console.log(Product.fetchAll())
console.dir(obj1)