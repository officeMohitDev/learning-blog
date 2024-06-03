import app from "./src/app"
import { config } from "./src/config/config";
import { connectToDb } from "./src/config/db";



const  startServer = async () => {
   await connectToDb()
    const port = config.port || 5555
    app.listen(config.port, () => {
        console.log(`server  is running on ${port}`);
    })
}


startServer()