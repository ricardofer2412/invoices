import React, { Component } from 'react'
import { TouchableHighlight, Modal, Button, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, ActivityIndicator, View, useColorScheme, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard, BackHandler } from 'react-native';
import firebase from '../../database/firebase'
import { Card, ListItem, Icon, SearchBar, Overlay } from 'react-native-elements'
import { Divider } from 'react-native-paper';
import { Octicons, AntDesign, Foundation, FontAwesome, Feather, Fontisto, MaterialIcons } from '@expo/vector-icons';


const uuid = require("uuid");

export default class CreateInvoice extends Component {

  constructor() {
    super()
    this.dbRef = firebase.firestore().collection('invoices');
    this.customerRef = firebase.firestore().collection('customers')
    this.itemRef = firebase.firestore().collection('items')
    this.state = {
      customerName: '',
      email: '',
      qty: '',
      description: '',
      price: '',
      total: '$0.00',
      isLoading: false,
      customerModalVisible: false,
      itemModalVisible: false,
      itemList: [],
      invoiceTotal: 0,


    }
  }

  componentDidMount() {

  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  createCustomer = () => {

    this.setState({
      customerName: this.state.customerName,
      email: this.state.email,
      customerModalVisible: false,
    })
    // })

  }
  createInvoice = () => {
    const customerId = uuid()
    const invoiceId = uuid()
    this.customerRef.add({
      customerId: customerId,
      customerName: this.state.customerName,
      email: this.state.email
    })
    this.setState({
      isLoading: true,
    });
    this.dbRef.add({
      invoiceId: invoiceId,
      customerId: customerId,
      total: this.state.invoiceTotal,
      itemList: this.state.itemList,
      customer: {
        customerName: this.state.customerName,
        email: this.state.email
      }
    }).then((res) => {
      this.setState({
        qty: '',
        detail: '',
        price: '',
        total: '',
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

  customerModal = (visible) => {
    this.setState({ customerModalVisible: visible });
  }
  itemModal = (visible) => {
    this.setState({ itemModalVisible: visible });
  }
  closeModal = (visible) => {
    this.setState({ itemModalVisible: false })
  }
  deleteItem = (id) => {
    this.itemRef
      .doc(id)
      .delete()
      .then(() => {
        this.getPosts();
      })
      .catch((error) => {
        console.log("Error removing document: ", error);
      });
    // Delete from state
  };

  addItem = () => {
    const itemId = uuid()
    const newItem = { itemId: itemId, qty: this.state.qty, description: this.state.description, price: this.state.price, lineTotal: this.state.price * this.state.qty }
    const newItemList = [...this.state.itemList, newItem];
    var invoiceTotal = 0
    if (this.state.qty != '' && this.state.description != '' && this.state.price != '') {
      this.itemRef.add(newItem)

      for (let i = 0; i < newItemList.length; i++) {
        invoiceTotal += newItemList[i].lineTotal

      }
      invoiceTotal = invoiceTotal.toFixed(2)

      this.setState(
        {
          itemList: newItemList,
          itemModalVisible: false,
          qty: "",
          price: "",
          description: "",
          invoiceTotal
        }
      )
    }
    else {
      alert('Please enter valid Info');

    }
  }



  render() {
    const { customerModalVisible, itemModalVisible } = this.state;
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    // const { lineTotal } = this.state.qty * this.state.price

    return (

      <View style={styles.container}>
        <View style={styles.actionView}>
          <Feather name="send" style={styles.actionIcons} />
          <AntDesign name="sharealt" style={styles.actionIcons} />
          <AntDesign name="save" style={styles.actionIcons} size={20} onPress={() => this.createInvoice()}></AntDesign>
        </View>
        <Divider />

        <View style={styles.box1}>
          <View style={styles.customerView}>
            <View style={styles.icons}>
              <AntDesign style={styles.subTitle} name='user' size={30} />
            </View>
            <View>
              <TextInput
                style={styles.subTitle}
                placeholder="Customer Name"
                value={this.state.customerName}
                onChangeText={(val) => this.updateInputVal(val, 'customerName')}
              />
            </View>
          </View>
          <Divider />
          <View style={styles.customerView}>
            <View style={styles.icons}>
              <Fontisto name="email" style={styles.subTitle} size={30} />
            </View>
            <View>
              <TextInput
                style={styles.subTitle}
                placeholder="Email"
                autoCapitalize='none'
                value={this.state.email}
                onChangeText={(val) => this.updateInputVal(val, 'email')}
              />
            </View>
          </View>

        </View>
        <Divider />

        <View style={styles.box2}>
          {/* <View style={styles.descriptionPriceView}>
            <Text>QTY</Text>
            <Text></Text>
            <Text>PRICE</Text>
            <Text></Text>
            <Text>TOTAL</Text>
          </View> */}
          <View>
            {this.state.itemList.map((item) => (
              <View key={item.id}>
                <View style={styles.descriptionView}>
                  <Feather name="shopping-cart" size={24} color='#7E7E7E' style={{ marginRight: 10 }} />
                  <Text style={styles.subTitleItem}>{item.description} </Text>
                </View>
                <View style={styles.descriptionPriceView}>
                  <Text style={styles.priceText}>{item.qty}</Text>
                  <Text style={styles.priceText} >x</Text>
                  <Text style={styles.priceText}>${item.price}</Text>
                  <Text style={styles.priceText}>=</Text>
                  <Text style={styles.priceText}>${item.lineTotal}</Text>
                  <MaterialIcons
                    onPress={() => this.deleteItem(item.uid)} name="delete" size={24} color="black" />
                </View>
                <Divider />
              </View>

            ))}
          </View>
          <View>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => {
                this.itemModal(true);
              }}
            >
              <Text style={styles.openText}>Add Item</Text>
            </TouchableHighlight>
          </View>
          <TouchableWithoutFeedback onPress={() => this.setState({ visible: false })}>
            <Modal

              animationType="slide"
              transparent={true}
              visible={itemModalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              {/* Modal Inside View */}
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TextInput
                    keyboardType='phone-pad'
                    style={styles.description}
                    placeholder="Qty"
                    value={this.state.itemList.qty}
                    onChangeText={(val) => this.updateInputVal(val, 'qty')}
                  />
                  <TextInput
                    style={styles.description}
                    placeholder="Enter item description"
                    value={this.state.itemList.description}
                    onChangeText={(val) => this.updateInputVal(val, 'description')}
                  />
                  <TextInput
                    keyboardType='phone-pad'
                    style={styles.description}
                    placeholder="Price"
                    value={this.state.itemList.price}
                    onChangeText={(val) => this.updateInputVal(val, 'price')}
                  />
                  <View>
                    <TouchableHighlight
                      style={styles.openButton}
                      onPress={() => {
                        this.addItem(!itemModalVisible);
                      }}
                    >
                      <Text style={styles.openText}>Save</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </Modal>
          </TouchableWithoutFeedback>
        </View>

        <Divider />
        <View styles={styles.box3}>
          <View style={styles.total}>
            <Text style={styles.totalTextWord} >Total</Text>
            <Text style={styles.totalText}>${this.state.invoiceTotal}</Text>

          </View>
          <Divider />
          <View style={styles.bottomView} >
            <Octicons name="note" size={30} style={styles.iconsBottom} />
            <Text style={styles.comments}>Notes</Text>

          </View>
          <Divider />
          <View style={styles.bottomView}  >
            <FontAwesome name="photo" size={24} style={styles.iconsBottom} />
            <Text style={styles.comments}>Add Photo</Text>

          </View>
          <Divider />

        </View>


      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textview: {
    marginTop: 35
  },
  inputStyle: {
    width: '50%',
    fontSize: 15,
    marginBottom: 10,
    paddingBottom: 15,
    marginRight: 5,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  description: {
    width: '100%',
    fontSize: 15,
    marginBottom: 10,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  buttonStyle: {
    borderRadius: 45,
    height: 45,
    backgroundColor: '#3740FE',
    width: '90%',
  },
  buttontext: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    marginTop: 7,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 20
  },
  itemcard: {
    flexDirection: 'row',
    alignContent: 'space-around'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    // backgroundColor: 'rgba(0,0,0,0.7)'
  },
  modalView: {
    width: '100%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    height: 50,
    width: '50%'
  },
  openText: {
    color: '#7E7E7E',
    fontSize: 20

  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  customerSaveButton: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 18
  },
  box1: {
    flex: .20,

  },
  box2: {
    flex: 0.7,


  },
  box3: {
    flex: .9,
    marginBottom: 20,
    marginTop: 50,
    height: 40
  },
  customerView: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'flex-start'

  },
  subTitle: {
    fontSize: 20,
    color: '#7E7E7E',
    marginTop: 20
  },
  subTitleItem: {
    fontSize: 20,
    color: '#7E7E7E',

    marginLeft: 10
  },
  icons: {
    marginRight: 10
  },
  descriptionPriceView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 10
  },
  descriptionView: {
    marginTop: 10,
    flexDirection: 'row',

  },
  priceText: {
    color: '#7E7E7E',
    fontSize: 15
  },
  actionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 5,
    marginRight: 5,

  },
  actionIcons: {
    color: '#5D5AAA',
    alignContent: 'center',
    fontSize: 30

  },
  divider: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  totalText: {
    fontSize: 30,
    color: '#7E7E7E',
    textAlign: 'right',
  },
  totalTextWord: {
    fontSize: 25,
    color: 'black',
    textAlign: 'right',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#DCDCDC',
  },
  comments: {
    fontSize: 20,
    color: '#7E7E7E',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10
  },
  iconsBottom: {
    marginTop: 15,
    marginBottom: 15,
    color: '#7E7E7E',
  },
  bottomView: {
    flexDirection: 'row'
  }
})
