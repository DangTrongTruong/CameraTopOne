const app = require('./app')
const dotenv = require('dotenv')
const cloudinary = require('cloudinary')
const connectDatabase = require('./config/database')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
//config
dotenv.config({ path: "backend/config/config.env" })
// connecting to database

connectDatabase()

//image upload cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})


//config swagger
const options = {
    definition:{
        openapi:"3.0.3",
        info:{
            title:"Library API",
            version:"1.0.0",
            description:"A simple Express Library API"
        },
        servers:[
            {
                url:"http://localhost:8080"
            }
        ]
    },
    apis:["./routes/*.js"]
}
const swaggerDocs = swaggerJsDoc(options);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs))

app.listen(process.env.PORT, () => {
    console.log(`Server working on "http://localhost:${process.env.PORT}"`)
})