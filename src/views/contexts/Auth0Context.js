import {createContext, useEffect, useState} from "react";
import {createAuth0Client} from "@auth0/auth0-spa-js";

export const Auth0Context = createContext()

export function Auth0Provider({children}) {
    const [ isAuthenticated, setIsAuthenticated ] = useState(false)
    const [ user, setUser ] = useState(null)
    const [ auth0Client, setAuth0Client ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        async function initAuth0() {
            const auth0 = await createAuth0Client({
                domain: 'dev-5tm58fubgv4owfb4.us.auth0.com',
                clientId: 'kcoa2dnBs5D3icw3hlYjmwxLiqaxlNBT',

            })

            setAuth0Client(auth0)

            const query = window.location.search

            if (query.includes("code=") && query.includes("state=")) {
                try {
                    await auth0.handleRedirectCallback();
                } catch (err) {
                    console.error(err)
                    alert(err)
                }
                window.history.replaceState({}, document.title, "/");
            }

            const isAuthenticated = await auth0.isAuthenticated()
            setIsAuthenticated(isAuthenticated)

            if (isAuthenticated) {
                const user = await auth0.getUser()
                setUser(user)
            }

            setIsLoading(false)
        }

        initAuth0()
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.error(err)
            })

    }, [])

    return (
        <Auth0Context.Provider value={{
            isAuthenticated,
            user,
            isLoading,
            login: () => auth0Client && auth0Client.loginWithRedirect({
                authorizationParams: {
                    redirect_uri: window.location.origin
                }
            })
        }}>
            {children}
        </Auth0Context.Provider>
    )
}