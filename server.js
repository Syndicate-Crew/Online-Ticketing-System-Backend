/*****************************************************************************************************************************
* Node Modules
*****************************************************************************************************************************/
const express = require("express");
const router = express.Router();
const cors = require("cors");
const mongo = require("mongoose");
const config = require("config");
/*****************************************************************************************************************************
 * Route Imports
 *****************************************************************************************************************************/

const passengerRoute = require("./routes/passenger.route");
const journeyRoute = require("./routes/journey.routes");
const busRoute = require("./routes/bus.route");

/*****************************************************************************************************************************
 * Database Connection
 *****************************************************************************************************************************/
const app = express();
app.use(express.json());
app.use(cors());

const url = config.get("db");

mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => console.log(err));

const connection = mongo.connection;

connection.once("open", () => {
    console.log("Database connected!");
});
/*****************************************************************************************************************************
 * Routes
 *****************************************************************************************************************************/
router.use("/passenger", passengerRoute)
router.use("/public/profile_pictures", express.static('./public/profile-pictures'));
router.use("/journey", journeyRoute);
router.use("/bus", busRoute)

app.use(config.get("root"), router);
/*****************************************************************************************************************************
 * Execution 
 *****************************************************************************************************************************/
const port = config.get("port");
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});