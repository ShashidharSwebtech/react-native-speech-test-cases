import {fireEvent, render,screen} from '@testing-library/react-native'
import SpeechData from '../src/components/SpeechData'
import { Provider } from 'react-redux'
import { createStore } from 'redux';

const store = createStore(()=>{
    const initialState = {
        speechData : true
    };
    return{
        ...initialState
    }
})

const store2 = createStore(()=>{
    const initialState = {
        speechData : false
    };
    return{
        ...initialState
    }
})

const screenProps = {
  navigation: {
    navigate: jest.fn(),
  },
};

test('Testing for nodata',()=>{
    render(<Provider store={store}>
        <SpeechData {...screenProps}/>
    </Provider>)
    const noDataEle = screen.getByTestId('noData')
    expect(noDataEle).toBeTruthy()
})

test('Testing for nodata',()=>{
    render(<Provider store={store2}>
        <SpeechData {...screenProps}/>
    </Provider>)
    const flatlistEle = screen.getByTestId('flatlist')
    expect(flatlistEle).toBeTruthy()
})

test('Testing for navigation toBe RecordingScreen',async ()=>{
    render(<Provider store={store2}>
        <SpeechData {...screenProps}/>
    </Provider>)
    const addRecordingBtn = screen.getByTestId('addRecording')
    await fireEvent.press(addRecordingBtn)
    expect(screenProps.navigation.navigate).toBeCalledWith("SpeechRecognisation")
})