import { FlatList, SafeAreaView, Text, View ,StyleSheet, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import { addSpeechRecord } from '../redux/SpecchAction'
import { connect } from 'react-redux'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
    heightPercentageToFonts as hf,
    widthPercentageToFonts as wf
} from 'react-native-responsive-screen-font'


interface IProps{
    navigation:{
        navigate:(arg:string)=>void
    }
    addSpeechRecord:(speech:any)=>void,
    speechData:any,
}

interface IState{

}

export class SpeechData extends Component<IProps,IState> {
    render() {
      console.log(this.props.speechData)
    return (
      <SafeAreaView style={{backgroundColor:'#000',flex:1}}>
        <Text style={styles.recordingText}>Your Recordings</Text>
        {this.props.speechData.length === 0 ? (
            <View style={styles.noDataFoundCont}>
                <Text testID='noData' style={styles.nodatafondtext}>No Data Found</Text>
            </View>
        ) : (
            <View testID='flatlist'>
                <FlatList
                data={this.props.speechData}
                renderItem={({item})=>(
                    <View style={styles.eachContainer}>
                        <Text style={styles.eachItemText}>{item.toString()}</Text>
                    </View>
                )}
                />
            </View>
        )}
        <TouchableOpacity testID="addRecording" style={styles.recordingBtn} onPress={()=>this.props.navigation.navigate("SpeechRecognisation")}>
            <Text style={styles.eachItemText}>Add Recording</Text>
        </TouchableOpacity>
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

export default connect(mapStateToProps,mapStateToDispatch)(SpeechData)

const styles = StyleSheet.create({

    eachContainer:{
        borderWidth:hp(0.1),
        borderColor:'#fff',
        margin:hp(1),
        padding:hp(1),
    },

    recordingText:{
        padding:hp(2),
        backgroundColor:'#4e32a8',
        alignItems:'center',
        color:'#fff'
    },

    recordingBtn:{
        padding:hp(2),
        backgroundColor:'#4e32a8',
        alignItems:'center',
        // alignSelf:'flex-end',
    },

    eachItemText:{
        color:'#fff',
        fontSize:hp(2)
    },

    nodatafondtext:{
        color:'#fff',
        fontSize:hp(2)
    },

    noDataFoundCont:{
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },
})