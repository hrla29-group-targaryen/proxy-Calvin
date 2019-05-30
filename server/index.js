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
 target:'https://grubhub-mock-calvin.herokuapp.com/',
 router: {
   '/nav_intro': 'https://nav-about.herokuapp.com',
   '/time_sponsored': 'https://time-sponsored.herokuapp.com',
   '/menu_cart': 'https://menu-cart.herokuapp.com',
   '/reviews_footer': 'https://reviews-footer.herokuapp.com',
 },
 changeOrigin: true
}))

//listening on port 3000
app.listen(PORT, ()=> console.log("Server is up and running on", PORT))