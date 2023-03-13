const hid = require('node-hid')
var devices = hid.devices();

console.log(devices)
