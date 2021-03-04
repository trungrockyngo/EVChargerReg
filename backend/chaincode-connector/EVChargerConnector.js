let gateway; 

async function init() {
    let contract;
    try {
        const { Wallets } = require('fabric-network');
        const { Gateway } = require('fabric-network'); //Creates a new gateway and use it to connect to the network
        const path = require('path');
        const fs = require('fs');
    
        const walletPath = path.join(process.cwd(), './wallet/Org1');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        gateway = new Gateway();
        const connectionProfilePath = path.resolve(__dirname, '../gateway', '1OrgLocalFabricOrg1GatewayConnection.json');
        const connectionProfile = JSON.parse(fs.readFileSync(connectionProfilePath, 'utf8'));
        const connectionOptions = {
            wallet, identity: 'Org1 Admin', discovery:
                { enabled: true, asLocalhost: true }
        };
        await gateway.connect(connectionProfile, connectionOptions);
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');
        // Get the contract from the network.
        contract = network.getContract('EVChargerReg');
        return contract;
    } catch (error) {
        console.error('Failed to initialize transaction:', error);
        process.exit(1);
    }
}

async function getAllControllers() {
    const contract = await init();
    let result;
    try {
        result = await contract.submitTransaction('getAllControllers');
        await disconnectGateway();    
    } catch (error) {
        console.error('Failed to submit transaction:', error);
        process.exit(1);
    }
    console.log('result from chaincode = ' + result.toString());
    return JSON.parse(result.toString());
}

async function registerController(cn, sp, long, lat) {
    const contract = await init();
    try {
        await contract.submitTransaction('registerController', cn, sp, long, lat);
    } catch (error) {
        console.error('Failed to submit transaction:', error);
        process.exit(1);
    }
    await disconnectGateway();    
    return JSON.parse('{"result": "success"}');
}

async function disconnectGateway() {
    gateway.disconnect();
}


async function getAllDevices() {
    const contract = await init();
    let result;
    try {
        result = await contract.submitTransaction('getAllDevices');
        await disconnectGateway();    
    } catch (error) {
        console.error('Failed to submit transaction:', error);
        process.exit(1);
    }
    console.log('result from chaincode = ' + result.toString());
    return JSON.parse(result.toString());
}

async function getDevice(id) {
    const contract = await init();
    let result;
    try {
        result = await contract.submitTransaction('getDevice', id);
        await disconnectGateway();    
    } catch (error) {
        console.error('Failed to submit transaction:', error);
        process.exit(1);
    }
    console.log('result from chaincode = ' + result.toString());
    return JSON.parse(result.toString());
}


async function getControllerDevices(id) {
    const contract = await init();
    let result;
    try {
        result = await contract.submitTransaction('getControllerDevices', id);
        await disconnectGateway();    
    } catch (error) {
        console.error('Failed to submit transaction:', error);
        process.exit(1);
    }
    console.log('result from chaincode = ' + result.toString());
    return JSON.parse(result.toString());
}


module.exports = {
    getAllControllers: getAllControllers,
    registerController: registerController,
    getAllDevices: getAllDevices,
    getDevice: getDevice,
    getControllerDevices: getControllerDevices
}