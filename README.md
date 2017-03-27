# Nespresso Expert Bluetooth Protocol
This example Javascript demonstrates how to talk to a Nespresso Expert coffee machine over BLE. It uses the interface of https://github.com/don/cordova-plugin-ble-central.

In order to obtain your authentication string, you need to sniff on the bluetooth connection of the official app. See related post https://medium.com/@urish/reverse-engineering-a-bluetooth-lightbulb-56580fcb7546

Basically, you're looking for a 16 character hex string that starts with "8" sent to the 06AA3A41-F22A-11E3-9DAA-0002A5D5C51B characteristic.
