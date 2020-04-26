var app = {
    nespressoDeviceId: "00:00:00:00:00:00", // replace with your device id
    nespressoDeviceAuth: "8000000000000000", // replace with your auth (from sniffer)
    sendNespresso: function(volume, temperature) {
        var onConnect = function(device) {
            console.log('connected', device);
            ble.write(app.nespressoDeviceId, "06aa1910-f22a-11e3-9daa-0002a5d5c51b", "06aa3a41-f22a-11e3-9daa-0002a5d5c51b", app.hexToArrayBuffer(app.nespressoDeviceAuth), function() {
                console.log('authenticated');
                ble.write(app.nespressoDeviceId, "06aa1920-f22a-11e3-9daa-0002a5d5c51b", "06aa3a42-f22a-11e3-9daa-0002a5d5c51b", app.hexToArrayBuffer(app.generateNespressoCommand(volume, temperature)), function() {
                    app.showReadyMessage();
                }, function(e) {
                    console.log(e);
                    app.showErrorMessage('Write failure');
                });
            }, function(e) {
                console.log(e);
                app.showErrorMessage('Write failure');
            });
        };
        ble.isConnected(app.nespressoDeviceId, onConnect, function() {
            ble.scan([], 10, function(device) {
                console.log('found', device);
                if (device.id == app.nespressoDeviceId) {
                  ble.connect(app.nespressoDeviceId, onConnect, function(e) {
                      console.log(e);
                      app.showErrorMessage('Connection failure');
                  });
                }
            }, function(e) {
                app.showErrorMessage('Scan failure');
            });
        });
    },
    generateNespressoCommand: function(volume, temperature) {
        var command = "0305070400000000";
        if (temperature == "low") {
            command += "01";
        } else if (temperature == "medium") {
            command += "00";
        } else if (temperature == "high") {
            command += "02";
        } else {
            return "";
        }
        if (volume == "ristretto") {
            command += "00";
        } else if (volume == "espresso") {
            command += "01";
        } else if (volume == "lungo") {
            command += "02";
        } else if (volume == "hotwater") {
            command += "04";
        } else if (volume == "americano") {
            command += "05";
        } else if (volume == "recipe") {
            command += "07";
        } else {
            return "";
        }
        return command;
    },
    hexToArrayBuffer: function(hex) {
        if (typeof hex !== 'string') {
           throw new TypeError('Expected input to be a string');
        }

        if ((hex.length % 2) !== 0) {
           throw new RangeError('Expected string to be an even number of characters');
        }

        var view = new Uint8Array(hex.length / 2);

        for (var i = 0; i < hex.length; i += 2) {
           view[i / 2] = parseInt(hex.substring(i, i + 2), 16);
        }

        return view.buffer;
    },
};
