import axios from "axios"

const LoginUser = async (user, authContext) => {
    let User;
    try{
        let res = await axios.post("/user/login", user);
        localStorage.setItem("jwt", res.data.token);
        axios.defaults.headers.common["Authorization"] = res.data.token;
        User = {success: res.data.success, token: res.data.token};
    }
    catch(e){
        User = {success: false, user: {}};
    }
    authContext.login(User);
}

const GoogleLoginUser = async (googleData, authContext) => {
    let User;
    try{
        let res = await axios.post("/user/googleLogin", googleData);
        localStorage.setItem("jwt", res.data.token);
        axios.defaults.headers.common["Authorization"] = res.data.token;
        User = {success: res.data.success, token: res.data.token};
    }
    catch(e){
        User = {success: false, user: {}};
    }
    authContext.login(User);
}

const LogoutUser = (authContext) => {
    localStorage.removeItem('jwt');
    axios.defaults.headers.common["Authorization"] = '';
    authContext.logout();
}

export const loginUser = LoginUser
export const logoutUser = LogoutUser
export const googleLoginUser = GoogleLoginUser; 