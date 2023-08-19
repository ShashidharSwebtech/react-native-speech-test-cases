export const addSpeechRecord = (speech:any)=>{
    //shashidhar
    console.log("reducer",speech)
    return{
        type:"AddData",
        payload:{
            speech:speech
        }
    }
}
