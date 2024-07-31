import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import {createDevice} from "../api.js";

const DeviceForm = ({ onDevicesUpdated }) => {
    const [assignmentString, setAssignmentString] = useState('');
    const [numberOfDev, setNumberOfDev] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (assignmentString && numberOfDev && numberOfDev % 10 === 0) {
            setIsButtonDisabled(false);
            setErrorMessage('');
        } else {
            setIsButtonDisabled(true);
            if (numberOfDev && numberOfDev % 10 !== 0) {
                setErrorMessage('Number of devices must be a multiple of 10');
            } else {
                setErrorMessage('');
            }
        }
    }, [assignmentString, numberOfDev]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createDevice(assignmentString, numberOfDev);
            onDevicesUpdated();
            setNumberOfDev('');
        } catch (error) {
            console.error('Error creating devices:', error);
        }
    };

    return (
        <form className="device-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Assignment String"
                value={assignmentString}
                onChange={(e) => setAssignmentString(e.target.value)}
            />
            <input
                type="number"
                placeholder="Number of Devices"
                value={numberOfDev}
                onChange={(e) => setNumberOfDev(e.target.value)}
            />
            <button type="submit" disabled={isButtonDisabled}>
                Create Devices
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
    );
};

DeviceForm.propTypes = {
    onDevicesUpdated: PropTypes.func.isRequired,
};

export default DeviceForm;
