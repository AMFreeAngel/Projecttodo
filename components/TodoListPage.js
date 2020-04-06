import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { SwipeableFlatList } from "react-native-swipeable-flat-list";

import { StyleSheet, Text, View, StatusBar } from "react-native";
import {
  Container,
  Content,
  Header,
  Body,
  Input,
  Item,
  Button,
  Title,
  Toast
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Dialog, { DialogContent } from "react-native-popup-dialog";
const showToast = (type, message) => {
  Toast.show({
    text: `${message}`,
    type: type,
    position: "top",
    duration: 3000
  });
};
function TodoListPage() {
  const [visible, setVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [dataList, setDataList] = useState([]);
  const [updatedName, setUpdatedName] = useState({});

  useEffect(() => {
    firebase
      .database()
      .ref("/todo")
      .on("value", data => {
        var storage = [];
        for (var i = 0; i < Object.keys(data.val()).length; i++) {
          storage.push({
            key: Object.keys(data.val())[i],
            data: Object.values(data.val())[i]
          });
        }

        setDataList(storage);
      });
  }, []);
  console.log(dataList);
  const addRow = () => {
    if (newName) {
      var key = firebase
        .database()
        .ref("/todo")
        .push().key;
      firebase
        .database()
        .ref("/todo")
        .child(key)
        .set({ name: newName })
        .then(res => {
          setNewName("");
          showToast("success", "Added");
        });
    }
  };
  const deleteRow = item => {
    // deleteRow
    firebase
      .database()
      .ref("/todo")
      .child(item.key)
      .remove()
      .then(res => {
        showToast("danger", "Removed");
      });
  };
  const openDialog = item => {
    setVisible(true);
    setUpdatedName({ key: item.key, name: item.data.name });
  };
  console.log(updatedName);
  const updateInfo = () => {
    console.log(updatedName.key);
    firebase
      .database()
      .ref("/todo/" + updatedName.key)

      .update({
        name: updatedName.name
      })
      .then(() => {
        showToast("success", "Updateded");
        setVisible(false);
      });
  };
  return (
    <Container style={styles.container}>
      <Header style={{ marginTop: StatusBar.currentHeight }}>
        <Body>
          <Title>List</Title>
        </Body>
      </Header>
      <Content>
        <Item>
          <Input
            backgroundColor='#EEF4FF'
            placeholder="Add todo"
            defaultValue={newName}
            onChangeText={text => setNewName(text)}
          />
          <Button 
            style={styles.buttonadd}
            onPress={addRow}>
            <Ionicons name="ios-add-circle" size={24} width={30} />
          </Button>
        </Item>

        <SwipeableFlatList
          keyExtractor={(item, index) => {
            return "item-" + index;
          }}
          enableEmptySections
          data={dataList}
          renderItem={({ item }) => (
            <Text style={{ height: 48 }}>{item.data.name}</Text>
          )}
          renderLeft={({ item }) => (
            <Button
              full
              style={styles.buttoninfo}
              onPress={() => openDialog(item)}
              title="Show Dialog"
            >
              <Ionicons name="ios-create" size={24} />
            </Button>
          )}
          renderRight={({ item }) => (
            <Button
              full
              danger
              style={styles.buttondelete}
              onPress={() => deleteRow(item)}
            >
              <Ionicons name="ios-trash" size={24}/>
            </Button>
          )}
          backgroundColor={"white"}
        />
        <View style={{ flex: 1 }}>
          <Dialog
            visible={visible}
            onTouchOutside={() => {
              setVisible(false);
            }}
            style={{ flex: 3 }}
          >
            <DialogContent style={styles.dialog}>
              <Text style={styles.inputTitle}>Edit todo</Text>
              <Input
                defaultValue={updatedName.name}
                onChangeText={text =>
                setUpdatedName({ ...updatedName, name: text })
                }
              />
              <Button style={styles.buttonOk}
                full
                danger 
                onPress={() => updateInfo()}
              >
                <Text>OK</Text>
              </Button>
            </DialogContent>
          </Dialog>
        </View>
      </Content>
          <Button
            style={styles.button} 
            onPress={()=>{firebase.auth().signOut();}}>
            <Text style={{ color: "#FFF", fontWeight: "500" }}>Log out</Text>
          </Button>
    </Container>
  );
}

export default TodoListPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  dialogContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    elevation: 10
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonadd: {
    marginVertical: 10,
    //marginHorizontal: 30,
    backgroundColor: "#767CE0",
    borderRadius: 4,
    height: 52,
    width: 75,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttoninfo: {
   // marginHorizontal: 5,
    backgroundColor: "#B7ED82",
    borderRadius: 4,
    //height: 52,
    width: 75,
    //marginBottom: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttondelete: {
    // marginHorizontal: 5,
     backgroundColor: "#E9446A",
     borderRadius: 4,
     //height: 52,
     width: 75,
     //marginBottom: 10,
     alignItems: "center",
     justifyContent: "center"
   },
   dialog: {
    marginVertical: 30,
    backgroundColor: "#fff",
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    width: 350
   },
   buttonOk: {
    backgroundColor: "#B7ED82",
    borderRadius: 4,
    width: 75,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
   },
   inputTitle: {
    fontSize: 25,
   // backgroundColor: "#8A8F9E"
   }
});
