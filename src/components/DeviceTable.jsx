import PropTypes from 'prop-types';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState} from "react";
import {deleteDevice} from "../api.js";

const DeviceTable = ({ devices, onDevicesUpdated }) => {
    const [deletingPods, setDeletingPods] = useState([]);

    useEffect(() => {
        setDeletingPods((prevDeletingPods) =>
            prevDeletingPods.filter((podName) => devices.some((device) => device.podName === podName))
        );
    }, [devices]);

    const handleDelete = async (podName) => {
        setDeletingPods((prev) => [...prev, podName]);
        try {
            const response = await deleteDevice(podName);
            toast.success(response.data);
            onDevicesUpdated();
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data);
            } else {
                toast.error('An error occurred while deleting the pod');
            }
        }
    };

    return (
        <table className="device-table">
            <thead>
            <tr>
                <th>#</th>
                <th>Device Group</th>
                <th>Device Count</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {devices.map((device, index) => (
                <tr key={device.podName} className={deletingPods.includes(device.podName) ? 'deleting' : ''}>
                    <td>{index + 1}</td>
                    <td>{device.podName}</td>
                    <td>{device.deviceCount}</td>
                    <td>
                        <FaTrash
                            onClick={() => handleDelete(device.podName)}
                            style={{cursor: deletingPods.includes(device.podName) ? 'not-allowed' : 'pointer'}}
                        />
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

DeviceTable.propTypes = {
    devices: PropTypes.arrayOf(
        PropTypes.shape({
            podName: PropTypes.string.isRequired,
            deviceCount: PropTypes.number.isRequired,
        })
    ).isRequired,
    onDevicesUpdated: PropTypes.func.isRequired,
};

export default DeviceTable;