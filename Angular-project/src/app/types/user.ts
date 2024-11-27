export interface User {
    books: string[];
    _id: string;
    email: string;
    password: string;
}

export interface UserForAuth {
    id: string;
    email: string;
    password: string;
    repass: string,
    accessToken?: string;
}