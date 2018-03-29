export const LOGGEDIN = 'LOGGEDIN'
export const LOGOUT = 'LOGOUT'

export function loggedIn(user){
    console.log("action loggedin "+JSON.stringify(user));
    return {type:LOGGEDIN,payload:user}
}

export function logout(user){
    console.log("action loggedin "+JSON.stringify(user));
    return {type:LOGOUT}
}