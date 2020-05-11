const User = require('../models/user');
const Posts = require('../models/post');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Password hash function while register
exports.generateHash = (inputpass) => {
    let hash = bcrypt.hashSync(inputpass, 10);
    return hash;
}

// Compare password hashes with the entered password to validate login
exports.comparePass = (pass, hashPassword) => {
    if (bcrypt.compareSync(pass, hashPassword)) {
        return true;
    } else {
        // Passwords don't match
        return false;
    }

}

// Controller to list all contacts
exports.list = (req, res) => {
    User.find()
        .collation({ locale: "en" })
        .select("")
        .sort({ name: 1 })
        .exec()
        .then(doc => {
            console.log(doc + "getting the data");
            res.status(200).json(doc);
        });
}

// Controller to add a new user
exports.register = (req, res) => {
    console.log(req.body.emailAddress);
    console.log(req.body.emailAddress);
    const saltedPassword = this.generateHash(req.body.cpassword);
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName, // Request body requires a name parameter for the product
        lastName: req.body.lastName, // Request body requires a price parameter for the product
        password: saltedPassword, // Password
        contactNumber: req.body.contactNumber,
        emailAddress: req.body.emailAddress,
        profession: req.body.profession
    });
    user.save()
        .then(result => {
            res.status(200).json({
                userdata: {
                    'id': result._id,
                    'email':result.emailAddress
                }
            });
        })
        .catch(function (err) {
            console.log("Error occurred in user controller");
        });
}

exports.deletePosts = (req, res) => {
    const id = req.params.id;
    // Executing the find query based on the name of the post
    Posts.deleteOne({"_id": id}) // Delete By id
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error: err});
    });

}

exports.getPosts = (req, res) => {
    Posts.find()
        .collation({ locale: "en" })
        .select("")
        .sort({ name: 1 })
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        });
}

exports.addPosts = (req, res) => {

    const post = new Posts({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        postTitle: req.body.postTitle,
        postDescription: req.body.postDescription
    });

    post.save()
        .then(result => {
            res.status(200).json({
                message: "Post added"
            });
        })
        .catch(function (err) {
            console.log("Error adding post ", err);
        });
}
// for login server fucntion
exports.login = (req, res) => {
    const pass = req.body.password;
    console.log(req.body.password);
    
    // const saltedLoginPass = this.generateHash(pass);
    User.findOne({ emailAddress: req.body.emailAddress })
        .exec()
        .then(doc => {
            let matchStatus = false;
            let resMsg = '';
// comparing the passwords using bcrypt
            if (this.comparePass(pass, doc.password)) {
                matchStatus = true;
                resMsg = 'Login success';
            } else {
                resMsg = 'Login failed';
            }
            res.status(200).json({
                success: matchStatus,
                message: resMsg,
                userdata: {
                    'id': doc._id,
                    'email': doc.emailAddress,
                    'resMsg': resMsg
                }
            });
        })
        .catch(function (err) {
            console.log("API error ", err);
        });
}

exports.update = (req, res) => {
    const _id = req.body.id;
    const firstName = req.body.firstName; // Request body requires a name parameter for the product
    const lastName = req.body.lastName;
    const contactNumber = req.body.contactNumber; // Request body requires a price parameter for the product
    const emailAddress = req.body.emailAddress; // Request body requires a price parameter for the product
    const profession = req.body.profession;
    User.updateOne({ _id: _id }, {
        $set: {
            firstName: firstName,
            lastName: lastName,
            contactNumber: contactNumber,
            emailAddress: emailAddress,
            profession: profession,
            //image: image
        }
    }, { multi: true })
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log("Contact Not Found " + err);
        });
}