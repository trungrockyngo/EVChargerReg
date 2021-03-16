import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from 'primereact/inputswitch';
import Table from 'react-bootstrap/Table';
import Moment from 'react-moment';

import axios from 'axios';

export function DevicePage() {
  const defaultURL = 'http://localhost:8000/device/';

  const [deviceId, setDeviceId] = useState('');
  const [controllerId, setControllerId] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [mac, setMac] = useState('');
  const [powerType, setPowerType] = useState('');
  const [long, setLong] = useState('');
  const [lat, setLat] = useState('');
  const [lastSeen, setLastSeen] = useState('');
  const [temp, setTemperature] = useState('');
  const [status, setStatus] = useState('');
  const [lastCommand, setLastCommand] = useState('');
  const [inputTemp, setInputTemperature] = useState('');
  const [inputStatus, setInputStatus] = useState(false);


  const getDeviceInformationIdHandler = async ev => {
    ev.preventDefault();
    // try {
    console.log('deviceId selected ' + deviceId);

    const res = await axios({
      method: 'get',
      url: 'http://localhost:8000/device/id',
      params: {
        deviceId: deviceId,
      },
    });
    console.log('json ' + res.data);
    setControllerId(res.data.controllerID);
    setMac(res.data.macAddress);
    setBrand(res.data.brand);
    setModel(res.data.model);
    setPowerType(res.data.powerType);
    res.data.location ? setLong(res.data.location.long) : setLong('');
    res.data.location ? setLat(res.data.location.lat) : setLat('');
    setLastSeen(res.data.lastSeen);
    setLastCommand(res.data.lastExecCommand);
    res.data.inUse ? setStatus(res.data.inUse + "") : setStatus('');
    setTemperature(res.data.currentTemp);

    // } catch (e) {
    //     console.error(e)
    // }
  };

  const setCurrentTempHandler = async (ev) => {
    ev.preventDefault();

    await axios({
      method: 'post',

      url: 'http://localhost:8000/device/update',
      data: {
        deviceId: deviceId,
        currentTemp: inputTemp,
      },
    });

  }

  const setInUseStatus = async (e) => {

    setInputStatus(e.value);

    await axios({
      method: 'post',

      url: 'http://localhost:8000/device/updateStatus',
      data: {
        deviceId: deviceId,
      },
    });

  }

  return (
    <div>
      <section className="section-setting">
        <form onSubmit={getDeviceInformationIdHandler}>
          {/* <label htmlFor="Type in deviceID">Get Device Details </label> */}
          <label> Device ID: </label>
          <InputText
            value={deviceId}
            onChange={e => setDeviceId(e.target.value)}
          />
          <button name="submit"> Submit </button>
        </form>
      </section>

      <section className="section-setting">
        <Table striped bordered hover size="sm">
          <thead >
            <tr className="tr-heading">
              <th colSpan="2">Device Information </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Device ID</th>
              <td> {deviceId}</td>
            </tr>
            <tr>
              <th>Brand</th>
              <td> {brand} </td>
            </tr>
            <tr>
              <th>Model</th>
              <td> {model} </td>
            </tr>
            <tr>
              <th>MAC Address</th>
              <td> {mac} </td>
            </tr>
            <tr>
              <th>Power Type</th>
              <td> {powerType} </td>
            </tr>
            <tr>
              <th>Controller ID</th>
              <td> {controllerId} </td>
            </tr>
            <tr>
              <th>Location - Longitude</th>
              <td>{long} </td>
            </tr>
            <tr>
              <th>Location - Latitude </th>
              <td> {lat}</td>
            </tr>
            <tr>
              <th>Date Last Seen</th>
              <td> {lastSeen ? <Moment>{lastSeen}</Moment> : ''} </td>
            </tr>
            <tr>
              <th>Temperature</th>
              <td> {temp}</td>
            </tr>
            <tr>
              <th>In-Use Status</th>
              <td> {status}</td>
            </tr>
            <tr>
              <th>Last Executed Command</th>
              <td> {lastCommand}</td>
            </tr>
          </tbody>
        </Table>
      </section>
      {/* <label> Current Device </label> */}

      <section>
        <h4>
          Update Device's Current Temperature
        </h4>
        <form onSubmit={setCurrentTempHandler}>
          <label> Current Temperature </label>
          <InputText
            value={inputTemp}
            onChange={e => setInputTemperature(e.target.value)}
          />
          <button name="submit"> Set Temperature </button>
        </form>
      </section>
      <section>
        <h4>Set In-Use Status</h4>
        <InputSwitch checked={inputStatus} onChange={setInUseStatus} />
      </section>
    </div>
  );
}
