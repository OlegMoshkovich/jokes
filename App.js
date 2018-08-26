console.disableYellowBox = true;

import Expo from 'expo';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Picker
} from 'react-native';
import { Card, Button } from 'react-native-elements';
import Deck from './src/Deck';
import BottomIcon from './src/BottomIcon';

const DATA = [];
const filteredData = [];

export default class App extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
      data: DATA,
      isLoading: true,
      type: 'long'
    };
    this.filtered;

  }

  componentDidMount(){
    fetch("https://sheetsu.com/apis/v1.0su/d0919c29956f", {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
     responseJson.map(item => DATA.push(item));
     this.setState({isLoading: false});
   })
   .catch((error) => {
     console.error(error);
   });
  }


  renderCard(item) {
      return (
        <Card
          key={item.id}
          containerStyle ={{
            width:300,
            height:450,
            borderRadius:10,
            flex:1,
            justifyContent:'center',
            alignItems: 'center',
          }}
        >
          <Text style={[{flex:8},styles.jokeStyle]}>
            {item.text}
          </Text>
          <View style = {{flex:1, top:0,alignSelf: 'center'}}>
          <BottomIcon/>
          </View>
        </Card>
      );
    }


    render() {

      filteredData = [];

      const filter =  DATA.map((item) => {
           if(item.filter === this.state.type){
             return filteredData.push(item)
           }
        })


      const { isLoading } = this.state;
         if (isLoading) {
           return (
             <View style ={styles.container}>
               <TouchableOpacity style = {{top :100}} >
                 <Image  style={styles.loadingIcon} source={require('./assets/images/smile.png')} />
               </TouchableOpacity>
             </View>
           );
         }


      return (
        <View style={styles.container}>
        <Picker
          selectedValue={this.state.type}
      
          style={{ height: 50, width: 100,alignSelf:'center', top:-120,right:20}}
          onValueChange={itemValue => {
            this.setState({type: itemValue});
            return
           }
         }
          >
          <Picker.Item label="Short" value="short" />
          <Picker.Item label="Long" value="long" />
          <Picker.Item label="Dark" value="dark" />
          <Picker.Item label="Movie" value="movie" />

        </Picker>
        <View style = {styles.deckContainer}>
        <Deck
        data = {filteredData}
        renderCard ={this.renderCard}
        />
        </View>
        </View>
      );
    }
}


  const styles = StyleSheet.create({
    container: {
      left:20,
      top:120,
      marginTop: 20,
      flex: 1,
      backgroundColor: '#fff'
    },
    deckContainer:{
      top:50
    },
    loadingIcon:{
      width:30,
      height:30,
      alignSelf:'center',
      shadowColor: '#000',
      shadowOffset: { width: 3, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    icon:{
      width:20,
      height:20,
      alignSelf:'center',
      position:'absolute',


    },
    jokeStyle:{
      margin:10,
      top:10,
      fontSize:15,
      fontFamily:'Verdana',

      textAlign:'auto'
    }
  });
