import React,{useState} from "react";
import * as firebase from "firebase";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Button,
  Label,Toast,
  Spinner
} from "native-base";
//import GoogleSignin from "./GoogleSignin";

function Login({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const showToast = (type, message) => {
      Toast.show({
        text: `${message}`,
        type: type,
        position: "top",
        duration: 3000
      });
    };
    
    const loginUser = () => {
      setLoading(true);
      try {
        
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
            .then(res => {
                setLoading(false);
            navigation.navigate("Todo List");
          })
            .catch(err => {
                            console.log(err.message);

            showToast("danger", err.message);
            setLoading(false);

            return;
          });
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <Container style={styles.container}>
      <Text style={{textAlign: "center", color: "#8A8F9E", fontSize: 28}}>Welcome       
        </Text>
        <Text style={styles.textwarning}>Please note that it's a prototype, not for actual usage.
        It works as collective todo list.
        It can be modified for personal storage with this structure in future
        </Text>
      <Form>
        <Item floatingLabel>
          <Label>Email</Label>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={text => setEmail(text)}
          />
        </Item>
        <Item floatingLabel>
          <Label>Password</Label>
          <Input
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={text => setPassword(text)}
          />
        </Item>
        {loading ? (
          <Spinner />
        ) : (
          <Button
            style={{ marginTop: 20 }}
            full
            rounded
            success
            onPress={loginUser}
          >
            <Text style={{ color: "white" }}>Login</Text>
          </Button>
        )}
 
      </Form>
      <View style={styles.register}>
        <Text>Don't have a account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Sign Up");
          }}
        >
          <Text style={{ color: "blue", textDecorationLine: "underline" }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20
  },
  register: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 20
  },
  textwarning: {
    color: "#E04776",
    textAlign: "center"
  }
});
