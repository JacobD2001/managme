export interface User{
    Id? : string;
    name? : string;
    surname? : string;
    role? : 'admin' | 'devops' | 'developer';
}