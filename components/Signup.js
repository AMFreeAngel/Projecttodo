import React, { useState } from "react";
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
  Label,
  Toast,
  Spinner
} from "native-base";
function Signup({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedpassword, setConfirmedpassword] = useState("");
  const showToast = (type, message) => {
    Toast.show({
      text: `${message}`,
      type: type,
      position: "top",
      duration: 3000
    });
  };
  const signupUser = () => {
    setLoading(true);
    try {
      if (email.length < 6) {
        alert("Please enter at least 6 characters");
        return;
      }
      if (password !== confirmedpassword) {
        alert("Please check your password");
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
            showToast("success", "Successfully created your account");
            setLoading(false);
          navigation.navigate("Login");
        })
        .catch(err => {
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
        <Item floatingLabel>
          <Label>Confirmed Password</Label>
          <Input
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={text => setConfirmedpassword(text)}
          />
        </Item>

        {loading ? (
          <Spinner />
        ) : (
          <Button
            style={{ marginTop: 20 }}
            full
            rounded
            primary
            onPress={signupUser}
          >
            <Text style={{ color: "white" }}>Sign up</Text>
          </Button>
        )}
      </Form>
      <View style={styles.login}>
        <Text>Don't have a account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={{ color: "blue", textDecorationLine: "underline" }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20
  },
  login: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 20
  },
  textwarning: {
    color: "#E04776",
    textAlign: "center"
  }
});
