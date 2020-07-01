import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { Task } from 'redux-saga';

import reducer, { RootState } from '../reducers';
import rootSaga from '../sagas';

export interface IStore extends Store {
    sagaTask?: Task
}

const makeStore: MakeStore<RootState> = (context: Context) => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];

    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : composeWithDevTools(applyMiddleware(...middlewares));

    const store = createStore(reducer, enhancer);

    (store as IStore).sagaTask = sagaMiddleware.run(rootSaga);

    return store;
};

const wrapper = createWrapper<RootState>(makeStore, { debug: true });

export default wrapper;