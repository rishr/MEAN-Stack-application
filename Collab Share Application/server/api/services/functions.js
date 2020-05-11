const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Session = require('../models/collabsession');
const SessionDetails = require('../models/collabsessiondetails');
const Posts = require('../models/post');

exports.getCount = (req, res) => {
  res.status(200).json({
    request: 'Getting the current count of active users',
    count: req.app.locals.currentConnectedCount
  });
}

exports.getPosts = (req, res) => {
  let sessId = req.params.sessId;
  Session.find({ sessionId: sessId })
    .exec()
    .then(doc => {
      if (doc == [] || doc == null || doc == undefined || doc == {} || doc == '[]') {
        // No posts found
        res.status(200).json({
          status: false,
          message: 'No user found',
          userId: userId
        });
      } else {
        let userId = doc[0].userId;
        Posts.find({ userId: userId })
          .exec()
          .then(data => {
            if (data == [] || data == null || data == undefined || data == {} || data == '[]') {
              res.status(200).json({
                status: false,
                message: 'No posts found',
                userId: userId
              });
            } else {
              res.status(200).json({
                status: true,
                message: 'Posts found',
                posts: data,
                userId: userId
              });
            }
          })
      }
    })

}

exports.getUserData = (req, res) => {
  const userId = req.body.userId;
  const sessId = req.body.sessId;
  Session.find({ sessionId: sessId, userId: userId })
    .exec()
    .then(doc => {
      if (doc == [] || doc == null || doc == undefined || doc == {} || doc == '[]') {
        // User not found
        res.status(200).json({
          status: false,
          message: 'Session data not found',
          sessionId: sessId
        });
      } else {
        res.status(200).json({
          status: true,
          message: 'Session data found',
          sessionId: sessId,
          docData: doc[0].sessionData
        });
      }
    })
}

exports.saveData = (req, res) => {
  let userId = req.body.id;
  let sessId = req.body.sessId;
  let sessData = req.body.sessData;
  Session.find({ sessionId: sessId, userId: userId })
    .exec()
    .then(doc => {
      if (doc == [] || doc == null || doc == undefined || doc == {} || doc == '[]') {
        // User not found
        res.status(200).json({
          status: false,
          message: 'Session data not updated',
          sessionId: sessId
        });
      } else {
        // Session with user found. Proceed to save the data
        Session.updateOne({ sessionId: sessId }, {
          $set: {
            sessionData: sessData
          }
        }, { multi: true })
          .then(doc => {
            res.status(200).json({
              status: true,
              message: 'Session data updated',
              sessionId: sessId
            });
          });
      }
    });
}

exports.checkSession = (req, res) => {
  Session.findOne({ sessionId: req.params.sessId })
    .exec()
    .then(doc => {
      if (doc.sessionRestricted) {
        res.status(200).json({
          restrict: true,
          message: 'Session Restricted',
          sessionId: req.params.sessId,
          userId: doc.userId
        });
      } else {
        res.status(200).json({
          restrict: false,
          message: 'Session Not Restricted',
          sessionId: req.params.sessId,
          userId: doc.userId
        });
      }
    })
    .catch(err => {
    })
}

exports.restrictSession = (req, res) => {
  let sessionId = req.params.sessId;
  Session.updateOne({ sessionId: sessionId }, {
    $set: {
      sessionRestricted: true
    }
  }, { multi: true })
    .then(doc => {
      res.status(200).json({
        status: true,
        message: 'Session Restricted',
        sessionId: sessionId
      });
    })
    .catch(err => {
    });

}

exports.validateToken = (req, res) => {
  let token = req.params.accessToken;
  SessionDetails.findOne({ userToken: token })
    .exec()
    .then(doc => {
      let sessionId = doc.sessionId;
      let authToken = doc.userToken;
      let userEmail = doc.userEmail;
      if (doc == null) {
        // No user invite found
        res.status(200).json({
          status: false,
          message: 'Invite not found'
        });
      } else {
        // User invite found
        if (doc.hasJoined) {
          // Invite link expired
          res.status(200).json({
            status: false,
            message: 'Invite expired'
          });
        } else {
          // Invite link still valid
          SessionDetails.updateOne({ _id: doc._id }, {
            $set: {
              hasJoined: true,
              isActive: true
            }
          }, { multi: true })
            .then(doc => {
              res.status(200).json({
                status: true,
                message: 'Invite accepted',
                sessionId: sessionId,
                authToken: authToken,
                userEmail: userEmail
              });
            })
            .catch(err => {
            });
        }
      }
    });
}

exports.initiateSession = (req, res) => {
  const session = new Session({
    _id: new mongoose.Types.ObjectId(),
    userId: req.body.userId, // Request body requires a price parameter for the product
    sessionId: req.body.sessionId, // Request body requires a name parameter for the product
    sessionData: req.body.sessionData,
    sessionRestricted: false
  });
  session.save()
    .then(result => {
      res.status(200).json({
        message: "Session saved",
        result: result
      });
    })
    .catch(function (err) {
    });
}

exports.saveSessionDetails = (sessId, userEmail, userToken, hasJoined = false, isActive = false) => {
  const sessionDetails = new SessionDetails({
    _id: new mongoose.Types.ObjectId(),
    sessionId: sessId,
    userEmail: userEmail,
    userToken: userToken,
    hasJoined: hasJoined,
    isActive: isActive
  });
  sessionDetails.save();
}

exports.sendInvites = (req, res, err) => {
  const mailerData = req.body;
  let emailAddresses = '';
  let mailer = [];
  for (const key in mailerData.emailList) {
    const userEmail = mailerData.emailList[key].email;
    const userToken = mailerData.emailList[key].token;
    let inviteLink = process.env.HOST + ":" + process.env.CLIENTPORT + "/collab/join/" + userToken;
    emailAddresses += userEmail + ',';
    let html = "<strong>Welcome to Collab!</strong> " +
      "<p>You are invited to join my online class. Collab is an initiative where you can join me " +
      "online for classes, tests or just to hangout.<br/> Feel free to ask me questions as I take classes on the collab board.</p>" +
      "<div><p>Click <a href='" + inviteLink + "'><strong>here</strong></a> to collaborate</p></div>" +
      "<p>If that does not work, copy paste the link below on your browser<br/>" +
      "<a href='" + inviteLink + "'>" + inviteLink + "</a></p>" +
      "<p>You can access this link only once. Hope to see you there!</p>" +
      "<p>Best Regards, </p>" +
      "<p>Professor Collab</p>";
    const feed = { to: userEmail, message: html };
    sendMail(userEmail, html)
      .then(result => {
        res.status(200).json({
          status: 'Email sent',
          body: req.body
        })
      })
      .catch(function (err) {
      });
    this.saveSessionDetails(mailerData.userData.sessionData.sessionId, userEmail, userToken);
  }
}

const sendMail = async (email, message, callback) => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAILHOST,
    port: process.env.EMAILPORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SERVEREMAIL, // generated ethereal user
      pass: process.env.SERVERPASSWORD // generated ethereal password
    }
  });

  let mailOptions = {
    from: '"Professor Collab 👻" <collabwithme@collaborator.com>', // sender address
    to: email, // list of receivers
    subject: "Invitation to collaborate", // Subject line
    html: message // html body
  }

  // send mail with defined transport object
  await transporter.sendMail(mailOptions);
}