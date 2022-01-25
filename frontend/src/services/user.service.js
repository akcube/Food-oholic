import axios from "axios"

const RegisterUser = async (user, authContext) => {
    let User;
    try{
        let res = await axios.post("/user/register", user);
        localStorage.setItem("jwt", res.data.token);
        axios.defaults.headers.common["Authorization"] = res.data.token;
        User = {success: res.data.success, token: res.data.token};
    }
    catch(e){
        User = {success: false, user: {}};
    }
    authContext.login(User);
}

export const registerUser = RegisterUser