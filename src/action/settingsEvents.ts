import {createAction} from 'redux-actions';

export interface SchemaUrlUpdatedPayload {
    url: string;
}

export interface MessageBoxUrlUpdatedPayload {
    url: string;
}

export interface ContextUpdatedPayload {
    context: Record<string, string>;
}

export const schemaUrlUpdated = createAction<SchemaUrlUpdatedPayload>('SCHEMA_URL_UPDATED');
export const messageBoxUrlUpdated = createAction<MessageBoxUrlUpdatedPayload>('MESSAGE_BOX_URL_UPDATED');
export const contextUpdated = createAction<ContextUpdatedPayload>('CONTEXT_UPDATED');
