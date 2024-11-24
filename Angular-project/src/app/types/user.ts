export interface User {
    books: string[];
    _id: string;
    email: string;
    password: string;
}

export interface UserForAuth {
    email: string;
    password: string;
    id: string;
}