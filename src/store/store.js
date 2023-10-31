import { combineReducers, configureStore } from "@reduxjs/toolkit";
import certificateReducer from "./reducers/certificateReducer";
import { createLogger } from 'redux-logger';
import userDetaillReducer from "./reducers/userDetaillReducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const logger = createLogger({
  });

  const rootReducer = combineReducers({
certificates : certificateReducer,
userDetails : userDetaillReducer
})
  export const setupStore = () => {
    const store = configureStore({
      devTools: true,
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    });

    return { store};
}