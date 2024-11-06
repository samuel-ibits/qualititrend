export type SignInRequest = {
    email: string;
    password: string;
};

export type SignInResponse = any;    

export type InitiateResetPasswordRequest = {
    email: string;
};

export type InitiateResetPasswordResponse = {
    message: string;
    status: string;
};

export type CompleteResetPasswordRequest = {
    email: string;
    token: string;
    password: string;
};

export type CompleteResetPasswordResponse = {
    message: string;
    status: string;
};
