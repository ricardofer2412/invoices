import React, { Component } from 'react'
import { StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../../database/firebase'



export default class CustomersList extends Component {


  constructor() {
    super();
    this.ref = firebase.firestore().collection('customers');
    this.state = {
      isLoading: true,
      customers: [],
      key: ''
    }
  }
  componentDidMount() {
    this.unsunscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  onCollectionUpdate = (querySnapshot) => {
    const customers = []
    querySnapshot.forEach((doc) => {
      const {
        name, company, customerId
      } = doc.data()
      customers.push({
        key: doc.id,
        doc,
        name,
        company,
        customerId
      })
    })
    this.setState({
      customers,
      isLoading: false
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
              //       subtitle={l.customerId}
              chevron={{ color: 'gray' }}
              bottomDivider
              button
              onPress={() => {
                this.props.navigation.navigate('CustomerDetail', {
                  customerKey: `${JSON.stringify(l.key)}`,
                });

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