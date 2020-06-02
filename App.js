import * as React from 'react';
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
global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = byteArray => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } }

if (!global.btoa) { global.btoa = encode; }

if (!global.atob) { global.atob = decode; }
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      intialRouteName='Loading'
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#3740FE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
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
          { title: 'CreateInvoice' },
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
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />

    </NavigationContainer>

  );
}