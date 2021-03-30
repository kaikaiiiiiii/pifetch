const axios = require('axios');
const fs = require('fs');
var local = fs.existsSync('pi.txt') ? fs.readFileSync('pi.txt', 'utf-8') : '';

const piloop = async function (max) {
    
    var start = local.length; //start 值等于『小数点后第 n 位』
    while (start < max) {
        console.log(start);
        var addcontent = await axios.get('https://api.pi.delivery/v1/pi', {
            params: {'start':start, 'numberOfDigits': 1000}
        });
        var moredigits = addcontent.data.content;
        fs.appendFileSync('pi.txt', moredigits, 'utf-8');
        start += 1000;
    }
    console.log('ends');
}

piloop(100000000);
