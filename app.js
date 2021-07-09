// import config from "./config.json";
const express = require("express");
const bodyParser = require("body-parser");

const util = require("./module/utilZPLPrinter");
var isOdd = true; // Check Array of fakeAPI
const printerName = "ZDesigner ZD230-203dpi ZPL";

const app = express();
app.use(bodyParser.json());

// Set up CORS Middleware and logging
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, x-access-token, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, HEAD"
  );
  console.log(req.method, req.originalUrl);
  next();
});

app.post("/zpl_print", (req, res) => {
  // Get data from request body
  let _data = req.body;

  // let _data = [
  //   {
  //     import_date: "2021-07-07",
  //     product_id: "53080111",
  //     description: "WP020035",
  //     packing_list: "GRM_P10621_10",
  //     model: "Original",
  //     color: "American walnut",
  //     surface: "Sanding corrugated",
  //     width: 200,
  //     thick: 250,
  //     length: 5850,
  //     qty: "4",
  //     qty_per_pack: "5",
  //     serial_number: "173500221GR210704001PK001CKEA46",
  //   },
  // ];

  // console.log(_data);

  // Check template
  // if (_data.length % 2 == 0) {
  //   //console.log("--->templateDUAL");
  //   isOdd = false;
  // }

  // Check Printer Zebra Name
  printerName = util.CheckPrinterName();

  // Command Print on ZPL Format
  util.mappingItemToTemplate(printerName, isOdd, _data);

  res.status(201).json({ status: "success", data: _data });
});

app.get("/", (req, res) => {
  res.send("ZPL Printer Backend is running");
});

app.listen(4000, () => {
  console.log("Start server at port 4000.");
});
