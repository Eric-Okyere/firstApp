import { applyMiddleware, legacy_createStore as createStore} from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";

let store = createStore(reducers, applyMiddleware(thunk))

export default store