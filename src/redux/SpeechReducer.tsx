const initialState:any = {
    speechData:[]
}

const SpeechReducer = (state=initialState,action:any)=>{

    const {type,payload} = action
    console.log("=======>type,payload",payload)
    switch (type){
        case "AddData" :
            const updatedList = [...state.speechData,payload.speech]
            return {
                ...state,
                speechData:updatedList
            };
        default :
        return state
    }

}

export default SpeechReducer