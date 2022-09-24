import React, { createContext, useContext, useReducer } from "react";

//Prepares the dataLayer
export const StateContext = createContext();

//Wrap out APP and provide data layer
export const StateProvider =  ({ reducer, initialState, children }) =>{
    // const createUser = (email, password) => {
    //     return createUserWithEmailAndPassword(auth, email, password);
    // };
    return (
        <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
        </StateContext.Provider>
    );
};
//pull information from data layer
export const useStateValue = ()=> useContext(StateContext);