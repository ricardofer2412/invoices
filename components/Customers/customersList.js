import React, { Component } from 'react'
import { StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../../database/firebase'



export default class CustomersList extends Component {


  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('customers');
    this.state = {
      isLoading: true,
      customers: []
    }
  }
  componentDidMount() {
    firebase.firestore().collection('customers')
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data())
        console.log(data)
        console.log(data.uid)
        this.setState({ customers: data })
      })
  }
  render() {
    return (
      <View>
        {
          this.state.customers.map((l, i) => (
            <ListItem
              key={i}
              title={l.name}
              subtitle={l.uid}
              chevron={{ color: 'gray' }}
              bottomDivider
              button
              onPress={() => {
                this.props.navigation.navigate('CustomerDetail', {
                  customerId: l.customerId
                })

              }}
            />
          ))
        }
      </View>

    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})