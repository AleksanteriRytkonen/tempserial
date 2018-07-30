const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const request = require('request')
const port = new SerialPort('COM3')
const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
parser.on('data', 
    (data) => {
        // Generate json object from serial data
        const t = data.split(',');
        jsonObj = {
            'temperature': t[0],
            'lightness': t[1],
            'moisture': t[2]
        };
        request.post('http://localhost:5000/sensors/',
        { json: jsonObj },
        (error) => {
            if (error) {
                console.log(error);
            }
        });
    }
)