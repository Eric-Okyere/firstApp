import { View, Text, KeyboardAvoidingView, StyleSheet, TextInput, Dimensions,TouchableOpacity }
 from 'react-native'
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from "yup"
import axios from "axios"
import AppNotification from '../AppNotification';
import { signup, updateNotification } from '../api/auth';


const initialValues = {
    name:"",
    email:"",
    password:""
}


const validationSchema = yup.object({
name: yup.string().trim().required("Please input your name!"),
email: yup.string().trim().required("Please input your email!"),
password: yup.string().trim().min(4,"Your password is too short!")
.required("Please input your password!"),

})




const Signup = ({navigation}) => {
    const [message, setMessage]= useState({
        text: "",
        type:""
    })


    const handleSignup =async(values, formikActions)=>{
//  try {
    // const {data} = await axios.post('http://192.168.43.94:3000/create-user', {...values})
    // console.log(data)
    const res = await signup(values)
    console.log(res)
    
   
    if(!res.success) return updateNotification(setMessage, res.error)
    else{
        navigation.navigate("login")
    }
    // else{updateNotification(setMessage, res.message)}
    // setMessage({type:"error", text: res.message})
   
 
   

    // if(!res.success) return setMessage({type: "error", text: res.error})

//  } catch (error) {
//     // console.log(error?.response?.data)
//     alert(error.data)
//  }
    
}


    return (
        <>
        { message.text ? ( <AppNotification type={message.type} text={message.text}  />): null }
        <View style={styles.container}>
            {/* <KeyboardAvoidingView> */}
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignup}
        >
          {({errors,values, touched,handleSubmit, handleChange, handleBlur})=>{ 
            console.log(errors, values)
            return (
          <>
            <Text style={styles.logo} >Signup</Text>
        <View style={{top:70}}>
        <Text style={styles.err} >{touched.name && errors.name?errors.name:""}</Text>
            <TextInput onChangeText={handleChange("name")}  placeholder='Eric Okyere' style={styles.input} 
            onBlur={handleBlur("name")}
            />

            <Text style={styles.err}>{ touched.email && errors.email?errors.email:""}</Text>
            <TextInput autoCapitalize='none' onChangeText={handleChange("email")} placeholder='example@email.com' style={styles.input} 
             onBlur={handleBlur("email")}
            />
             <Text style={styles.err} >{touched.password && errors.password?errors.password:""}</Text>
            <TextInput onChangeText={handleChange("password")}  placeholder='*************' style={styles.input} 
             onBlur={handleBlur("password")} secureTextEntry
            />
            <TouchableOpacity style={styles.btn} 
            onPress={handleSubmit}
            >
                <Text style={{fontSize:20}}>Signup</Text>
            </TouchableOpacity>

            <View style={{justifyContent:"space-between", flexDirection:"row", margin:20}}>
            <TouchableOpacity style={styles.btncont}
            onPress={() => navigation.navigate("login")}
            >
                <Text
                //  style={{fontSize:20}}
                >Login</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.btncont}
              onPress={() => navigation.navigate("reset")}
            >
                <Text 
                // style={{fontSize:20}}
                >Forgot password</Text>
            </TouchableOpacity>
            </View>
            </View>
          </>
          )}
          }
            </Formik>
            {/* </KeyboardAvoidingView> */}
        </View>
        </>
    )
}

const {width, height} = Dimensions.get("window")
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "red"
        // justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        height: 125,
        width: 125,
        top: 50,
        backgroundColor: "#09e034",

    },
    input: {
        // borderColor: "black",
        borderWidth: 1,
        marginBottom: 15,
        // top: 70,
        width: width-40,
        height: 40,
        backgroundColor:"#e1e6ed",
        fontSize:20,
        paddingHorizontal:15,
        borderRadius:8

    },
    btn:{
        alignItems:"center",
        margin:10,
        backgroundColor:"#09e034",
        padding:7,
        borderRadius:20
       
    },
    btncont:{
        backgroundColor:"#09e034",
        padding:5,
        borderRadius:20
        
    },
    err:{
        color:"red"
    }
})

export default Signup