exports.getIPAdress = function() {
  var interfaces = require('os').networkInterfaces();

  // 有WLAN先returnWLAN中的IP
  if ('WLAN' in interfaces) {
    var iface = interfaces['WLAN'];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
    delete interfaces['WLAN']
  }

  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {

        return alias.address;
      }
    }
  }
}