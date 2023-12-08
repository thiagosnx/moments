export interface Response<T>{ //recebe a resposta do back
    message?:string;
    data:T;
}