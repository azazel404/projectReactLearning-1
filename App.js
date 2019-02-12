import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Ball from "./src/component/Animations/Ball";
import Deck from "./src//component/Animations/Deck";
import { Card, Button } from "react-native-elements";

const DATA = [
  { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];

export default class App extends React.Component {

  MapingRederFromDeck = (items) => {
    return(
      <Card
        key={items.id}
        title={items.text}
        image={{ uri: items.uri }}
      >
        <Text style={{ marginBottom: 10 }}>
          I can customize the Card futher
        </Text>
        <Button
          icon={{ name: 'code' }}
          backgroundColor="#03A9F4"
          title="view now"
        />
      </Card>
    )
  }
  renderNoMoreCards = () => {
    return (
      <Card title="All done !">
        <Text style={{ marginBottom: 10 }}>
          I can Customize the card Future
                </Text>
        <Button
          icon={{ name: 'code' }}
          backgroundColor="#03A9F4"
          title="Get More"
        />
      </Card>
    )
  }


  render() {
    return (
      <View style={styles.container}>
        <Deck 
        data={DATA} 
        renderMappingData={this.MapingRederFromDeck}
        renderNoMoreCards={this.renderNoMoreCards}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  }
})
