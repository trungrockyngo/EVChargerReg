/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class ControllerDeviceContract extends Contract {

    controllerID = 0;
    deviceID = 0;

    /*
        It is required for initial testing, it can be removed after UI is available.
    */
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');


        console.info('============= END : Initialize Ledger ===========');
    }

    async getAllControllers(ctx) {
        console.info('============= START : Get All Controllers ===========');

        let queryString = {
            "selector": {
                "docType":"controller"
            }
        };

        const allResults = [];

        for await (const {key, value} of ctx.stub.getQueryResult(JSON.stringify(queryString))) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        console.info('============= END : Get All Controllers ===========');
        return JSON.stringify(allResults);
    }

    async registerController(ctx, controllerName, serviceProvider, long, lat) {
        console.info('============= START : Register Controller ===========');

        this.controllerID++;
        const recControllerID = "CONTR-" + this.controllerID;
        console.log("this.controllerID = " + this.controllerID);

        const controller = {
            controllerID: recControllerID,
            docType: "controller",
            controllerName: controllerName,
            location: { 
                long: long,
                lat: lat
            },
            serviceProvider: serviceProvider
        };

        await ctx.stub.putState(recControllerID, Buffer.from(JSON.stringify(controller)));
        console.info('============= END : Register Controller ===========');
    }

    async updateController(ctx, controllerID, serviceProvider, long, lat) {
        console.info('============= START : Update Controller ===========');

        const controllerAsBytes = await ctx.stub.getState(controllerID); // get the controller from chaincode state
        if (!controllerAsBytes || controllerAsBytes.length === 0) {
            throw new Error(`${controllerID} does not exist`);
        }

        const controller = JSON.parse(controllerAsBytes.toString());
        controller.serviceProvider = serviceProvider;
        controller.location.long = long;
        controller.location.lat = lat;
        
        await ctx.stub.putState(controllerID, Buffer.from(JSON.stringify(controller)));
        console.info('============= END : Update Controller ===========');
    }

    async assignController(ctx, deviceID, controllerID) {
        console.info('============= START : Assign Controller ===========');

        const deviceAsBytes = await ctx.stub.getState(deviceID); // get the device from chaincode state
        if (!deviceAsBytes || deviceAsBytes.length === 0) {
            throw new Error(`${deviceID} does not exist`);
        }

        const device = JSON.parse(deviceAsBytes.toString());
        device.controllerID = controllerID;
        
        await ctx.stub.putState(deviceID, Buffer.from(JSON.stringify(device)));

        console.info('============= END : Assign Controller ===========');
    }

    async changeController(ctx, deviceID, newControllerID) {
        console.info('============= START : Change Controller ===========');

        const deviceAsBytes = await ctx.stub.getState(deviceID); // get the device from chaincode state
        if (!deviceAsBytes || deviceAsBytes.length === 0) {
            throw new Error(`${deviceID} does not exist`);
        }

        const device = JSON.parse(deviceAsBytes.toString());
        device.controllerID = newControllerID;
        
        await ctx.stub.putState(deviceID, Buffer.from(JSON.stringify(device)));

        console.info('============= END : Change Controller ===========');
    }

    async registerDevice(ctx, brand, model, MAC, powerType, long, lat) {
        console.info('============= START : Register Device ===========');

        this.deviceID++;
        const recDeviceID = "DEV-" + this.deviceID;
        console.log("this.deviceID = " + this.deviceID);

        const device = {
            deviceID: recDeviceID,
            docType: "device",
            brand: brand,
            model: model,
            macAddress: MAC,
            powerType: powerType,
            inUse: false,
            location: { 
                long: long,
                lat: lat
            }
        };

        await ctx.stub.putState(recDeviceID, Buffer.from(JSON.stringify(device)));

        console.info('============= END : Register Device ===========');
    }

    async getDeviceController(ctx, deviceID) {
        console.info('============= START : Get Device Controller ===========');


        const deviceAsBytes = await ctx.stub.getState(deviceID); // get the device from chaincode state
        if (!deviceAsBytes || deviceAsBytes.length === 0) {
            throw new Error(`${deviceID} does not exist`);
        }

        const device = JSON.parse(deviceAsBytes.toString());

        console.info('============= END : Get Device Controller ===========');

        return device.controllerID;        
    }

    async executeDeviceCommand(ctx, deviceID, command) {
        console.info('============= START : Execute Device Command ===========');

        const deviceAsBytes = await ctx.stub.getState(deviceID);
        if (!deviceAsBytes || deviceAsBytes.length === 0) {
            throw new Error(`${deviceID} does not exist`);
        }

        const device = JSON.parse(deviceAsBytes.toString());
        device.lastExecCommand = command;
        device.lastExecDateTime = new Date().getTime();
        device.lastSeen = new Date().getTime();

        await ctx.stub.putState(deviceID, Buffer.from(JSON.stringify(device)));

        console.info('============= END : Execute Device Command ===========');
    }

    /*
    async getDeviceLogs(ctx, deviceID) {
        console.info('============= START : Get Device Logs ===========');
        console.info('============= END : Get Device Logs ===========');
    }
    */

    async getControllerDevices(ctx, controllerID) {
        console.info('============= START : Get Controller Devices ===========');

        let queryString = {
            "selector": {
                "docType": "device", 
                "controllerID": controllerID
            }
       };

        const allResults = [];

        for await (const {key, value} of ctx.stub.getQueryResult(JSON.stringify(queryString))) {
          
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        console.info('============= END : Get Controller Devices ===========');
        return allResults;
    }

    async getDevice(ctx, deviceID) {
        console.info('============= START : Get Device ===========');

        const deviceAsBytes = await ctx.stub.getState(deviceID);
        if (!deviceAsBytes || deviceAsBytes.length === 0) {
            throw new Error(`${deviceID} does not exist`);
        }

        console.info('============= END : Get Device ===========');
        return JSON.parse(deviceAsBytes.toString());
    }

    async getAllDevices(ctx) {
        console.info('============= START : Get All Devices ===========');


        let queryString = {
            "selector": {
                "docType":"device"
            }
        };

        const allResults = [];
        for await (const {key, value} of ctx.stub.getQueryResult(JSON.stringify(queryString))) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        console.info('============= END : Get All Devices ===========');
        return JSON.stringify(allResults);
    }

    async updateDevice(ctx, deviceID, currentTemp) {
        console.info('============= START : Update Device ===========');

        const deviceAsBytes = await ctx.stub.getState(deviceID);
        if (!deviceAsBytes || deviceAsBytes.length === 0) {
            throw new Error(`${deviceID} does not exist`);
        }

        const device = JSON.parse(deviceAsBytes.toString());
        device.currentTemp = currentTemp;
        device.lastSeen = new Date().getTime();

        await ctx.stub.putState(deviceID, Buffer.from(JSON.stringify(device)));

        console.info('============= END : Update Device ===========');        
    }

    async updateDeviceStatus(ctx, deviceID) {
        console.info('============= START : Update Device Status ===========');

        const deviceAsBytes = await ctx.stub.getState(deviceID);
        if (!deviceAsBytes || deviceAsBytes.length === 0) {
            throw new Error(`${deviceID} does not exist`);
        }

        const device = JSON.parse(deviceAsBytes.toString());
        device.inUse ? device.inUse = false : device.inUse = true;
        device.lastSeen = new Date().getTime();

        await ctx.stub.putState(deviceID, Buffer.from(JSON.stringify(device)));

        console.info('============= END : Update Device Status ===========');
    }
}

module.exports = ControllerDeviceContract;
