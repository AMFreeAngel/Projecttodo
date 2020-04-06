import React, { useEffect }from 'react'
import * as firebase from "firebase";

import { ActivityIndicator } from "react-native";
const LoadingHomePage = ({ navigation }) => {
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    navigation.navigate("Todo List")
                } else {
                    navigation.navigate("Login");
                }
            }
        )
    })
    return (
        <ActivityIndicator style={{flex:1,alignItems:"center",justifyContent:"center"}}/>
    )
}

export default LoadingHomePage
