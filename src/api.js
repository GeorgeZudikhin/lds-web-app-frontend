import axios from 'axios';

const API_BASE_URL = 'https://api.ldevice.servicedesk.tvwebservices.org/api/v1';

export const fetchDevices = async () => {
    const response = await axios.get(`${API_BASE_URL}/devices`);
    return Object.entries(response.data).map(([podName, deviceCount]) => ({ podName, deviceCount }));
};

export const createDevice = async (assignmentString, numberOfDev) => {
    const response = await axios.post(`${API_BASE_URL}/devices`, {
        assignmentString,
        numberOfDev: parseInt(numberOfDev)
    });
    return response.data;
};

export const deleteDevice = async (podName) => {
    return await axios.delete(`${API_BASE_URL}/devices`, { data: { podName: podName } });
};