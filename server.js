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
const driverRoute = require("./routes/driver.router");
const inspectorRoute = require("./routes/inspector.route");

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
router.use("/bus", busRoute);
router.use("/driver", driverRoute);
router.use("/employee", inspectorRoute);

app.use(config.get("root"), router);

app.get("/", (req, res) => res.send("Sri Lankan Airline Backend Api Running"));

/*****************************************************************************************************************************
 * Execution 
 *****************************************************************************************************************************/
const port = 5000 || process.env.PORT;
console.log(port)
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});