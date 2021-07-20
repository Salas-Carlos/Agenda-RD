
import { types } from "../types/types";


export const eventAddnew = (event)=> ({
    type:types.eventAddnew,
    payload: event
});


export const eventSetActive = (event)=> ({
    type:types.eventSetActive,
    payload: event
});