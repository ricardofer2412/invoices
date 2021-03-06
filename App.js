import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import Invoices from './components/Invoices/invoices'
import CreateInvoice from './components/Invoices/createInvoice'
import CustomerList from './components/Customers/customersList'
import CreateCustomer from './components/Customers/createCustomers'
import Loading from './components/Loading'
import CustomerDetail from './components/Customers/CustomerDetail'
import { decode, encode } from 'base-64'
import * as firebase from 'firebase'

global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = byteArray => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } }

if (!global.btoa) { global.btoa = encode; }

if (!global.atob) { global.atob = decode; }
const Stack = createStackNavigator();

function MyStack({ initalRouteName }) {
  return (

    <Stack.Navigator
      intialRouteName={initalRouteName}
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#5D5AAA',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        cardStyle: { backgroundColor: 'white' },

      }}>

      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={
          { title: 'Dashboard' },
          { headerLeft: null }
        }
      />
      <Stack.Screen
        name="Invoices"
        component={Invoices}
        options={
          { title: 'Invoices' },
          { headerLeft: null }
        }
      />
      <Stack.Screen
        name="CreateInvoice"
        component={CreateInvoice}
        options={
          { title: 'New Invoice' },
          { headerLeft: null }
        }
      />
      <Stack.Screen
        name="CustomersList"
        component={CustomerList}
        options={
          { title: 'Customers' },
          { headerLeft: null }
        }
      />
      <Stack.Screen
        name="CreateCustomer"
        component={CreateCustomer}
        options={
          { title: 'New Customer' },
          { headerLeft: null }
        }
      />
      <Stack.Screen
        name="CustomerDetail"
        component={CustomerDetail}
        options={
          { title: 'Customer Info' },
          { headerLeft: null }
        }
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: 'Signup' }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={
          { title: 'Login' },
          { headerLeft: null }
        }
      />
    </Stack.Navigator>

  );
}

export default function App() {
  const [user, setUser] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);



  useEffect(() => {
    firebase.auth().onAuthStateChanged(loggedInUser => {
      if (loggedInUser) {
        setUser(loggedInUser);
      }
      setLoadingUser(false);
    })
  }, []);


  return (
    <NavigationContainer>
      {loadingUser ? (
        <Loading />
      ) : (
          <MyStack initialRouteName={user ? "Dashboard" : 'Login'} />
        )}

    </NavigationContainer>

  );
}