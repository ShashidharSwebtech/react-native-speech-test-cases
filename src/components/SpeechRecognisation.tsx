import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native'
import React, { Component } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
    heightPercentageToFonts as hf,
    widthPercentageToFonts as wf
} from 'react-native-responsive-screen-font'
import Voice from '@react-native-voice/voice';
import { addSpeechRecord } from '../redux/SpecchAction'
import { connect } from 'react-redux'

// class VoiceTest extends Component {
 
//   onStartButtonPress(e){
//     Voice.start('en-US');
//   }
//   ...
// }

interface IProps{
    navigation:{
        navigate:(arg:string)=>void
    }
    addSpeechRecord:(speech:any)=>void,
    speechData:any,
}

interface IState{
    Speechvalue:any,
    isListening:boolean
    text:any
}
export class SpeechRecognisation extends Component<IProps,IState> {
    constructor(props:IProps) {
      super(props)
    
      this.state = { 
        Speechvalue:[], 
        isListening:false,
        text:[]
      }
        Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
        Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
        Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
    }

    onSpeechStartHandler=({...props})=>{
        // console.log("==========>1",props)
    }
    onSpeechEndHandler=({...props})=>{
        // console.log("==========>2",props)
    }
    onSpeechResultsHandler= async (value:any)=>{
         this.setState(() => ({Speechvalue:value.value[0]}))
        console.log("==========>3",this.state.Speechvalue)
        console.log(',.,.,.,.,.,.,.,.',value.value)
        this.setState(() => ({text:value.value}))
    }

    clickToStartRecord=()=>{
        console.log("==========>start")
        Voice.start('en-US')
        this.setState({isListening:true})
    }

    save = () => {
        console.log('func---',this.state.text)
        this.props.addSpeechRecord(this.state.text)

    }

    clickToStopRecord=()=>{
        console.log("==========>stop")
        Voice.stop()
        this.setState({isListening:false})

    }

    render() {
        const {isListening,Speechvalue} = this.state
        // console.log(Speechvalue,this.props.speechData)
        return (
            <SafeAreaView style={{backgroundColor:'#000',flex:1}}>
                <StatusBar barStyle={'light-content'}/>
                <View style={styles.speechCont}>
                    <TouchableOpacity style={styles.closeButton} onPress={()=>this.props.navigation.navigate("SpeechData")}>
                        <AntDesign name="close" color="#fff" size={20} />
                    </TouchableOpacity>
                    <View style={styles.imageCont}>
                        <Image style={styles.imageStyles} source={require('../assets/download.webp')}/>
                    </View>
                    <View style={styles.effectsandsound}>
                        <View style={styles.eachButton}>
                            <TouchableOpacity style={styles.auditionButton}>
                                <FontAwesome6 style={{ alignSelf: 'center'}} name="ear-listen" color={"#fff"} size={20} />
                            </TouchableOpacity>
                            <Text style={styles.auditionText}>Audition</Text>
                        </View>
                        <View style={styles.eachButton}>
                            <TouchableOpacity style={styles.buttonsContainer}>
                                <FontAwesome style={{ alignSelf: 'center' }} name="magic" color={"#fff"} size={30} />
                            </TouchableOpacity>
                            <Text style={styles.auditionText}>Effects</Text>
                        </View>
                    </View>
                    <View style={styles.effectsandsound}>
                        <View style={styles.eachButton}>
                            <TouchableOpacity style={styles.buttonsContainer}>
                                <Ionicons style={{ alignSelf: 'center' }} name="trash-outline" color={"#fff"} size={30} />
                            </TouchableOpacity>
                            <Text style={styles.auditionText}>Delete</Text>
                        </View>
                        {isListening ? (
                            <View style={styles.eachButton}>
                            <TouchableOpacity style={styles.playButton} onPress={this.clickToStopRecord}>
                                <FontAwesome6 style={{alignSelf:'center'}} name="pause" color={"#fff"} size={30} />
                            </TouchableOpacity>
                            <Text style={styles.auditionText}>pause</Text>
                        </View>
                        ) : (
                            <View style={styles.eachButton}>
                            <TouchableOpacity style={styles.playButton} onPress={this.clickToStartRecord}>
                                <FontAwesome6 style={{alignSelf:'center'}} name="play" color={"#fff"} size={30} />
                            </TouchableOpacity>
                            <Text style={styles.auditionText}>play</Text>
                        </View>
                        )}
                        
                        <View style={styles.eachButton}>
                            <TouchableOpacity style={styles.buttonsContainer} onPress={this.save}>
                                <EvilIcons style={{alignSelf:'center'}} name="check" color={"#fff"} size={40} />
                            </TouchableOpacity>
                            <Text style={styles.auditionText}>Save</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps=(state:any)=>{
    return{
        speechData : state.speechData
    }
}

const mapStateToDispatch=(dispatch:any)=>{
    return{
        addSpeechRecord:(speech:any)=>dispatch(addSpeechRecord(speech))    
    }
}

export default connect(mapStateToProps,mapStateToDispatch)(SpeechRecognisation)

const styles = StyleSheet.create({

    auditionButton:{
        width: wp(15),
        height: hp('8'),
        justifyContent: 'center',
        alignitems: 'center',
        backgroundColor:"#59555fff",
        borderRadius: 100,
    },

    imageStyles:{
        borderRadius:100
    },

    imageCont:{
        justifyContent:'center',
        alignItems:'center',
    },

    playButton:{
        width: wp(20),
        height: hp(10),
        justifyContent: 'center',
        alignitems: 'center',
        backgroundColor: '#4e32a8',
        borderRadius: 50,
    },

    eachButton: {
        alignItems: 'center',
        margin:hp(2.5)
    },

    auditionText: {
        fontSize: hp(2.5),
        color: '#fff',
    },

    effectsandsound: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
    },

    buttonsContainer: {
        width: wp(15),
        height: hp('8'),
        justifyContent: 'center',
        alignitems: 'center',
        backgroundColor: '',
        borderRadius: 100,

    },

    closeButton: {
        alignItems: 'flex-end',
    },

    speechCont: {
        // flex:1,
        gap:hp(2),
        padding: hp(2),
        backgroundColor: '#000'
    },
})