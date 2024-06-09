let express = require("express"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  mongodb = require("./services/database/mongodb.service"),
  bodyParser = require("body-parser"),
  route = require("./routes"),
  morgan = require("morgan"),
  compression = require("compression");

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
  .connect(mongodb.db, {
    dbName: mongodb.dbName,
    maxPoolSize: 10,
    minPoolSize: 2,
    socketTimeoutMS: 4500,
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 5000,
    /* useNewUrlParser: true,
    useUnifiedTopology: true, */
  })
  .then(
    () => {
      console.log("Mongodb connected successfully.");
    },
    (error) => {
      console.log("Cannot connect to database " + error);
    }
  );

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(compression());
}

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// API route
route(app);
app.use("/api/assets", express.static("./assets"));
app.use("/", express.static("./app"));

//Create server
const port = process.env.RUNNING_PORT || 3000;
const server = app.listen(port, () => {
  console.log("Server is running at " + port);
});

// Welcome api index page
app.get("/api", function (req, res, next) {
  res.json({ message: "Enjoy our services!" });
});

// 404 Handler
app.get("/api/*", function (req, res, next) {
  res.status(404).json({ message: "Service not found!" });
});

app.get("*", function (req, res, next) {
  res.sendFile(__dirname + "/app/index.html");
});

/////
//Error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
