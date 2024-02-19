class DataResponse {
  constructor() {
    this.success = false;
    this.code = 0; // 0 is error, 1 is success with data return, 2 is success but the param not match to database
    this.message = "Something wrong server side, please contact system admin.";
    this.data = null;
  }

  doSuccess(code = 1, msg = "Your request is successful.") {
    this.code = code;
    this.success = true;
    this.message = msg;
  }

  doError(
    code = 3,
    msg = "Something is wrong with the request.",
    status = this.status
  ) {
    this.code = code;
    this.success = false;
    this.message = msg;
  }
}

class UserLevels {
  constructor() {
    this.provider = "provider";
    this.partner = "partner";
    this.developer = "developer";
    this.juristic = "juristic";
    this.security = "security";
    this.client = "client";
  }
}

class UserRoles {
  superadmin = "superadmin";
  admin = "admin";
  viewer = "viewer";
}

module.exports = { DataResponse, UserLevels, UserRoles };
