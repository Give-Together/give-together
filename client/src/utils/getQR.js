import React from "react";
import ReactHtmlParser from "react-html-parser";
var qrCode = require("qrcode-npm")

function getQRCode(address) {
  // Getting addr charity qr code
  var qr = qrCode.qrcode(4, "M");
  qr.addData(address);
  qr.make();
  var QRImg = ReactHtmlParser(qr.createImgTag(4));
  var src = QRImg[0].props.src;

  return (
    <div>
      <img
        src={src}
        alt="QR-Code-for-current-charity"
        style={{ width: "100px", height: "100px" }}
      />
    </div>
  );
};

export { getQRCode };