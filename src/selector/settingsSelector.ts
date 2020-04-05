import {ReduxState} from '../reducer';
import {createSelector} from 'reselect';

const stateKey = 'settings';

export const schemaUrlSelector = (state: ReduxState) => state[stateKey].schemaUrl;
export const messageBoxUrlSelector = (state: ReduxState) => state[stateKey].messageBoxUrl;

export const makeSchemaUrlSelector = () => {
    return createSelector([schemaUrlSelector], schemaUrl => {
        return schemaUrl;
    });
};

export const makeMessageBoxUrlSelector = () => {
    return createSelector([messageBoxUrlSelector], messageBoxUrl => {
        return messageBoxUrl;
    });
};
