import { createContext, useState } from "react"; // context 기본적으로 내장되어있음
export const UserContext = createContext(null);

const UserStore = (props) => {
    const [Id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setLogin] = useState("");
    const [joinId, setJoinId] = useState("");
    const [addr, setAddr] = useState("");



    return(
        <UserContext.Provider value = {{Id, setId, password, setPassword, isLogin, setLogin,
        joinId, setJoinId, addr, setAddr}}>
            {props.children}
        </UserContext.Provider> 
    );
};
export default UserStore;
