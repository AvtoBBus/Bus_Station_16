import { useContext } from "react";
import { AuthContext } from "../AuthProvider";

export default function useAuth() {
    // console.log(useContext(AuthContext));
    return useContext(AuthContext);
}