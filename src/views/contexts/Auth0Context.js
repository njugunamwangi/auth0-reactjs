import {createContext} from "react";

export const Auth0Context = createContext()

export function Auth0Provider({children}) {
    return (
        <Auth0Context.Provider value={{ name: 'Des' }}>
            {children}
        </Auth0Context.Provider>
    )
}