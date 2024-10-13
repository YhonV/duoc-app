export interface User {
    uid: string;
    email: string;
    password?: string;
    name: string;
    rut: string;
    role?: boolean;
    phone: string;
}