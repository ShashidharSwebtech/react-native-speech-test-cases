/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react-native';
import { Platform } from 'react-native';

jest.mock("@react-navigation/stack", () => ({
  createStackNavigator: jest.fn(() => ({
    Navigator: ({ children }: { children: React.ReactElement }) => <>{children}</>,
    Screen: ({ children }: { children: React.ReactElement }) => <>{children}</>
  }))
}))

jest.mock('react-native-vector-icons/AntDesign', () => () => <></>)
jest.mock('react-native-vector-icons/FontAwesome6', () => () => <></>)
jest.mock('react-native-vector-icons/FontAwesome', () => () => <></>)
jest.mock('react-native-vector-icons/Ionicons', () => () => <></>)
jest.mock('react-native-vector-icons/EvilIcons', () => () => <></>)
// jest.mock('react-native-vector-icons/Feather', () => () => <></>)


jest.mock("react-native-responsive-screen-font", () => ({
  widthPercentageToDP: jest.fn(),
  heightPercentageToDP: jest.fn(),
  heightPercentageToFonts: jest.fn()
}));

jest.mock('@react-native-voice/voice',()=>({
    default:{
      onSpeechStart:jest.fn(),
      onSpeechEnd:jest.fn(),
      onSpeechResults:jest.fn(),
      start:jest.fn().mockImplementation((...args)=>Promise.resolve("en-US")),
      stop:jest.fn()
    }
}))

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: () => null
}));
it('renders correctly', () => {
  render(<App />);

});
it('renders correctly', () => {
  Platform.OS="android"
  render(<App />);
})

it('renders correctly', () => {
  renderer.create(<App />);
});
