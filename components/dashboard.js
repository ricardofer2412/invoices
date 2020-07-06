
import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import firebase from '../database/firebase';
import { Card, Title, Paragraph } from 'react-native-paper';
import { AntDesign, Foundation, FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default class Dashboard extends Component {


  constructor() {

    super();
    this.customerRef = firebase.firestore().collection('customers')
    this.state = {
      uid: '',
      loading: true,
      authenticated: false,


    }
  }
  componentDidMount() {
    this.customerRef.get()
      .then(querySnapshot => {
        console.log(querySnapshot.size)
        this.customerNumber = querySnapshot.size
      })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loading: false, authenticated: true });
      } else {
        this.setState({ loading: false, authenticated: false });
      }
    });

  }
  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.cardView}>
          <Card style={styles.cards}
            onPress={() => this.props.navigation.push('CreateInvoice')} >
            <Card.Content style={styles.cardContent}
            >
              <Title>New Invoice</Title>
              <AntDesign name="addfile" size={24} color="black" />
            </Card.Content>
          </Card>
          <Card style={styles.cards}
            onPress={() => this.props.navigation.push('Invoices')} >
            <Card.Content style={styles.cardContent}>
              <Title>Invoices</Title>
              <Foundation name="page" size={24} color="black" />
            </Card.Content>
          </Card>
          <Card style={styles.cards}
            onPress={() => this.props.navigation.push('CreateCustomer')}>
            <Card.Content style={styles.cardContent}>
              <Title>New Customer</Title>
              <FontAwesome name="user-plus" size={24} color="black" />
            </Card.Content>
          </Card>

          <Card style={styles.cards}
            onPress={() => this.props.navigation.push('CustomersList')}>
            <Card.Content style={styles.cardContent}>
              <Title>Customers</Title>
              <FontAwesome name="users" size={24} color="black" />
            </Card.Content>
          </Card>

        </View>

        <Button
          color="#3740FE"
          title="Logout"
          onPress={() => this.signOut()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  },
  cardView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  cards: {
    marginTop: 10,
    marginBottom: 20
  }
});