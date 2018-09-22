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

app.post('/signup', (req, res) => {
    const data = req.body;
    const email = data.email;
    const password = data.password;
    console.log("SignUp Data = ", data);

    // to encrypt user password    
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(password, salt);
    // Store hash in your password DB.

    User.init() // to enforce uniqueness
        .then(() => {

            User.create({
                email: email,
                password: encryptedPassword
            })
                .then(function () {
                    res.cookie('email', email).json({
                        // res.json({
                        message: 'Success - New User Created'
                    })
                })
                .catch(function () {
                    res.status(500).json({
                        message: 'Error - New User NOT Created' // not unique email
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

