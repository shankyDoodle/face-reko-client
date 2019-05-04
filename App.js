import React from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';

import styles from './src/styles/styles' ;

import TrainMeView from './src/components/train';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      screenName: "homepage",
    };

  }

  handleHomePageButtonClicked(sScreenName){
    this.setState({
      screenName:sScreenName
    })
  }

  getHomeScreenView() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Face Recognition</Text>
        <View style={styles.buttonWrapper}>
          <TouchableHighlight style={styles.resetButton} onPress={this.handleHomePageButtonClicked.bind(this, "trainme")}>
            <Text style={styles.resetText}>Train Me</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableHighlight style={styles.resetButton} onPress={this.handleHomePageButtonClicked.bind(this, "recognize")}>
            <Text style={styles.resetText}>Recognize</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  render() {
    let oScreenToShow = null;
    switch (this.state.screenName) {
      case "trainme":
        oScreenToShow = <TrainMeView/>;
        break;
      case "recognize":
        oScreenToShow = null;
        break;
      default:
        oScreenToShow = this.getHomeScreenView();
    }

    return oScreenToShow;
  }

}

