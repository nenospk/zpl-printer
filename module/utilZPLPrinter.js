import { printer } from "printer";
const moment = require("moment");
var { templateSINGLE, templateDUAL } = require("./template");

// var objInfoSticker = {
//   _received_date1_: "",
//   _product_name1_: "",
//   _product_id1_: "",
//   _packing_list1_: "",
//   _product_code1_: "",
//   _color1_: "",
//   _surface1_: "",
//   _width1_: "",
//   _thick1_: "",
//   _length1_: "",
//   _qty1_: "",
//   _serial_number1_: "",
//   _image1_: "",

//   _received_date2_: "",
//   _product_name2_: "",
//   _product_id2_: "",
//   _packing_list2_: "",
//   _product_code2_: "",
//   _color2_: "",
//   _surface2_: "",
//   _width2_: "",
//   _thick2_: "",
//   _length2_: "",
//   _qty2_: "",
//   _serial_number2_: "",
//   _image2_: "",
// };

var objInfoSticker = {
  import_date: "",
  product_id: "",
  description: "",
  packing_list: "",
  model: "",
  color: "",
  surface: "",
  width: 0,
  thick: 0,
  length: 0,
  qty: "",
  qty_per_pack: "",
  serial_number: "",
};

const mappingItemToTemplate = (printerName, isOdd, _data) => {
  let template = templateSINGLE;
  let _mustSingleFormat = false;
  for (var i = 0; i < _data.length; i++) {
    let item = _data[i];
    objInfoSticker = {
      import_date:
        item.import_date === undefined || item.import_date === ""
          ? "-"
          : moment(new Date(item.import_date)).format("DD/MM/YYYY"),
      product_id:
        item.product_id === undefined || item.product_id === ""
          ? "-"
          : item.product_id,
      description:
        item.description === undefined || item.description === ""
          ? "-"
          : item.description,
      packing_list:
        item.packing_list === undefined || item.packing_list === ""
          ? "-"
          : item.packing_list,
      model: item.model === undefined || item.model === "" ? "-" : item.model,
      color: item.color === undefined || item.color === "" ? "-" : item.color,
      surface:
        item.surface === undefined || item.surface === "" ? "-" : item.surface,
      width:
        item.width === undefined || item.width === "" || item.width === 0
          ? "-"
          : item.width,
      thick:
        item.thick === undefined || item.thick === "" || item.thick === 0
          ? "-"
          : item.thick,
      length:
        item.length === undefined || item.length === "" || item.length === 0
          ? "-"
          : item.length,
      qty: item.qty === undefined || item.qty === "" ? "-" : item.qty,
      qty_per_pack:
        item.qty_per_pack === undefined || item.qty_per_pack === ""
          ? "-"
          : item.qty_per_pack,
      serial_number:
        item.serial_number === undefined || item.serial_number === ""
          ? "-"
          : item.serial_number,
    };
    let templateFulfill = MapItemsToPrintStickerZPL(
      _mustSingleFormat,
      template,
      objInfoSticker
    );
    PrintZebra(templateFulfill, printerName);
  }
};

const MapItemsToPrintStickerZPL = (
  _mustSingleFormat,
  template,
  objInfoSticker
) => {
  template = template.replace(/_import_date_/g, objInfoSticker.import_date);
  template = template.replace(/_product_id_/g, objInfoSticker.product_id);
  template = template.replace(/_description_/g, objInfoSticker.description);
  template = template.replace(/_packing_list_/g, objInfoSticker.packing_list);
  template = template.replace(/_model_/g, objInfoSticker.model);
  template = template.replace(/_color_/g, objInfoSticker.color);
  template = template.replace(/_surface_/g, objInfoSticker.surface);
  template = template.replace(/_width_/g, objInfoSticker.width);
  template = template.replace(/_thick_/g, objInfoSticker.thick);
  template = template.replace(/_length_/g, objInfoSticker.length);
  template = template.replace(/_qty_per_pack_/g, objInfoSticker.qty_per_pack);
  template = template.replace(/_qty_/g, objInfoSticker.qty);
  template = template.replace(/_serial_number_/g, objInfoSticker.serial_number);
  return template;
};

// const MapItemsToPrintStickerZPL = (printerName, isOdd, _data) => {
//   console.log(_data);
//   var template = templateSINGLE;
//   var _mustSingleFormat = true;
//   // console.log("_data",_data)
//   for (var i = 0; i < _data.length; i++) {
//     // console.log("i", i)
//     // if (_data.length - 1 !== i) {
//     // Dual Format
//     template = templateDUAL;
//     _mustSingleFormat = false;

//     // console.log("i>>>= ", i + 1, "(Dual Format)");

//     // _received_date_
//     objInfoSticker.received_date1 =
//       _data[i]._received_date_ === undefined || _data[i]._received_date_ === ""
//         ? "-"
//         : moment(new Date(_data[i]._received_date_)).format("DD/MM/YYYY");

//     // _product_name_
//     objInfoSticker._product_name1_ =
//       _data[i]._product_name_ === undefined || _data[i]._product_name_ === ""
//         ? "-"
//         : _data[i]._product_name_;

//     // _product_id_
//     objInfoSticker._product_id1_ =
//       _data[i]._product_id_ === undefined || _data[i]._product_id_ === ""
//         ? "-"
//         : _data[i]._product_id_;

//     // _packing_list_
//     objInfoSticker._packing_list1_ =
//       _data[i]._packing_list_ === undefined || _data[i]._packing_list_ === ""
//         ? "-"
//         : _data[i]._packing_list_;

//     // _product_code_
//     objInfoSticker._product_code1_ =
//       _data[i]._product_code_ === undefined || _data[i]._product_code_ === ""
//         ? "-"
//         : _data[i]._product_code_;

//     // _color_
//     objInfoSticker._color1_ =
//       _data[i]._color_ === undefined || _data[i]._color_ === ""
//         ? "-"
//         : _data[i]._color_;

//     // _surface_
//     objInfoSticker._surface1_ =
//       _data[i]._surface_ === undefined || _data[i]._surface_ === ""
//         ? "-"
//         : _data[i]._surface_;

//     // _width_
//     objInfoSticker._width1_ =
//       _data[i]._width_ === undefined || _data[i]._width_ === ""
//         ? "-"
//         : _data[i]._width_;

//     // _thick_
//     objInfoSticker._thick1_ =
//       _data[i]._thick_ === undefined || _data[i]._thick_ === ""
//         ? "-"
//         : _data[i]._thick_;

//     // _length_
//     objInfoSticker._length1_ =
//       _data[i]._length_ === undefined || _data[i]._length_ === ""
//         ? "-"
//         : _data[i]._length_;

//     // _qty_
//     objInfoSticker._qty1_ =
//       _data[i]._qty_ === undefined || _data[i]._qty_ === ""
//         ? "-"
//         : _data[i]._qty_;

//     // _serial_number_
//     objInfoSticker._serial_number1_ =
//       _data[i]._serial_number_ === undefined || _data[i]._serial_number_ === ""
//         ? "-"
//         : _data[i]._serial_number_;

//     // _image_
//     // objInfoSticker._image1_ =
//     //   _data[i]._image_ === undefined || _data[i]._image_ === ""
//     //     ? "-"
//     //     : _data[i]._image_;

//     // } else {
//     //   if (isOdd) {
//     //     // Single Format
//     //     template = templateSINGLE;
//     //     _mustSingleFormat = true;
//     //     // console.log("i>>>= ", i, "(Single Format)");
//     //     objInfoSticker._product1_ = (_data[i]._product_ === undefined || _data[i]._product_ === "") ? "-" : _data[i]._product_;
//     //     objInfoSticker._product_number1_ = (_data[i]._product_number_ === undefined || _data[i]._product_number_ === "") ? "-" : _data[i]._product_number_;
//     //     objInfoSticker._product_name1_ = (_data[i]._product_name_ === undefined || _data[i]._product_name_ === "") ? "-" : _data[i]._product_name_;
//     //     objInfoSticker._type1_ = (_data[i]._type_ === undefined || _data[i]._type_ === "") ? "-" : _data[i]._type_;
//     //     objInfoSticker._surface1_ = (_data[i]._surface_ === undefined || _data[i]._surface_ === "") ? "-" : _data[i]._surface_;
//     //     objInfoSticker._color1_ = (_data[i]._color_ === undefined || _data[i]._color_ === "") ? "-" : _data[i]._color_;
//     //     objInfoSticker._lot_date1_ = (_data[i]._lot_date_ === undefined || _data[i]._lot_date_ === "") ? "-" : moment(new Date(_data[i]._lot_date_)).format('DD/MM/YYYY');
//     //     objInfoSticker._serial_number1_ = (_data[i]._serial_number_ === undefined || _data[i]._serial_number_ === "") ? "-" : _data[i]._serial_number_;

//     //     objInfoSticker._remark_date1_ = (_data[i]._remark_date_ === undefined || _data[i]._remark_date_ === "") ? "-" : moment(new Date(_data[i]._remark_date_)).format('DD/MM/YYYY');
//     //     objInfoSticker._qty1_ = (_data[i]._qty_ === undefined || _data[i]._qty_ === "") ? "-" : _data[i]._qty_;
//     //     objInfoSticker._spec1_ = (_data[i]._spec_ === undefined || _data[i]._spec_ === "") ? "-" : _data[i]._spec_;
//     //     objInfoSticker._profile1_ = (_data[i]._profile_ === undefined || _data[i]._profile_ === "") ? "-" : _data[i]._profile_;
//     //   }
//     // }
//     var templateFulfill = FormatTemplateSticker(
//       _mustSingleFormat,
//       template,
//       objInfoSticker
//     );
//     PrintZebra(templateFulfill, printerName);
//     // i++;
//   }
// };

// const FormatTemplateSticker = (_mustSingleFormat, template, objInfoSticker) => {
//   // Template Page #1
//   template = template.replace(
//     /_received_date1_/g,
//     objInfoSticker._received_date1_
//   );
//   template = template.replace(
//     /_product_name1_/g,
//     objInfoSticker._product_name1_
//   );
//   template = template.replace(/_product_id1_/g, objInfoSticker._product_id1_);
//   template = template.replace(
//     /_packing_list1_/g,
//     objInfoSticker._packing_list1_
//   );
//   template = template.replace(
//     /_product_code1_/g,
//     objInfoSticker._product_code1_
//   );
//   template = template.replace(/_color1_/g, objInfoSticker._color1_);
//   template = template.replace(/_surface1_/g, objInfoSticker._surface1_);
//   template = template.replace(/_width1_/g, objInfoSticker._spec1_);
//   template = template.replace(/_thick1_/g, objInfoSticker._profile1_);
//   template = template.replace(/_lenght1_/g, objInfoSticker._remark_date1_);
//   template = template.replace(/_qty1_/g, objInfoSticker._qty1_);
//   template = template.replace(
//     /_serial_number1_/g,
//     objInfoSticker._serial_number1_
//   );
//   // template = template.replace(/_image1_/g, objInfoSticker._image1_);

//   // Template Page #2 --> Print when even of Array
//   // console.log("---->>>>");
//   // console.log("_mustSingleFormat", _mustSingleFormat);
//   // console.log("---->>>>");
//   if (_mustSingleFormat == false) {
//     console.log("OBJ", objInfoSticker);
//     template = template.replace(
//       /_received_date2_/g,
//       objInfoSticker._received_date2_
//     );
//     template = template.replace(
//       /_product_name2_/g,
//       objInfoSticker._product_name2_
//     );
//     template = template.replace(/_product_id2_/g, objInfoSticker._product_id2_);
//     template = template.replace(
//       /_packing_list2_/g,
//       objInfoSticker._packing_list2_
//     );
//     template = template.replace(
//       /_product_code2_/g,
//       objInfoSticker._product_code2_
//     );
//     template = template.replace(/_color2_/g, objInfoSticker._color2_);
//     template = template.replace(/_surface2_/g, objInfoSticker._surface2_);
//     template = template.replace(/_width2_/g, objInfoSticker._spec2_);
//     template = template.replace(/_thick2_/g, objInfoSticker._profile2_);
//     template = template.replace(/_lenght2_/g, objInfoSticker._remark_date2_);
//     template = template.replace(/_qty2_/g, objInfoSticker._qty2_);
//     template = template.replace(
//       /_serial_number2_/g,
//       objInfoSticker._serial_number2_
//     );
//     // template = template.replace(/_image2_/g, objInfoSticker._image2_);
//   }

//   return template;
// };

const CheckPrinterName = () => {
  console.log(
    "default printer name: " +
      ("printer.getDefaultPrinterName()" || "is not defined on your computer")
  );
};

const PrintZebra = (templateFulfill, printer_name) => {
  // console.log("====");
  // console.log(templateFulfill);
  printer.printDirect({
    data: templateFulfill,
    printer: printer_name,
    type: "RAW",
    success: function () {
      console.log("Print using: " + printer_name);
    },
    error: function (err) {
      console.log(err);
    },
  });
};

module.exports = {
  CheckPrinterName,
  MapItemsToPrintStickerZPL,
  mappingItemToTemplate,
};
