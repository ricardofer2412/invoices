import React, { Component } from 'react'
import { Button, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, ActivityIndicator, View, useColorScheme, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import firebase from '../../database/firebase'

const uuid = require("uuid");


export default class CreateCustomer extends Component {

  constructor() {
    super()
    this.dbRef = firebase.firestore().collection('customers');
    this.state = {
      name: '',
      company: '',
      phone: '',
      email: '',
      address: '',
      isLoading: false
    }
  }
  componentDidMount = () => {
    var user = firebase.auth().currentUser
    var customerId
    if (user != null) {
      customerId = user.uid
      console.log(customerId)


    }
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  createUser = () => {
    const customerId = uuid();

    var user = firebase.auth().currentUser
    var uid;
    if (user != null) {
      uid = user.uid
      console.log(uid)


    }
    console.log(uid)
    if (this.state.name === '') {
      alert('Fill at least your name!')
    } else {
      this.setState({
        isLoading: true,
      });
      this.dbRef.add({

        customerId: uid,
        name: this.state.name,
        company: this.state.company,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address

      }).then((res) => {
        this.setState({
          name: '',
          company: '',
          phone: '',
          email: '',
          address: '',
          isLoading: false,
        });
        this.props.navigation.navigate('Dashboard')
      })
        .catch((err) => {
          console.error("Error found: ", err);
          this.setState({
            isLoading: false,
          });
        });
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    return (
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }} ref='scroll'>
        <KeyboardAvoidingView behavior='position' style={{ backgroundColor: 'white', flex: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.textview}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Customer Name"
                  value={this.state.name}
                  onChangeText={(val) => this.updateInputVal(val, 'name')}
                />
              </View>
              <View style={styles.textview}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Compnany"
                  value={this.state.company}
                  onChangeText={(val) => this.updateInputVal(val, 'company')}
                />
              </View>
              <View style={styles.textview}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Phone"
                  value={this.state.phone}
                  onChangeText={(val) => this.updateInputVal(val, 'phone')}
                /></View>
              <View style={styles.textview}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Email"
                  autoCapitalize='none'
                  value={this.state.email}
                  onChangeText={(val) => this.updateInputVal(val, 'email')}
                />
              </View>
              <View style={styles.textview}>
                <TextInput
                  style={styles.inputStyle}
                  multiline
                  numberOfLines={4}
                  placeholder="Address"
                  value={this.state.address}
                  onChangeText={(val) => this.updateInputVal(val, 'address')}
                />
              </View>
              <View style={styles.textview}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => this.createUser()}>
                  <Text style={styles.buttontext}>
                    Add Customer
           </Text>
                </TouchableOpacity >
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: 'flex-start',
    paddingTop: 50,
    backgroundColor: 'white'
  },
  textview: {
    marginTop: 35
  },
  inputStyle: {
    width: '90%',
    fontSize: 15,
    marginBottom: 10,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  buttonStyle: {

    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 40,
    borderRadius: 45,
    height: 45,
    backgroundColor: '#3740FE',
    width: '90%'
  },
  buttontext: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    marginTop: 7

  }
})