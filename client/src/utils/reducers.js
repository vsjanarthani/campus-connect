import {
    UPDATE_BUSINESS_LOGO,
    UPDATE_FUN_LOGO
} from "./actions";
import { useReducer } from 'react';

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_BUSINESS_LOGO:
            return {
                ...state,
                businessLogo: [...action.businessLogo],
            };
        case UPDATE_FUN_LOGO:
            return {
                ...state,
                funLogo: [...action.funLogo],
            };

            default:
                return state;
    }
};

export function useLogoReducer(initialState) {
    return useReducer(reducer, initialState);
}