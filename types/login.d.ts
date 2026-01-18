
declare type LoginSuccessful = {
    access_token: string
}

declare type LoginError = {
    message: string;
    error: string;
    statusCode: number
}

declare type LoginResponse = LoginSuccessful | LoginError;