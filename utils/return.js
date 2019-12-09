const returnService = {
    sender(res, statusResponse, success, errorDetail, message, json) {
      if(json==null) {
        json = {
          success: success,
          message: message,
          detail: errorDetail,
        };
      }
      res.status(statusResponse).send(json);
    },
    sendError(res, statusResponse, message, json) {
      if(json==null) {
        json = {
          mensagem: message,
        };
      }
      res.status(statusResponse).send(json);
    },
  };
  
  module.exports = {
    returnService,
  }