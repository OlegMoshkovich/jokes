import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    joke: 'hahaha'
  };
 this.getData= this.getData.bind(this);}

  getData(){
    fetch("https://webknox-jokes.p.mashape.com/jokes/random?maxLength=100", {
      method: 'GET',
      headers: {
        "X-Mashape-Key": "89Z6T60dFsmshwQma1oUPieIEjZvp1AEp2rjsnkyRdhG1PNF0C",
        "Accept": "application/json",
      },
    })
    .then((response) => response.json())
   .then((responseJson) => {
     this.setState({joke:responseJson.joke})
    // console.log(responseJson.joke);
   })
   .catch((error) => {
     console.error(error);
   });
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.joke}>{this.state.joke}</Text>
        <TouchableOpacity style={styles.iconContainer} onPress={this.getData}>
          <Image  style={styles.icon} source={require('./assets/images/smile.png')} />
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft:40,
    paddingRight:40,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  joke:{
    // top:-80,
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20

  },
  iconContainer:{
    // position:'absolute',
    // bottom:300
  },
  icon:{
    height: 100,
    width: 100,
  }
});

export default App
