
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const UserContext = React.createContext({});

const UserContexProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [ready, setRedy] = useState(false);
    useEffect(() => {
        axios.get("/profile").then(({ data }) => {
            setUser(data)
            setRedy(true);
        })

    }, [])
    return (

        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>



    )
}

export default UserContexProvider;