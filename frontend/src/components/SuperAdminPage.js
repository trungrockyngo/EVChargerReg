import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';

export function SuperAdminPage() {

    const [controllerName, setControllerName] = useState('');
    const [serviceProvider, setServiceProvider] = useState('');
    const [long, setLong] = useState('');
    const [lat, setLat] = useState('');

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

    return (
        <div>
            <p>NavBar item has 2 tabs  Register Controller,​ Show Controller info </p>
            <label> Display Controller Info </label>
            <form onSubmit={registerControllerHandler}>
                <InputText value={controllerName} onChange={(e) =>
                    setControllerName(e.target.value)} />
                <InputText value={serviceProvider} onChange={(e) =>
                    setServiceProvider(e.target.value)} />
                <InputText value={long} onChange={(e) =>
                    setLong(e.target.value)} />
                <InputText value={lat} onChange={(e) =>
                    setLat(e.target.value)} />
                <button name="submit"> register </button>
            </form>
        </div>
    );
}

