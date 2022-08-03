const request = require('request')

let message = "Dear Customer, your OTP for registration on BillBook is ";

function getOptions({ dest, otp } = {}) {
   return {
      method: "POST",
      url: process.env.KARIX_SMSURL +
            "?ver=1.0" + 
            "&key=" + process.env.KARIX_KEY + 
            "&encrypt=0" + 
            "&dest=" + dest +
            "&send=" + process.env.KARIX_SENDER_ID + 
            "&text=" + message+otp,
      headers: {
         "Content-Type": "application/json",
         Accept: "*/*"
      },
      json: true
   }
}

module.exports = {
   sendOTP: function ({ dest, otp } = {}) {
      let options = getOptions({ dest, otp });
      return new Promise((resolve, reject) => {
         request(options, function (error, response) {
            if (error) reject(error);
            resolve(response);
         });
      });
   },
};