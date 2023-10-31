const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
exports.uploadFiles = async (req, res, uploadArray = []) => {
  const responseUpload = await doUploadFiles(req, res, uploadArray);
  
  if (!responseUpload.success) {
    try {
      for (var i in req.files) {
        var key = i;
        var val = req.files[i];

        for (let j = 0; j < req.files[key].length; j++) {
          fs.rmSync(req.files[key][j].path, {
            force: true,
          });
        }
      }
    } catch (e) {}

    try {
      for (let i = 0; i < req.files.length; i++) {
        fs.rmSync(req.files[i].path, {
          force: true,
        });
      }
    } catch (e) {}
  }
  return responseUpload;
};

const doUploadFiles = async (req, res, uploadArray = []) => {
  return new Promise((resolve, reject) => {
    var result = { success: true, message: "Upload completed." };

    var storage = multer.diskStorage({
      destination: (req, file, cb) => {
        uploadArray.forEach((element) => {
          if (element.name == file.fieldname) {
            var ext = path.extname(file.originalname).split(".")[1];

            if (!element.allowType.includes(ext)) {
              result.success = false;
              result.message = "Upload files type is't allowed.";
            }

            cb(null, element.path);
            return false;
          }
        });
      },
      filename: (req, file, cb) => {
        fileType = file.originalname.split(".");
        fileType = fileType[fileType.length - 1];
        var id = crypto.randomBytes(10).toString("hex");
        cb(null, id + "-" + Date.now() + "." + fileType);
      },
    });

    const upload = multer({
      storage: storage,
      limits: { fileSize: 5 * 1024 * 1024 },
    });

    let uploadFile = upload.fields(uploadArray);
    let tmpAuthData = req.body.authData;
    uploadFile(req, res, function (err) {
      if (err) {
        console.log("cs " + err);
      }
      req.body.authData = tmpAuthData;
      /* for(let i=0;i<req.files.length;i++){
        req.files[i].publicPath = req.files[i].path.replace('assets/','')
      } */
      resolve(result);
    });
  });
};
