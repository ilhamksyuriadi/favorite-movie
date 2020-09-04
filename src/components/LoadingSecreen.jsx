import React from 'react';
import { Spinner } from 'react-bootstrap';
import './LoadingScreen.scss';

const LoadingScreen = () => {
    return (
        <div className="loading-layout">
            <div>
                <Spinner size="md" animation="grow" variant="info" />
                <Spinner size="md" animation="grow" variant="danger" />
                <Spinner size="md" animation="grow" variant="warning" />
            </div>
        </div>
    )
}

export default LoadingScreen