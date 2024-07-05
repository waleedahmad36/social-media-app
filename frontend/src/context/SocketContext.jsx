// import { createContext, useContext, useEffect, useState } from "react";
// import { useRecoilValue } from "recoil";
// import io from 'socket.io-client'
// import userAtom from "../atoms/userAtom";
// const SocketContext = createContext();


// export const useSocket = ()=>{
//     return useContext(SocketContext)
// }

// export const SocketContextProvider = ({children})=>{
//     const [socket,setSocket] = useState(null);
//     const [onlineUsers,setOnlineUSers]=useState([])
//     const user = useRecoilValue(userAtom)
//     useEffect(()=>{
//         const socket= io("http://localhost:5000",{
//             query:{
//                 userId:user?._id
//             }
//         })
//         setSocket(socket)
//         socket.on("getOnlineUsers",(users)=>{
//             setOnlineUSers(users)
//         })
//         return ()=> socket && socket.close();
//     },[user?._id])
//     console.log(onlineUsers,"online Users")
//     return (
//         <SocketContext.Provider value={{socket,onlineUsers}} >
//             {children}
//         </SocketContext.Provider>
//     )
// }



import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import io from 'socket.io-client';
import userAtom from "../atoms/userAtom";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const user = useRecoilValue(userAtom);

    useEffect(() => {
        if (user?._id) {
            const newSocket = io("http://localhost:5000", {
                query: { userId: user._id },
            });

            setSocket(newSocket);

            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => newSocket.close();
        }
    }, [user?._id]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
