/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { ControllerDeviceContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logger = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('ControllerDeviceContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new ControllerDeviceContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"controller device 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"controller device 1002 value"}'));
    });

    describe('#controllerDeviceExists', () => {

        it('should return true for a controller device', async () => {
            await contract.controllerDeviceExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a controller device that does not exist', async () => {
            await contract.controllerDeviceExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createControllerDevice', () => {

        it('should create a controller device', async () => {
            await contract.createControllerDevice(ctx, '1003', 'controller device 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"controller device 1003 value"}'));
        });

        it('should throw an error for a controller device that already exists', async () => {
            await contract.createControllerDevice(ctx, '1001', 'myvalue').should.be.rejectedWith(/The controller device 1001 already exists/);
        });

    });

    describe('#readControllerDevice', () => {

        it('should return a controller device', async () => {
            await contract.readControllerDevice(ctx, '1001').should.eventually.deep.equal({ value: 'controller device 1001 value' });
        });

        it('should throw an error for a controller device that does not exist', async () => {
            await contract.readControllerDevice(ctx, '1003').should.be.rejectedWith(/The controller device 1003 does not exist/);
        });

    });

    describe('#updateControllerDevice', () => {

        it('should update a controller device', async () => {
            await contract.updateControllerDevice(ctx, '1001', 'controller device 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"controller device 1001 new value"}'));
        });

        it('should throw an error for a controller device that does not exist', async () => {
            await contract.updateControllerDevice(ctx, '1003', 'controller device 1003 new value').should.be.rejectedWith(/The controller device 1003 does not exist/);
        });

    });

    describe('#deleteControllerDevice', () => {

        it('should delete a controller device', async () => {
            await contract.deleteControllerDevice(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a controller device that does not exist', async () => {
            await contract.deleteControllerDevice(ctx, '1003').should.be.rejectedWith(/The controller device 1003 does not exist/);
        });

    });

});
