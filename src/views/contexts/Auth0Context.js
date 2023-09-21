import {createContext, useContext, useEffect, useState} from "react";
import {createAuth0Client} from "@auth0/auth0-spa-js";

export const Auth0Context = createContext('')
export function Auth0Provider({children}) {
    const [ isAuthenticated, setIsAuthenticated ] = useState(false)
    const [ user, setUser ] = useState(null)
    const [ auth0Client, setAuth0Client ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        initAuth0()
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.error(err)
            })
        async function initAuth0() {
            const auth0 = await createAuth0Client({
                domain: 'dev-5tm58fubgv4owfb4.us.auth0.com',
                clientId: 'kcoa2dnBs5D3icw3hlYjmwxLiqaxlNBT',
                authorizationParams: {
                    redirect_uri: window.location.origin
                }
            })

            setAuth0Client(auth0)

            const query = window.location.search

            if (query.includes("code=") && query.includes("state=")) {
                await auth0.handleRedirectCallback()

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
    }, [])

    return (
        <Auth0Context.Provider value={{
            isAuthenticated,
            user,
            isLoading,
            login: (...p) => auth0Client.loginWithRedirect(...p),
            logout: (...p) => auth0Client.logout(...p)
        }}>
            {children}
        </Auth0Context.Provider>
    )
}

export const useAuth0 = () => useContext(Auth0Context)