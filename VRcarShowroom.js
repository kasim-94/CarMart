// VRCarShowroom/index.js
import React from 'react';
import {
  AppRegistry,
  View,
  asset,
  VrButton,
  Environment,
  NativeModules,
} from 'react-360';

class VRCarShowroom extends React.Component {
  state = {
    cars: [
      { id: 1, name: 'Car 1', model: 'car1.obj' },
      { id: 2, name: 'Car 2', model: 'car2.obj' },
      // Add more cars
    ],
    currentCarIndex: 0,
  };

  componentDidMount() {
    Environment.setBackgroundImage(asset('showroom.jpg'));
  }

  switchCar = (direction) => {
    const { cars, currentCarIndex } = this.state;
    let newIndex = currentCarIndex + direction;
    if (newIndex < 0) newIndex = cars.length - 1;
    if (newIndex >= cars.length) newIndex = 0;
    this.setState({ currentCarIndex: newIndex });
    NativeModules.ModelLoader.loadModel(asset(cars[newIndex].model));
  };

  render() {
    const { cars, currentCarIndex } = this.state;
    return (
      <View>
        <VrButton
          style={{
            backgroundColor: 'blue',
            padding: 0.05,
            position: 'absolute',
            left: -0.3,
          }}
          onClick={() => this.switchCar(-1)}
        >
          Previous
        </VrButton>
        <VrButton
          style={{
            backgroundColor: 'blue',
            padding: 0.05,
            position: 'absolute',
            right: -0.3,
          }}
          onClick={() => this.switchCar(1)}
        >
          Next
        </VrButton>
      </View>
    );
  }
}

AppRegistry.registerComponent('VRCarShowroom', () => VRCarShowroom);