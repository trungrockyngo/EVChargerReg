import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { TabView, TabPanel } from 'primereact/tabview';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';

export function SuperAdminPage() {

    const [controllerName, setControllerName] = useState('');
    const [serviceProvider, setServiceProvider] = useState('');
    const [long, setLong] = useState('');
    const [lat, setLat] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const [devices, setDevices] = useState('');
    const [controllers, setControllers] = useState([]);
    const [controller, setController] = useState('');
    const [contDropdown, setContDropdown] = useState([]);

    const registerControllerHandler = async (ev) => {
        ev.preventDefault();
        // try {

        const res = await axios({
            method: 'post',
            //url: defaultURL + 'controller',
            url: 'http://localhost:8000/controller/register',
            data: {
                controllerName: controllerName,
                serviceProvider: serviceProvider,
                location: {
                    long: long,
                    lat: lat
                }
            }
        });
    };

    const assignControllerEvent = async (ev, contId, devId, index) => {
        ev.preventDefault();

        contDropdown[index] = contId;
        setContDropdown(contDropdown);        

        const res1 = await axios({
            method: 'post',
            url: 'http://localhost:8000/controller/assign',
            data: {
                deviceID: devId,
                controllerID: contId
            }
        });

        const res = await axios({
            method: 'get',
            url: 'http://localhost:8000/device/all'
        });

        let result = [];
        res.data.map(record => {
            result.push(record.Record);
        });
        setDevices(result);

        const resCont = await axios({
            method: 'get',
            url: 'http://localhost:8000/controller/all'
        });
        let contResult = [];
        resCont.data.map(record => {
            contResult.push(record.Record.controllerID);
        });
        setControllers(contResult);
    }

    const changeControllerEvent = async (ev, contId, devId, index) => {
        ev.preventDefault();

        contDropdown[index] = contId;
        setContDropdown(contDropdown);

        const res1 = await axios({
            method: 'post',
            url: 'http://localhost:8000/controller/change',
            data: {
                deviceID: devId,
                newControllerID: contId
            }
        });

        const res = await axios({
            method: 'get',
            url: 'http://localhost:8000/device/all'
        });

        let result = [];
        res.data.map(record => {
            result.push(record.Record);
        });
        setDevices(result);

        const resCont = await axios({
            method: 'get',
            url: 'http://localhost:8000/controller/all'
        });
        let contResult = [];
        resCont.data.map(record => {
            contResult.push(record.Record.controllerID);
        });
        setControllers(contResult);
    }

    const tabChangeHandler = async (ev) => {
        setActiveIndex(ev.index);
        console.log('inside get devices');
        const res = await axios({
            method: 'get',
            url: 'http://localhost:8000/device/all'
        });

        let result = [];
        res.data.map(record => {
            result.push(record.Record);
        });
        setDevices(result);

        const resCont = await axios({
            method: 'get',
            url: 'http://localhost:8000/controller/all'
        });
        let contRestult = [];
        resCont.data.map(record => {
            contRestult.push(record.Record.controllerID);
        });
        setControllers(contRestult);
    }

    return (
        <div>
            <TabView activeIndex={activeIndex} onTabChange={tabChangeHandler}>
                <TabPanel header="Register Controller">
                    <label> Fill new Controller Info: </label>
                    <form onSubmit={registerControllerHandler}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label>Controller Name:</label>
                                        <InputText value={controllerName} onChange={(e) => setControllerName(e.target.value)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Controller SP:</label>
                                        <InputText value={serviceProvider} onChange={(e) => setServiceProvider(e.target.value)} />
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
                        </table>
                    </form>
                </TabPanel>
                <TabPanel header="Assign/Change Controller">
                    <table>
                        <thead>
                        <tr>
                    <th>Device ID</th>
                     <th>Controller ID</th>
                     <th>Action</th>
                     <th>New Controller ID</th>
                </tr>
                        </thead>
                        <tbody>
{devices ? devices.map((rowData, index) => (
                 <tr key={index}>
                     <td>{rowData.deviceID}</td>
                     <td>{rowData.controllerID ? rowData.controllerID : 'Not Assigned'}</td>
                     <td>
                         {rowData.controllerID ? <label>Change</label> : <label>Assign</label>}
                     </td>
                     <td>
                        {rowData.controllerID ? 
                            <Dropdown value={contDropdown[index]} options={controllers} onChange={(e) => changeControllerEvent(e, e.value, rowData.deviceID, index)} placeholder="Select a Controller"/> 
                            :
                            <Dropdown value={contDropdown[index]} options={controllers} onChange={(e) => assignControllerEvent(e, e.value, rowData.deviceID, index)} placeholder="Select a Controller"/>
                        }
                     </td>
                 </tr>
)) : <tr><td></td></tr>}
                        </tbody>
                    </table>
                </TabPanel>
            </TabView>
        </div>
    );
}

