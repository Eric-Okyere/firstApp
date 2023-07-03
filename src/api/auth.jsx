import axios from "axios"



const catchError = error =>{
    if(error?.response?.data) {
        return error.response.data
    } 
    else  if(message?.response?.data)
    
    {
        message.response.data
    }

    return { success: false, error: error.message }
}


export const signup = async values =>{
    try {
        const {data} = await axios.post('http://192.168.43.94:3000/create-user', {...values})
        return data
    
     } catch (error) {
       return catchError(error)
     }
}

export const signin = async values =>{
    try {
        const {data} = await axios.post('http://192.168.43.94:3000/sign-in', {...values})
        return data
    
     } catch (error) {
       return catchError(error)
     }
}

export const forgetPassword = async email =>{
    try {
        const {data} = await axios.post('http://192.168.43.94:3000/forgot-password', {email})
        return data
    
     } catch (error) {
       return catchError(error)
     }
}

export const updateNotification = (updater, text, type="error") =>{
    updater({text, type});
    setTimeout(() => {
        updater({text:"", type:""})
    }, 5000);
}
