import React, { useState, useEffect } from "react";
import Context from "./index";

const AuthProvider = (props) => {
    const [login, setLogin] = useState([]);
    const [otp, setOtp] = useState('');
    return (
        <Context.Provider
            value={{
                ...props,
                login,
                otp, 
                setOtp,
                setLogin,
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export default AuthProvider;

