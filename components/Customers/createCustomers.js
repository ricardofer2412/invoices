import React, { Component } from 'react'
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
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

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  createUser = () => {

    const customerId = uuid();

    if (this.state.name === '') {
      alert('Fill at least your name!')
    } else {
      this.setState({
        isLoading: true,
      });
      this.dbRef.add({

        customerId: doc.id,
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
      <View>
        <TextInput
          style={styles.inputStyle}
          placeholder="name"
          value={this.state.name}
          onChangeText={(val) => this.updateInputVal(val, 'name')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Compnany"
          value={this.state.company}
          onChangeText={(val) => this.updateInputVal(val, 'company')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Phone"
          value={this.state.phone}
          onChangeText={(val) => this.updateInputVal(val, 'phone')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="email"
          autoCapitalize='none'
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="address"
          value={this.state.address}
          onChangeText={(val) => this.updateInputVal(val, 'address')}
        />
        <Button
          color="#3740FE"
          title="Add Customer"
          onPress={() => this.createUser()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  }
})