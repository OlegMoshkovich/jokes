import React, {Component} from 'react';
import {Text,TouchableOpacity, Image, Dimensions} from 'react-native'
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;



class BottomIcon extends Component{

constructor(props){
  super(props);
  this.state = {
    switch: true,
  };


}

onPress = () => {

  this.setState({
    switch: !this.state.switch
  })
}
render(){

  console.log('card is being rendered');
  return(
    <TouchableOpacity
           onPress={this.onPress}>

         <Image
          style={styles.iconStyle}
          source={ this.state.switch === true ?
                       require('../assets/images/smile.png') :
                       require('../assets/images/heart.png')}
        />
       />


    </TouchableOpacity>
  )}
}
const styles = {
  iconStyle: {

    width: 30,
    height:30  }
};

export default BottomIcon;
