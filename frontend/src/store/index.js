import {createStore,compose,applyMiddleware} from "redux";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import storageSession from 'redux-persist/lib/storage/session'
import {rootReducer} from "./reducer";
import thunk from 'redux-thunk'
const storageConfig = {
        key: 'root', // 必须有的
        storage:storageSession, // 缓存机制
        blacklist: ["loading"] // reducer 里不持久化的数据,除此外均为持久化数据
    }
const myPersistReducer = persistReducer(storageConfig, rootReducer)
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
)
const store = createStore(myPersistReducer,
    enhancer)

export const persistor = persistStore(store);
export default store;