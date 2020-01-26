export interface Action<T = any> {
    // = means default argument (you can pass a different argument type)
    type: T;
}

export interface ActionWithPayload<T, P> extends Action<T> {
    payload: P;
}

export interface ActionCreatorsMapObject<A = any> {
    [key: string]: ActionCreator<A>;
}

export interface ActionCreator<A> {
    (...args: any[]): A; // Function with infinity arguments and return generic type
}

// np: type T0 = ReturnType<() => string>;  // string
export type ActionUnion<T extends ActionCreatorsMapObject> = ReturnType<T[keyof T]>;
// keyof = Object.keys()

// extends means that you have to pass an argument with a string type
export function makeAction<T extends string>(actionType: T): Action<T>;
export function makeAction<T extends string, P>(actionType: T, actionPayload: P): ActionWithPayload<T, P>;
export function makeAction<T extends string, P>(actionType: T, actionPayload?: P) {
    return actionPayload ? { type: actionType, payload: actionPayload } : { type: actionType };
}

// type when we want to add a new type to our project ?
// interface when type is not enough ?
