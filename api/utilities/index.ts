import bcrypt from 'bcrypt';
import fs from 'fs';
import jwt from 'jsonwebtoken'
import path from 'path'

const privateKEY = fs.readFileSync(`${path.resolve(__dirname, '../../credentials')}/private.key`, 'utf8')
const publicKEY = fs.readFileSync(`${path.resolve(__dirname, '../../credentials')}/public.key`, 'utf8')

export interface Payload {
    name: String;
    isAdmin: boolean;
    expiresIn: number;
}

export const generateJWT = (payload: Payload) => {
    return jwt.sign(payload, privateKEY, { algorithm: 'RS256'})
}

export const verifyJWT = (payload: string) => {
    return jwt.verify(payload, publicKEY)
}

export const hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

export function randomNumGen(length: number): string {
    if (length) {
        let output = "";
        for (let i = 1; i <= length; i += 1) {
            output += Math.floor(Math.random() * length);
        }
        return output;
    }
    return '';
}