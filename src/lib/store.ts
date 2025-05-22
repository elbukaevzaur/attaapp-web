import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import {authSaga} from './saga'
import { all } from 'redux-saga/effects';
import {
    authReducer
} from './reducers';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
    yield all([
        authSaga(),
    ])
}

export const store = () => {
    const store = configureStore({
        reducer: {
            auth: authReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat([sagaMiddleware]),
    });

    sagaMiddleware.run(rootSaga);

    return store;
};

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']