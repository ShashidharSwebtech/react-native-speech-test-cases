export const addSpeechRecord = (speech:any)=>{
    console.log("reducer",speech)
    return{
        type:"AddData",
        payload:{
            speech:speech
        }
    }
}