const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const error = 'Internal server error';

router.route('/getAppointments').get((req,res)=>{
    console.log(`we got here`);
    console.log('----------Request received for path / GET');
    const username = req.query.username;
    console.log(`query username:  ${username}`);

    fs.readFile(path.resolve(__dirname, 'appointments.json'), 'utf-8', (err, jsonString) => {
        console.log(`again query username:  ${username}`);

        if (err) {
            console.log(`Error opening appointments.json:  ${err}`);
            res.json(error);

        } else {

            let data;
            try {
                data = JSON.parse(jsonString);
            } catch (err) {
                console.log(`Error parsing JSON:  ${err}`);
                res.json({error});
            }

            let appointments = [];
            data.forEach( (entry) => {
                if(username === entry.username){
                    appointments.push({
                        "content": entry.content
                    });
                }
            });

            console.log(`${appointments.length} appointments found`);
            res.json(appointments);
        }
    });
});

router.route('/').post( (req, res) => {
    console.log('---------------Request received for path / POST');
    const {username, content} = req.body;
    console.log(`body username: ${username}`);
    console.log(`body content: ${content}`);
    let data;

    try {
        console.log("Reading from file");
        const jsonString = fs.readFileSync(path.resolve(__dirname, 'appointments.json'));
        data = JSON.parse(jsonString);
        console.log(data);
    } catch (err) {
        console.log(`Error parsing JSON:  ${err}`);
        res.json({error});
    }

    data.push({
        "username": username,
        "content": content
    });

    console.log(data);

    try {
        console.log("Writing to file");
        fs.writeFile(path.resolve(__dirname, 'appointments.json'), JSON.stringify(data), function writeJSON(err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(data));
        });
        res.json({
            "username": username,
            "content": content
        });
    } catch (err) {
        console.log(`Error writing JSON:  ${err}`);
        res.json({error});
    }
});


module.exports = router;
