'use strict'

const mailer = require('../lib/mailer')

const auth = (req, res, next) => {
  //! dont check anything
  // console.log(req.method)
  // if (req.params.master_players_id) {
  //   mp
  //   .findOne({
  //     where: { master_players_id: req.params.master_players_id }
  //   })
  //   .then(player => {
  //     if (!player) {
  //       ex.raiseError(req, res, next, 'USR404', 404, null, null)
  //     } else {
  //       player = JSON.parse(JSON.stringify(player))
  //       if (player.is_blocked) {
  //         ex.raiseError(req, res, next, 'USR024', 400, null, null)
  //       } else if (!player.is_phone_verified) {
  //         ex.raiseError(req, res, next, 'USR025', 400, null, null)
  //       } else {
  //         req.tempStore.player = player
  //         next()
  //       }
  //     }
  //   })
  //   .catch(error => {
  //     ex.raiseError(req, res, next, 'USR100', 400, error, null)
  //   })
  // } else {
  //   next()
  // }
  // //* enable for check
  /* if (req.header('Authorization')) {
    jwt.verify(req.header('Authorization'), process.env.SALT, function (err, decoded) {
      if (err && err.message === 'jwt expired') {
        ex.raiseError(req, res, next, 'USR101', 400, null, null)
      } else if (err && err.message !== 'jwt expired') {
        console.log(err)
        ex.raiseError(req, res, next, 'AUTH001', 400, null, null)
      } else {
        mp.hasOne(mpgs, {foreignKey: 'master_players_id'})
        mpgs.belongsTo(mp, {foreignKey: 'master_players_id'})
        mp.hasOne(mpad, {foreignKey: 'master_players_id'})
        mpad.belongsTo(mp, {foreignKey: 'master_players_id'})
        // mp.hasOne(ticks, {foreignKey: 'master_players_id'})
        // ticks.belongsTo(mp, {foreignKey: 'master_players_id'})
        mp.hasOne(masterPlayerToken, {foreignKey: 'ref_player_id'})
        mp.findOne({
          include: [
            {
              model: mpgs
            },
            {
              model: mpad
            },
            {
              model: masterPlayerToken
            }
          ],
          where: { master_players_id: decoded.master_players_id }
        })
        .then(player => {
          if (!player) {
            ex.raiseError(req, res, next, 'USR404', 404, null, null)
          } else {
            // console.log(decoded.android_device_id)
            player = JSON.parse(JSON.stringify(player))
            if (player.is_blocked) {
              ex.raiseError(req, res, next, 'USR024', 400, null, null)
            // } else if (!player.is_phone_verified && req.url.indexOf('/user/otp/') === -1 && req.url.indexOf('/user/profileImageUpload') === -1) { // && req.path().indexOf('/user/otp') >= 0
            //   ex.raiseError(req, res, next, 'USR025', 400, null, null)
            } else {
              // console.log('player.masterPlayerToken.token' + player.masterPlayerToken.token)
              // console.log('Authorization' + req.header('Authorization'))
              req.tempStore.player = player
              if (decoded.ios_vendor_id !== null && player.ios_vendor_id === decoded.ios_vendor_id && player.masterPlayerToken.token === req.header('Authorization')) {
                next()
              } else if (decoded.android_device_id != null && player.android_device_id === decoded.android_device_id && player.masterPlayerToken.token === req.header('Authorization')) {
                next()
              } else if (decoded.browserAgent != null && player.browserAgent === decoded.browserAgent && player.masterPlayerToken.token === req.header('Authorization')) {
                next()
              } else {
                ex.raiseError(req, res, next, 'USR054', 400, null, null)
              }
            }
          }
        })
        .catch(error => {
          console.log(error)
          ex.raiseError(req, res, next, 'USR100', 400, null, null)
        })
      }
    })
  } else {
    // console.log(err)
    ex.raiseError(req, res, next, 'AUTH001', 401, null, null)
  } */
}

const authAdmin = (req, res, next) => {
  next()
}

const metadata = (req, res, next) => {
  // console.log('metadata!')
  // res.send('metadata')
  next()
}

const final = (req, res, next) => {

  const metaData = {
    httpStatus: 200,
    httpMethod: req.method,
    httpEndpoint: req.url,
    userId: req.userid,
    payload: req.body,
    message: req.responseObject.message ? req.responseObject.message : 'Success',
    timestamp: req._startTime
  };

  req.responseObject.status = true;
  res.send(200, req.responseObject)
}

const referralCodeGen = () => {
  let text = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < 7; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

const OPTGen = () => {
  let text = ''
  let possible = '0123456789'
  for (var i = 0; i < 6; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

const sendMail = (req, res, next)=> {
  if(req.responseObject.data.mailOption){
    mailer.transporter.sendMail(req.responseObject.data.mailOption, function (error, info) {
      var dayBookLink = req.responseObject.data.dayBookLink
      if (error) {
        req.responseObject.data={dayBookLink}
        req.responseObject.status=false
      }
     else if (info) {
        req.responseObject.data={dayBookLink}
        req.responseObject.status=true
      }
      next()
    })
  }else{
    next()
  }
}

const sendNotification = (req, res, next) => { /*
  console.log('-~~~~~~~~ send notification called ~~~~as~~~-~')
  // req.tempStorage.pushTo.device_os = 'android'
 let message = {
  // to: 'fnAK2X2X9xk:APA91bFpTjN3QL7VyObTfsegk2QNVxKeiVmh1atz9osXrF_15hlhSozj3M2VdsN4-0uT5f1_yD6ef82razqs2abVfqEaBGS5FLcmcTJ5AgoVvwPyM6HVO9gu8bR1i3o9zs2PQG-hhOx2',
  to: req.tempStore.pushTo.push_token,
  content_available: true,
  priority: 'high',
  sound: 'default',
  custom_notification: {
   title: 'Jeetomoney notification',
   body: 'this is test notification',
   // click_action: req.tempStorage.pushMessage.action
  },
  data: {test: 'Test notification sent by subodh'}
 };

 // if (req.tempStorage.pushTo.device_os === 'ios') {
 //  console.log('IOS selected');
 //  message.notification = {
 //   title: req.tempStorage.pushMessage.title,
 //   body: req.tempStorage.pushMessage.body,
 //   click_action: req.tempStorage.pushMessage.action
 //  };
 // }


 let PUSH_KEY = 'AIzaSyBX4HkHofZzVOCMwidXez9vIaJgDa4KH-M'
 // let PUSH_KEY = 'AIzaSyAWXjzWtfEuWariY8ItOgx7MD4wCzi7Gk0';
 // let PUSH_KEY = 'AAAAOv6xhYw:APA91bEKs1k0BHHQtmzxu8D5I3Okg5tPxFoqltzXUY85ehfclIbvUoH5zDECXn65PUHDtUyIvHS-krjF-1UOj6OiGf_X8gvnaOdPf2aYxeDJlZ4TT97WYEcdnQ9ZtUggcK7LQkxrYhd2';
 // let PUSH_KEY = 'egT7YjqacR0:APA91bH8AZuIVPCz2pTiJjYd2j10C3cbfou9nJbt9odZwkmkGwAzJQOGEVsxvSsMJJU4sufk2OmohhpJ85q6QhhvT3JYzdEJKlEauOM5C9Z-QbTerMhyR7278cJv3YLTCL0IdtrZONYN';
 let options = {
  url: 'https://fcm.googleapis.com/fcm/send',
  headers: {
   'Content-Type': 'application/json',
   Authorization: 'key=' + PUSH_KEY,
   'User-Agent': 'JeetoMoney'
  },
  method: 'POST',
  json: message
  };

 function callback(error, response, body) {
  let notif_status = {}

  if (error !== null) {
   notif_status.status = false
  } else {
   notif_status.status = true
   // notif_status.messageid = body.results[0].message_id;
  }
  // notif_status.doctor = req.tempStorage.pushMessage.doctor;
  // notif_status.user = req.tempStorage.pushMessage.user;
  // notif_status.type = req.tempStorage.pushMessage.type;
  // notif_status.data = message;
    // log to notification table
    // console.log(notif_status)
 }
 request(options, callback)*/
}

const sendNotifications = (pushTo) => {
  /*
  console.log('~~~~~~~~~ send notification called ~~~~~~~~~~')
  console.log(JSON.stringify(pushTo))
  console.log('~~~~~~~~~ send notification called ~~~~~~~~~~')
  let message = {
    to: pushTo.push_token,
    content_available: true,
    custom_notification: pushTo.pushMessage,
    notification: pushTo.pushMessage,
    data: pushTo.pushMessage.data
  }

  let options = {
    url: 'https://fcm.googleapis.com/fcm/send',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'key=AIzaSyBX4HkHofZzVOCMwidXez9vIaJgDa4KH-M',
      'User-Agent': 'JeetoMoney'
    },
    method: 'POST',
    json: message
  }

  function callback (error, response, body) {
    let notifStatus = {}
    if (error !== null) {
      notifStatus.status = false
    } else {
      notifStatus.status = true
    }
    notifStatus.ref_notification_types_id = 1
    notifStatus.to_player_id = pushTo.pushMessage.data.user
    notifStatus.from_player_id = pushTo.pushMessage.data.user
    notifStatus.push_notification_message = pushTo.pushMessage.body
    notifStatus.notification_type = pushTo.pushMessage.data.notification_type
    opsNotificationLogs
      .create(notifStatus)
      .then(noti => {
        // do nothing
        console.log('referal notification sent!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1')
        // next()
      })
      .catch(err => {
        console.log('error in insertion' + err + '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        // next()
      })
    // console.log(notif_status)
  }
  request(options, callback) */
}

module.exports = {
  auth,
  final,
  metadata,
  authAdmin,
  referralCodeGen,
  OPTGen,
  sendMail,
  sendNotification,
  sendNotifications
}
