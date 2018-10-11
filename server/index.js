
const app = require('express')();
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

const User = require('./models/user');
const PORT = process.env.PORT || 9000;
const SocketManager = require('./SocketManager');

io.on('connection', SocketManager);


// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
if (process.env.NODE_ENV === 'production') {
    app.use(require('express').static(path.join(__dirname, '/../client/build')));
}

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
                // console.log("Error finding profile: ", err);
                res.json({
                    status: 500,
                    message: 'Error finding profile for current login', // not unique email
                })
            }
            else {
                //console.log('Profile Document', doc);
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
                password: encryptedPassword,
                yourname: data.yourname,
                age: data.age,
                city: data.city,
                yourstate: data.yourstate,
                profilepic: data.profilepic,
                filename: data.filename
            })
                .then(function () {
                    res.json({
                        status: 200,
                        message: 'Success - New User Created'
                    })
                })

                .catch(function (err) {

                    res.json({
                        status: 500,
                        message: 'Error - New User NOT Created', // not unique email

                    })
                });


        })
        .catch(() => {
            res.status(500).json({
                message: 'We were not able to create the user'

            });

        });


});

app.post('/login', (req, res) => {
    const data = req.body;
    const email = data.email;

    const password = data.password;  // plain text password
    //console.log("Login Data = ", data);
    const isPasswordValid = false;

    // convert email to lower case
    const lowerEmail = data.email.toLowerCase();

    User.findOne({ email: lowerEmail })
        .then((user) => {

            // Load hash from your password DB.
            const isPasswordValid = bcrypt.compareSync(password, user.password);


            // if valid password
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
            res.json({
                message: `SUCCESS: Your profile has been updated`
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "ERROR: user profile did not update"
            })
        });

});

// delete user profile

app.get('/deleteprofile/:email', (req, res) => {
    // console.log("Inside server - delete user profile")
    // console.log("email = ", req.params.email);

    User.deleteOne({ "email": req.params.email }, (err, result) => {
        if (err) {
            // console.log("ERROR Deleting Profile", err);
            res.json({
                message: `Error deleting Profile`
            });
        }
        res.json({
            message: `SUCCESS: Profile has been deleted`
        });
    })
})



app.get("/*", (req, res) => {

    res.sendFile(path.join(__dirname, "/../client/build/index.html"));
});

server.listen(PORT, () => {
    console.log(`Server is starting at Port ${PORT}`);
})

module.exports = io;

