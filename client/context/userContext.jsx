import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext({})



export function UserContextProvide({children}){

    const [user, setUser] = useState(null)
    useEffect(() => {
        if(!user) {
            axios.get('/profile').then(({data}) => {
                setUser(data) // Set the user data if fetched successfully
            }) 
            .catch((error) => {
                console.error('Error fetching user data:', error);
                setUser(null); // Ensure user is null in case of error
              });
        }
    },[user])
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider> 
    )
}