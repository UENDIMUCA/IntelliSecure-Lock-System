import React from "react";
import PinCode from "./components/pinCode";
import QRCode from "./components/qrCode";

const LoginPage = () => {

    return (
        <div>
            <h2>Welcome</h2>
            <PinCode />
            <QRCode />
        </div>
    );
};

export default LoginPage;