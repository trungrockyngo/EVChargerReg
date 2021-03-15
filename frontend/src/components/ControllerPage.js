import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { TabView, TabPanel } from 'primereact/tabview';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Table from 'react-bootstrap/Table';

import axios from 'axios';

export function ControllerPage() {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [powerType, setPowerType] = useState('');

    const [long, setLong] = useState('');
    const [lat, setLat] = useState('');

    const [controllerId, setControllerId] = useState('');

    const [devices, setDevices] = useState([]);
    const [command, setCommand] = useState('Please enter command');

    const [activeIndex, setActiveIndex] = useState(0);
    
    // const [controllerInfo, setControllerInfo] = useState([]);

    const defaultURL = `http://localhost:8000/controller`;
    const getControllerDevicesHandler = async (ev) => {
        ev.preventDefault();
        console.log(`device id is ${controllerId}`);

        //NOTE: somehow doesn't work on my end ... very weird anamoly!
        // const fetchedRes = await axios({
        //     method: 'get',
        //     url: 'http://localhost:8000/controller/devices',
        //     data: { 
        //         id: 'CONTR-2',
        //         // id: controllerId
        //     });

        const fetchedRes = await axios({
            method: 'get',
            url: `${defaultURL}/devices?id=${controllerId}`
        });
        // console.log(`fetchedRes: ${fetchedRes.data}`);
    };

    const registerDeviceHandler = async (ev) => {
        ev.preventDefault();

        const res = await axios({
            method: 'post',
            url: 'http://localhost:8000/device/register',
            data: {
                brand: brand,
                model: model,
                powerType: powerType,
                location: {
                    long: long,
                    lat: lat
                }
            }
        });
    };

    const commandInDeviceHandler = (data) => {
        console.log(`----inside commandInDeviceHandler: lastExecCommand: ${data.lastExecCommand} -----`);
        return (
            <form onSubmit={(ev) => updateCommandHandler(ev, data)}>
                {data.lastExecCommand ?
                    <label> data.lastExecCommand</label>
                    : 
                    <InputText value={command}
                        onChange={ev => setCommand(ev.target.value)} />}
                <button> Change command</button>
            </form>
        );
    }

    const updateCommandHandler = async (ev, data) => {
        ev.preventDefault();

        console.log(`Inside updateCommandHandler(), deviceID: ${data.deviceID}, command: ${ev.target.value}`)

        setCommand(ev.target.value);

        const res = await axios({
            method: 'post',
            url: 'http://localhost:8000/device/executeCommand',
            data: {
                deviceID: data.deviceID,
                command: command
             }
        });
    }

    return (
        <>
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="Show all Device info of Controller">
                    <label> Controller ID:  </label>
                    <form onSubmit={getControllerDevicesHandler}>
                        <InputText value={controllerId} onChange={e => setControllerId(e.target.value)} />

                        <button name="display">Display</button>
                    </form>
                    {/* <DataTable value={devices}>
                        {dynamicColumns}
                        </DataTable>  */}
                    <p>Here is table of each device and its command</p>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Device</th>
                                <th>Update Command</th>
                            </tr>
                        </thead>
                        <tbody>
                            {devices ? devices.map(
                                (rowData, index) => (
                                    <tr key={index}>
                                        <td>{rowData.deviceID}</td>
                                        <td>{commandInDeviceHandler(rowData)}</td>
                                    </tr>))
                                : <tr><td></td></tr>}
                        </tbody>
                    </Table>
                </TabPanel>
                <TabPanel header="Register Device">
                    <form onSubmit={registerDeviceHandler}>
                    <Table striped bordered hover size="sm">
                            <tbody>
                                <tr>
                                    <td>
                                        <label>Device Brand:</label>
                                        <InputText value={brand} onChange={(e) => setBrand(e.target.value)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Model:</label>
                                        <InputText value={model} onChange={(e) => setModel(e.target.value)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Power Type:</label>
                                        <InputText value={powerType} onChange={(e) => setPowerType(e.target.value)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Longtitude:</label>
                                        <InputText value={long} onChange={(e) => setLong(e.target.value)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Latitude:</label>
                                        <InputText value={lat} onChange={(e) => setLat(e.target.value)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button name="submit">Register</button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </form>
                </TabPanel>
            </TabView>
        </>
    );
}