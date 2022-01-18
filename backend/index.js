import mongoose from "mongoose"
import cors from "cors"
import app from "./server.js"
import {sv_port, db_uri} from "./utils/config.js"
import log from "./utils/log.js"

// Connect mongoose to Atlas DB
try{
  mongoose.connect(db_uri);
  
  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log("MongoDB database connection established successfully");

    // Start listening on sv_port
    app.listen(sv_port, () => {
      console.log(`Server is running on port: ${sv_port}`);
    });
  });
}
catch (e){
  log.error(e);
}
