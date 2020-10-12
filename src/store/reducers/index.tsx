import { gitHubReducer } from '@/store/reducers/githubReducer'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { bookmarksReducer } from './bookmarksReducer'

export const rootReducer = combineReducers({
    github: gitHubReducer,
    bookmarks: bookmarksReducer,
})

export const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['github'],
}

export const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

let persistor = persistStore(store)

export { store, persistor }
