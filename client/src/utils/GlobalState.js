import React, { createContext, useContext } from "react";
import { useLogoReducer } from './reducers';

const LogoContext = createContext();
const { Provider } = LogoContext;

const LogoProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useLogoReducer({
        businessLogo: "",
        funLogo: "",
    })
    console.log(state);
    return <Provider value={[state, dispatch]} {...props} />;
}

const useLogoContext = () => {
    return useContext(LogoContext);
};

export { LogoProvider, useLogoContext };