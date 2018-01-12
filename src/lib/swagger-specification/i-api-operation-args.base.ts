export interface IApiOperationArgsBaseParameter {
    description?: string;
    type: string;
    required?: boolean;
    format?: string;
    deprecated?: boolean;
    allowEmptyValue?: boolean;
}

export interface IApiOperationArgsBase {
    description: string;
    summary: string;
    produces?: string[];
    consumes?: string[];
    path?: string;
    parameters?: {
        path?: {[key: string]: IApiOperationArgsBaseParameter},
        query?: {[key: string]: IApiOperationArgsBaseParameter}
    }
}