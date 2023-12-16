import {createContext, useState} from 'react'

export const StateContext =createContext()

const ContextProvider =({children}) =>{
    const [userName, setUserName] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return (
        <StateContext.Provider value={{userName, setUserName,isLoggedIn, setIsLoggedIn}}>
          {children}
        </StateContext.Provider>
    )
}
export default ContextProvider