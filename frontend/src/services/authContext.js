import React, { Component } from "react"
import jwt_decode from "jwt-decode"

const AuthContext = React.createContext();

class AuthProvider extends Component{
    constructor(props){
        super(props);
        let jwt = localStorage.getItem("jwt");
        this.state = (jwt === null)
            ? {success: false, user: {}}
            : {success: true, user: jwt_decode(jwt)}
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login = data => {
        try{
            this.setState({success: data.success, user: jwt_decode(data.token)});
        }
        catch(e){
            // Invalid token, cannot authenticate
            this.setState({success: false, user: {}});
        }
    }

    logout = () => {
        this.setState({success: false, user: {}});
    }

    isAuthenticated = () => {
        return this.state.success === true;
    }

    render(){
        return <AuthContext.Provider 
            value = {{
                data: this.state,
                login: this.login,
                logout: this.logout,
                isAuthenticated: this.isAuthenticated
            }} {...this.props} />;
    }
}

const useAuth = () => React.useContext(AuthContext);

export {AuthProvider, useAuth, AuthContext}
