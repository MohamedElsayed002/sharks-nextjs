
declare type LoginSuccessful = {
    access_token: string
    onboardingCompleted: boolean
}

declare type LoginError = {
    message: string;
    error: string;
    statusCode: number
}

declare type LoginResponse = LoginSuccessful | LoginError;