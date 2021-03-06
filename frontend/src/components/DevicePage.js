import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';

import axios from "axios";


//class DevicePage extends React.Component {
export function DevicePage() {
    const defaultURL = 'http://localhost:8000/device/';

    const [deviceId, setDeviceId] = useState('');
    const [controllerId, setControllerId] = useState('');

    const getControllerIdHandler = async (ev) => {
        ev.preventDefault();
        // try {
            console.log('deviceId selected ' + deviceId);

            const res = await axios({
                method: 'get',
                //url: defaultURL + 'controller',
                url: 'http://localhost:8000/device/controller',
                params: {
                    deviceID: deviceId
                }
            });
            console.log('json ' + res.data);
            setControllerId(res.data.ControllerID);

        // } catch (e) {
        //     console.error(e)
        // }
    }


    return (
        <div>
            {/* <label> Current Device </label> */}
            <form onSubmit={getControllerIdHandler}>
                <InputText value={deviceId} onChange={(e) =>
                    setDeviceId(e.target.value)} />

                {/* <label htmlFor="Type in deviceID">Get Controller </label> */}
                <label> Get Controller </label>
                <button name="submit"> Submit </button>
                <label>Controller ID: {controllerId}</label>
            </form>
        </div>
    );
}