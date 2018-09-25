const app = require('express')();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');


mongoose.connect('mongodb://localhost/my_db', { useNewUrlParser: true });

const User = require('./models/user');
const PORT = process.env.PORT || 9000;

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

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

// app.get("/profile", function (req, res) {
//     console.log('inside of get the profile');
//     res.json({
//         message: `I am in the get profile route where I don't want to be`
//     });

// });

app.get('/profile/:email', function (req, res) {
    console.log('inside of get the profile with email');
    console.log('params', req.params.email);
    User.findOne({ email: req.params.email })
        .exec(function (err, doc) {
            if (err) {
                console.log("Error finding profile: ", err);
            }
            else {
                console.log('Profile Document', doc);
                res.json(doc);
            }
        });
});


app.post('/signup', (req, res) => {
    const data = req.body;

    const displayname = data.displayname;
    const email = data.email;
    const password = data.password;
    const yourname = data.yourname;
    const age = data.age;
    const city = data.city;
    const yourstate = data.yourstate;
    const profilepic = data.profilepic;
    const pictures = data.pictures;
    // const emailexistsmsg = { customMessage: 'this email already exists' };

    console.log("SignUp Data = ", data);

    // to encrypt user password    
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(password, salt);
    // Store hash in your password DB.

    User.init() // to enforce uniqueness
        .then(() => {

            User.create({
                displayname: displayname,
                email: email,
                password: encryptedPassword,
                yourname: yourname,
                age: age,
                city: city,
                yourstate: yourstate,
                profilepic: profilepic,
                // pictures: pictures
            })
                .then(function () {
                    // res.cookie('email', email).json({
                    console.log("I am in the then");
                    res.json({
                        status: 200,
                        message: 'Success - New User Created'
                    })
                })

                .catch(function (err) {
                    // res.customMessage = emailexistsmsg;
                    // res.status(500).json(emailexistsmsg)
                    // res.status(500).json({
                    console.log("I am in the catch", err);
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
    const password = data.password;  // plain password
    console.log("Login Data = ", data);
    const cookiesData = req.cookies;

    console.log("Cookies = ", cookiesData);

    User.findOne({ email: data.email })
        .then((user) => {
            console.log("User = ", user);

            // Load hash from your password DB.
            const isPasswordValid = bcrypt.compareSync(password, user.password); // true

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
                message: "No user found with this email"
            })
        });

    // res.json({
    //     message: 'I received your login data'
    // });
});



app.listen(PORT, () => {
    console.log(`Server is starting at Port ${PORT}`);
})

