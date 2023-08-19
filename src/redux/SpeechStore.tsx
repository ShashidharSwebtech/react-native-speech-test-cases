import { createStore } from "redux";
import SpeechReducer from "./SpeechReducer";

const store = createStore(SpeechReducer)

export default store