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
router.use("/inspector", inspectorRoute);

app.use(config.get("root"), router);

/*****************************************************************************************************************************
 * Execution 
 *****************************************************************************************************************************/

app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
    console.log(`Server started on port ${process.env.PORT}`);
});

// app.listen(5000, () => {
//     console.log(`Server started on port 5000`);
// });