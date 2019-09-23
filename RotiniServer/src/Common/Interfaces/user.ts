export interface IUser {
    username: string;
    passwordHash: string;
    deviceIds: [string];
    userId: string;
}