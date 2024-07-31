import { useState, useEffect } from 'react';
import { fetchDevices } from './api';
import DeviceForm from './components/DeviceForm';
import DeviceTable from './components/DeviceTable';
import './styles/styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const [devices, setDevices] = useState([]);

    const getDevices = async () => {
        try {
            const devicesData = await fetchDevices();
            setDevices(devicesData);
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    };

    useEffect(() => {
        getDevices();
    }, []);

    return (
        <div className="app">
            <ToastContainer />
            <nav className="navbar">
                <h1>Large Device Setup</h1>
            </nav>
            <main className="main-content">
                <DeviceForm onDevicesUpdated={getDevices} />
                <DeviceTable devices={devices} onDevicesUpdated={getDevices} />
            </main>
        </div>
    );
};

export default App;