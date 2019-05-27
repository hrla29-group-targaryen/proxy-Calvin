const express = require('express')
const proxy = require('http-proxy-middleware')
const cors = require('cors')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//serving static files to the user's browser
app.use('/', express.static(path.resolve(__dirname, "../public")))

//proxing requests from index.html
app.use('/restaurants', proxy ({
 target:'http://localhost:4000',
 router: {
//    '/nav_intro': 'http://localhost:3001',
//    '/time_sponsored': 'http://localhost:3002',
   '/menu_cart': 'http://localhost:3100',
   // '/reviews_footer': 'http://localhost:3004',
 },
 changeOrigin: true
}))

//listening on port 3000
app.listen(PORT, ()=> console.log("Server is up and running on", PORT))