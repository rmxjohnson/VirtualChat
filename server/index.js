// const app = require('express')();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);

// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcryptjs');

// mongoose.connect('mongodb://localhost/my_db', { useNewUrlParser: true });

// const SocketManager = require('./SocketManager')

// io.on('connection', SocketManager)

// const User = require('./models/user');
// const PORT = process.env.PORT || 9000;

const app = require('express')();
//const cors = require('cors');
var server = require('http').Server(app);
var io = require('socket.io')(server);
const path = require('path');


const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

// If deployed, use the deployed database.  Otherwise use the local bubblink database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/bubblink_db";

// Connect mongoose to the Mongo database
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }).catch(error => { console.log(error) });

// below code is before changes for heroku
//mongoose.connect('mongodb://localhost/bubblink_db', { useNewUrlParser: true });

const User = require('./models/user');
const PORT = process.env.PORT || 9000;
const SocketManager = require('./SocketManager');

io.on('connection', SocketManager);


//app.use(cors());
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
if (process.env.NODE_ENV === 'production') {
    app.use(require('express').static(path.join(__dirname, '/../client/build')));
}
//app.use(require('express').static(path.join(__dirname, '/../client/build')));

// Routes - Server
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to my Backend App'
    });
});

app.get('/about', (req, res) => {
    res.json({
        message: `I am the about route`
    });
});


// Authentication Routes

app.get('/profile/:email', function (req, res) {
    console.log('inside of get the profile with email');
    console.log('params', req.params.email);

    // convert email input to lower case
    const lowerEmail = req.params.email.toLowerCase();

    User.findOne({ email: lowerEmail })
        .exec(function (err, doc) {
            if (err) {
                console.log("Error finding profile: ", err);
                res.json({
                    status: 500,
                    message: 'Error finding profile for current login', // not unique email
                    // customMessage: 'Error - this email already used'
                })
            }
            else {
                console.log('Profile Document', doc);
                res.json(doc);
            }
        });
});


app.post('/signup', (req, res) => {
    const data = req.body;

    const user = data.user;
    const email = data.email;
    const password = data.password;
    const yourname = data.yourname;
    const age = data.age;
    const city = data.city;
    const yourstate = data.yourstate;
    const profilepic = data.profilepic;
    const pictures = data.pictures;
    const filename = data.filename;

    // convert email to lower case
    const lowerEmail = data.email.toLowerCase();


    console.log("SignUp Data = ", data);
    console.log("Signup File = ", req.file);

    // to encrypt user password    
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(password, salt);
    // Store hash in your password DB.

    User.init() // to enforce uniqueness
        .then(() => {

            User.create({
                user: data.user,
                email: lowerEmail,
                // email: data.email,
                //password: password,
                password: encryptedPassword,
                yourname: data.yourname,
                age: data.age,
                city: data.city,
                yourstate: data.yourstate,
                profilepic: data.profilepic,
                filename: data.filename
                // pictures: pictures
            })
                .then(function () {
                    // res.cookie('email', email).json({
                    console.log("I am in the then creating a user");
                    res.json({
                        status: 200,
                        message: 'Success - New User Created'
                    })
                })

                .catch(function (err) {
                    // res.customMessage = emailexistsmsg;
                    // res.status(500).json(emailexistsmsg)
                    // res.status(500).json({
                    console.log("I am in the catch creating the user", err);
                    // res.json({
                    res.json({
                        status: 500,
                        message: 'Error - New User NOT Created', // not unique email
                        // customMessage: 'Error - this email already used'
                    })
                });

            // res.json({
            //     message: 'User was created'
            // });

        })
        .catch(() => {
            res.status(500).json({
                message: 'We were not able to create the user'

            });

        });

    // if want to send unsuccessful response - default is 200
    // res.status(401).json({
    // res.json({
    //     message: 'I Received the SignUp Data'
    // });
});

app.post('/login', (req, res) => {
    const data = req.body;
    const email = data.email;

    const password = data.password;  // plain text password
    console.log("Login Data = ", data);
    const isPasswordValid = false;

    // convert email to lower case
    const lowerEmail = data.email.toLowerCase();

    User.findOne({ email: lowerEmail })
        .then((user) => {
            console.log("User = ", user);

            // Load hash from your password DB.
            const isPasswordValid = bcrypt.compareSync(password, user.password); // true
            console.log("Password = ", password);
            console.log('user.password = ', user.password);
            // if (password === user.password) {
            //     isPasswordValid = true;
            // } // true

            // if valid password
            console.log("Ispasswordvalid = ", isPasswordValid);
            if (isPasswordValid) {
                res.json({
                    message: 'Success - valid user and password',
                    id: user._id
                });
            }
            else {
                res.status(500).json({
                    message: "Invalid Password"
                });
            }

        })
        .catch(() => {
            res.status(500).json({
                message: "No user found with this email:\nPlease Signup as a new user"
            })
        });
});

app.post('/updateprofile', (req, res) => {
    const data = req.body;

    console.log("Change Profile Data = ", data);
    const lowerEmail = data.email.toLowerCase();

    User.updateOne(
        { email: lowerEmail }, //filter
        {
            // fields updated
            $set: {
                "user": data.user,
                "yourname": data.yourname,
                "age": data.age,
                "city": data.city,
                "yourstate": data.yourstate,
                "profilepic": data.profilepic
            }
        }
    )
        .then((obj) => {
            console.log('Updated Profile Object- ' + obj);
            res.json({
                message: `SUCCESS: Your profile has been updated`
            });
        })
        .catch((error) => {
            console.log('Error in Update Profile: ' + err);
            res.status(500).json({
                message: "ERROR: user profile did not update"
            })
        });
    // .catch((err) => {
    //     console.log('Error: ' + err);
    // })




    // console.log("Change Profile Data = ", data);
    // res.json({
    //     message: `I am returning from the change profile route`
    // });

});

// delete user profile

app.get('/deleteprofile/:email', (req, res) => {
    console.log("Inside server - delete user profile")
    console.log("email = ", req.params.email);
    // collection.deleteOne({
    //     "first_name": "Yashwant"
    // }, function(err, results) {
    //     console.log(results.result);
    // });

    User.deleteOne({ "email": req.params.email }, (err, result) => {
        if (err) {
            console.log("ERROR Deleting Profile", err);
            res.json({
                message: `Error deleting Profile`
            });
        }
        res.json({
            message: `SUCCESS: Profile has been deleted`
        });
    })
})


// Delete user
//    router.get('/deleteuser/:id', function(req, res) { 

//     var db = req.db;

//     var uid = req.params.id.toString();
//     var collection = db.get('usercollection');

//     collection.remove({"_id":uid}, function(err, result) { 
//         res.send( (result === 1) ? { msg: 'Deleted' } : { msg: 'error: '+ err } );
//     });

// });




// const PORT = process.env.PORT || 3231
app.get("/*", (req, res) => {

    res.sendFile(path.join(__dirname, "/../client/build/index.html"));
});




server.listen(PORT, () => {
    console.log(`Server is starting at Port ${PORT}`);
})

module.exports = io;

