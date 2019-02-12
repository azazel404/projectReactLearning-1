import React from "react";
import {View,Animated} from "react-native";


class Ball extends React.Component{
    state = {
        x : 0,
        y : 0
    }
    componentWillMount() {
        this.position = new Animated.ValueXY(this.state.x, this.state.y);
        Animated.spring(this.position, {
            toValue: { x: 200, y: 500 }
        }).start();
    }
    render(){
        return(
           <Animated.View style={this.position.getLayout()}>
                <View style={styles.ball} />
           </Animated.View>
        )
    }
}

const styles = {
   ball : {
       height : 60,
       width : 60,
       borderRadius: 30,
       borderWidth: 30,
       borderColor : 'black'
   }
};
export default Ball;