import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../../database/firebase';
import CustomersList from './customersList';

class CustomerDetail extends Component {

  constructor() {
    super();
    this.state = {
      key: '',
      name: '',
      company: '',
      phone: '',
      email: '',
      address: '',
      isLoading: true
    };
  }

  componentDidMount() {
    const { route } = this.props;

    const ref = firebase.firestore().collection('customers').doc(JSON.parse(route.params['customerKey']))
    ref.get().then((res) => {
      if (res.exists) {
        const customer = res.data();
        this.setState({
          key: res.id,
          name: customer.name,
          company: customer.company,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          isLoading: false
        });
      } else {
        console.log("Customer does not exist!");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updateCustomer() {
    this.setState({
      isLoading: true,
    });
    const { route } = this.props;

    const ref = firebase.firestore().collection('customers').doc(JSON.parse(route.params['customerKey']))
    ref.set({
      name: this.state.name,
      company: this.state.company,
      phone: this.state.phone,
      email: this.state.email,
      address: this.state.address
    }).then((docRef) => {
      this.setState({
        name: '',
        company: '',
        phone: '',
        email: '',
        address: '',
        isLoading: false,
      });
      this.props.navigation.navigate('CustomersList');
    })
      .catch((error) => {
        console.error("Error: ", error);
        this.setState({
          isLoading: false,
        });
      });
  }

  deleteCustomer() {
    const { route } = this.props;

    const ref = firebase.firestore().collection('customers').doc(JSON.parse(route.params['customerKey']))
    ref.delete().then((res) => {
      console.log('Item removed from database')
      this.props.navigation.navigate('CustomersList');
    })
  }

  openTwoButtonAlert = () => {
    Alert.alert(
      'Delete Customer',
      'Are you sure?',
      [
        { text: 'Yes', onPress: () => this.deleteCustomer() },
        { text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel' },
      ],
      {
        cancelable: true
      }
    );
  }

  render() {

    return (
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder="name"
          value={this.state.name}
          onChangeText={(val) => this.inputValueUpdate(val, 'name')}

        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Compnany"
          value={this.state.company}
          onChangeText={(val) => this.inputValueUpdate(val, 'company')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Phone"
          value={this.state.phone}
          onChangeText={(val) => this.inputValueUpdate(val, 'phone')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="email"
          autoCapitalize='none'
          value={this.state.email}
          onChangeText={(val) => this.inputValueUpdate(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="address"
          value={this.state.address}
          onChangeText={(val) => this.inputValueUpdate(val, 'address')}
        />

        <View style={styles.button}>
          <Button
            title='Update'
            onPress={() => this.updateCustomer()}
            color="#19AC52"
          />
        </View>
        <View>
          <Button
            title='Delete'
            onPress={this.openTwoButtonAlert}
            color="#E37399"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 7,
  }
})

export default CustomerDetail;