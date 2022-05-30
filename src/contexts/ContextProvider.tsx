import {IEntity} from "../utils/Interfaces";
import React, {createContext, useContext, useState} from "react";

type State = {
    entities: Array<IEntity>,
    setEntities?: React.Dispatch<React.SetStateAction<Array<IEntity>>>
}

const initialState: State = {
    entities: []
}

const StateContext = createContext<State>(initialState);

// @ts-ignore
export const ContextProvider = ({children}) => {

    const [entities, setEntities] = useState<Array<IEntity>>([]);

    return (
        <StateContext.Provider value={{
            entities,
            setEntities
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);