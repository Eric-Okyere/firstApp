import {auth} from "../../Firebase/authFirebase"

export function createEmailAccount(email,password){
    return async(dispatch)=>{
            try {
             const user =  await auth.auth().createUserWithEmailAndPassword(email,password)
             console.log(user)     
             dispatch(loggedIn(user))
            } catch (error) {
               dispatch(registerError(error.message))
            }
    }
}

export function loginEmailAccount(email,password){
 return async(dispatch)=>{
    try {
        const user = await auth.auth().signInWithEmailAndpassword(email,password)
               dispatch(loggedIn(user))
       } catch (error) {
           console.log(error)
       }
    }
}

export function logout(){
    return async(dispatch)=>{
        try {
             await auth.auth().signOut(),
             dispatch(loggedOut)
        } catch (error) {
            console.log(error)
        }
    }
}
function loggedIn(user){
    return {
        type:"LOGGED_IN",
        payload:user
    }
}
function loggedOut(user){
    return {
        type:"LOGGED_OUT",
        payload:user
    }
}

export function registerError(error){
    return {
        type:"REGISTER_ERROR",
        payload:error
    }
}


