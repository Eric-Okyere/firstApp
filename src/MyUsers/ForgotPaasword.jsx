import { View, Text, KeyboardAvoidingView, StyleSheet, TextInput, Dimensions,TouchableOpacity }
 from 'react-native'
import React,{useState} from 'react';
import { Formik } from 'formik';
import * as yup from "yup"
import { forgetPassword } from '../api/auth';


const initialValues = {
   
    email:"",
   
}


const validationSchema = yup.object({

email: yup.string().trim().required("Please input your email!"),

})






const Forgetpassword = ({navigation}) => {

    const [message, setMessage]= useState({
        text: "",
        type:""
    })

const handleForgetpassword = async(value, formikActions)=>{
    const res = await forgetPassword(value.email) 
    console.log(res)

    if(!res.success) return updateNotification(setMessage, res.error)
}


    return (
        <>
        { message.text ? ( <AppNotification type={message.type} text={message.text}  />): null }
        <View style={styles.container}>
            {/* <KeyboardAvoidingView> */}
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleForgetpassword}
        >
          {({errors,values, touched,handleSubmit, handleChange, handleBlur})=>{ 
            console.log(errors, values)
            return (
          <>
            <Text style={styles.logo} >Reset Password</Text>
        <View style={{top:70}}>
       

            <Text style={styles.err}>{ touched.email && errors.email?errors.email:""}</Text>
            <TextInput autoCapitalize='none' onChangeText={handleChange("email")} placeholder='example@email.com' style={styles.input} 
             onBlur={handleBlur("email")  }
            />
            
            <TouchableOpacity style={styles.btn} 
            onPress={handleSubmit}
            >
                <Text style={{fontSize:20}}>Reset</Text>
            </TouchableOpacity>

           
            <View style={{justifyContent:"space-between", flexDirection:"row", margin:20}}>
            <TouchableOpacity style={styles.btncont} 
            onPress={() => navigation.navigate("login")}
            >
                <Text
                //  style={{fontSize:20}}
                >Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.btncont}
             onPress={() => navigation.navigate("signup")}
            >
                <Text 
                // style={{fontSize:20}}
                >Sign up</Text>
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

export default Forgetpassword