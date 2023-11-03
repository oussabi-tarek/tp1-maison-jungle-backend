const express = require("express");
const cors=require("cors");
const db = require("./model/db");

db.mongoose.connect(db.url).then(()=>{
    console.log("Connected to the database!");
}).catch(err=>{
    console.log("Cannot connect to the database!",err);
    process.exit();
});

const app = express();
var corsOptions = {
    origin: "http://localhost:3000"
    };
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/plant.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
