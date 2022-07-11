import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from './HomeScreen';
import DisplayScreen from './DisplayScreen';

const Stack = createStackNavigator();

const HomeStack = ({navigation, props}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'WOOKIE MOVIES',
          headerTitleStyle: {
            fontFamily: 'Montserrat-SemiBold',
            color: 'white',
            fontSize: 30,
          },
          headerStyle: {
            backgroundColor: '#202945',
          },
        }}
        initialParams={props}
      />
      <Stack.Screen
        name="Display"
        component={DisplayScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
