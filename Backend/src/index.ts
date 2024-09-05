import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
})
import Sequelize  from './db/index'
import {app} from "./app"



const port = process.env.PORT || 3000

Sequelize.authenticate()
.then(()=>{
    Sequelize.sync({force: true})
    .then(()=>{ 
        console.log("\nSync successfull \n")
    }).catch((error)=>{console.log("\nSync Error:", error.message," \n")})

    app.on("error", (error)=>{
        console.log("Error:", error);
        throw error
    })
    console.log("\nConnected to: " ,Sequelize.options.dialect)
    console.log("Host: ", Sequelize.config.host,"\n")
    app.listen(port, ()=>{
        console.log(`\nListening to Port: ${port}\nLink: http://localhost:${port}\n`);
    })
})
.catch((error)=>{
    console.log("PostgreSQL Connection Error:", error);
})
