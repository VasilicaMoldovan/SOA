const fetch = require('node-fetch');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const accessTokenSecret = "myunaccessibletokensecret"

let error = 'Internal server error';
let loggedInUsers = [];
let token = '';

router.route('/login').post((req,res)=>{
    console.log('-----------Request received for path /login POST');
    console.log("bn bn");
    const { username, password } = req.body;
    console.log(`Username:  ${username}`);
    console.log(`Password:  ${password}`);

    if(loggedInUsers.findIndex((elem) => elem === username) > -1){
        error = 'User already logged in';
        console.log(error);
        res.json({error});
    } else {
        const auth_url = 'http://authentication-manager:8080/user/authenticate';
        console.log(`sending request: ${auth_url}`);

        fetch(auth_url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        }).then(response => response.json())
            .then(data => {
                const api_error = data.error;
                if(typeof api_error == 'undefined'){
                    console.log("Password is correct.");
                    loggedInUsers.push(username);
                    token = data.accessToken;
                    console.log(token);
                    console.log(`Logged in users: ${loggedInUsers}`);
                    res.json({username, token});
                } else {
                    console.log(api_error);
                    error = data.error;
                    res.json({error});
                }
            }).catch((err) => {
            console.log(`Error API call: ${err}`);
            res.json({error});
        });
    }
});

router.route('/logout').post(ensureToken, (req, res) => {
    console.log('-------------Request received for path /logout POST');
    const { username } = req.body;
    console.log(`body username:  ${username}`);
    if(loggedInUsers.find(element => element === username)){
        token = '';
        loggedInUsers.pop(username);
        console.log(`User ${loggedInUsers} successfully logged out`)
    }
    console.log(`Logged in users: ${loggedInUsers}`);
    res.json({username});

});

router.route('/appointments').get(ensureToken, (req, res) => {
    console.log(`wwwwwwwww`);
    const {username} = req.query;
    console.log(`query username:  ${username}`);

    const appointment_url = 'http://appointments-api:8090/appointment/getAppointments?';
    console.log(`sending request: ${appointment_url}`);
    console.log(`we are here`);
    fetch(appointment_url + new URLSearchParams({
        username: username
    }),{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(response => response.json())
        .then(data => {
            console.log(`${data.length} appointments obtained successfully for user: ${username}`);
            res.json(data);
        }).catch((err)=>{
        console.log(`Error API call: ${err}`);
        console.log(`lala : ${response.text()}`);
        console.log(`lala2 : ${response.json()}`);
        res.json({error});
    });

});

router.route('/appointment').post(ensureToken, (req, res) => {
    console.log('---------------Request received for path /appointment POST');
    const {username, content} = req.body;
    console.log(`body username:  ${username}`);
    console.log(`body from:  ${content}`);
    
    const appointment_url = 'http://appointments-api:8090/appointment';
    console.log(`sending request: ${appointment_url}`);

    fetch(appointment_url,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "username": username,
            "content": content
        })
    }).then(response => response.json())
        .then(data => {
            const api_error = data.error;
            if(typeof api_error == 'undefined'){
                console.log("Appointment successfully saved.");
            } else {
                console.log(api_error);
            }
            res.json(data);
        }).catch((err) => {
        console.log(`Error API call: ${err}`);
        res.json({error});
    });
});

ensureToken = function(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1]
        jwt.verify(bearerToken, accessTokenSecret, (err, result) => {
            if(err) { res.sendStatus(403) }
            else{ next() }
        })
    } else {
        res.sendStatus(403)
    }
}


module.exports = router;

