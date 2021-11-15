import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  Button,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {matchesPattern} from '@babel/types';
export default function App() {
  useEffect(() => {
    fetch(`http://192.168.43.154:5000/`)
      .then(response => response.json())
      .then(json => setPeople(json))
      // .then(json => setBrand(JSON.parse(json.data.data.brand)))
      .catch(error => console.error(error))
    //   .then(console.log(Data.data));
  },1000, [100]);

  global.URL = 'http://192.168.43.154:5000/';
  const [people, setPeople] = useState('');

  const arr = [];
  const storedata = async () => {
    arr.push({id: new Date()});
  };
  const [newData, getTodos] = useState([]);

  const [text, setText] = useState('');
  const change = val => {
    setText(val);
  };
const [formData,setFormData]=useState('')

  const click = async text => {
     setFormData({
         todo:text
     })
    await axios.post(`http://192.168.43.154:5000/add`, {todo:text})
    .then(response => {console.log(response);
    });
  };

  const pressHandler = async _id => {
    // console.log(id);
    // setPeople(prevPeople => {
    //   return prevPeople.filter(person => person.id != id);
    // });
    await axios.post(`http://192.168.43.154:5000/del/${_id}`, {todo:text})
    .then(response => {console.log(response)}
    )
}

  return (
    <View style={styles.container}>
      <View style={styles.bg}>
        <Text style={styles.head}>TODO APP</Text>
      </View>

      <View style={{paddingHorizontal: 22}}>
        <View style={styles.cont}>
          <View style={styles.inputC}>
            <Text>{newData}</Text>
            <TextInput
              style={{height: 43, fontSize: 18, paddingVertical: -22}}
              Placeholder="new todo"
              onChangeText={change}
            />
          </View>
          <View style={{marginBottom: 12}}>
            <Button
              color="coral"
              style={{height: 22}}
              height={32}
              title="Add"
              onPress={() => click(text)}
            />
          </View>
        
          <FlatList
            keyExtractor={item => item._id}
            data={people}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => pressHandler(item._id)}>
                <Text style={styles.item}>{item.todo}</Text>
          
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  bg: {
    height: 30,
    // flex: 1,
    // padding: 40,

    alignItem: 'center',
    justifyContent: 'center',
    backgroundColor: 'coral',
    height: 59,
  },
  head: {
    fontWeight: 'bold',
    // paddingTop: 10,
    textAlign: 'center',
    color: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    fontSize: 18,
  },
  inputC: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 30,
  },

  cont: {
    justifyContent: 'center',
    alignItem: 'center',
  },
  item: {
    padding: 10,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,

    borderRadius: 1,
    borderRadius: 10,
  },
});
