import React, { Component } from 'react'
import {
    View,
    Animated,
    Text,
    PanResponder,
    Dimensions,
    LayoutAnimation,
    UIManager
} from "react-native";


//screen dimension layar hp  dan pembuatan duraction swipe image
const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {
    //pembuatan static default props
    static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft : () => {}
    }



    constructor(props) {
        super(props);

        //pembuatan animasi vectors
        const position = new Animated.ValueXY();
        //membuat animasi gesture ke kanan
        const panResponder = PanResponder.create({
            //ask to be responder
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                //dx akumulasi gesture gambar jika di sentuh , dy juga sama
                position.setValue({ x: gesture.dx, y: gesture.dy })
            },
            onPanResponderRelease: (event,gesture) => { 
                if (gesture.dx > SWIPE_THRESHOLD){
                    this.ForSwipe('right');
                    console.log('right')
                }
                else if (gesture.dx < -SWIPE_THRESHOLD){
                    this.ForSwipe('left');
                    console.log('left')
                }
                else{
                    this.resetPosition();
                }
            }
        });
        this.state = {
            panResponder,
            position,
            index: 0
        }
    }

    // componentWillReceiveProps(nexProps){
    //     if(nexProps.data !== this.props.data){
    //         this.setState({index: 0});
    //     }
    // }
    componentWillUpdate = () => {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }
    ForSwipe = (direction) => {
    //animasi untuk geser kekanan secara paksa dan menghilangkannya
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(this.state.position,{
            toValue : {x: x, y:0},
            duration : SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction));
        //this.prepNextCard();
    }

    onSwipeComplete = (direction) => {
        const  {onSwipeLeft , onSwipeRight,data} = this.props;
        console.log(data[this.state.index]);
        const item = data[this.state.index]; //create data spesifik tag ID number
        this.state.position.setValue({x:0,y:0})
        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
        this.setState({index : this.state.index + 1})
    }



    //reset animasi ketiga tidak menjadi geser data nya
    resetPosition = () => {
        Animated.spring(this.state.position,{
            toValue: {x:0,y:0}
        }).start();
    }


    //MAKE POSITION ANIMATE ROTATION
    getCardStyle = () => {
        const { position} = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0,SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg','0deg','120deg']
        });

        return {
            ///get layout for convert x and y to left and top
            ...this.state.position.getLayout(),
            transform: [{ rotate}]
        }
    }


    //function fetch data
    renderCards = () => {

        if(this.state.index >= this.props.data.length){
            return this.props.renderNoMoreCards();
        }

        const {data} = this.props;
        return data.map((item,i) => {
            if(i < this.state.index){
                return null
            }
            if (i === this.state.index) {
                return (
                    <Animated.View
                        key={item.id}
                        style={[this.getCardStyle(),styles.cardStyles]}
                        {...this.state.panResponder.panHandlers}
                    >
                        {this.props.renderMappingData(item)}
                    </Animated.View>
                )
            }
            return(
                <Animated.View key={item.id} style={[styles.cardStyles,{top: 10*(i -this.state.index)}]}>
                    {this.props.renderMappingData(item)}
                </Animated.View>
            )
        }).reverse();
    }

  

  render() {
    return (
        <View>
            {this.renderCards()}
        </View>
    )
  }
}

const styles = {
    cardStyles : {
        position: "absolute",
        width : SCREEN_WIDTH
        
    }
}
export default Deck;