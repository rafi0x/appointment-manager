import {Request, Response, NextFunction} from 'express';
import User, {UserInterface} from '../Schemas/User.schema'
import bcrypt from "bcrypt";
import {Payload, generateJWT, verifyJWT} from '../utilities'

export const authUser = async (req: Request, res:Response) => {
    const {username, password} = req.body;
    try {
        if(username && password){
            const userData: UserInterface = await User.findOne({ username });
            if (userData) {
                // @ts-ignore
                const matchPass = await bcrypt.compare(password, userData.password);
                if(matchPass) {
                    const jwtPayload: Payload = {
                        name: userData.username,
                        isAdmin: true,
                        expiresIn: Date.now() * 120, //expire in 1h
                    }
                    const jwtToken = generateJWT(jwtPayload);
                    if(jwtToken) return res.json({token: jwtToken});
                    else return res.status(500).json({serverErr: 'server error'});
                } else {
                    return res.status(400).json({clientErr: 'invalid username or password'})
                }
            } else {
                return res.status(400).json({clientErr: 'invalid username or password'})
            }
        } else {
            return res.status(400).json({clientErr: 'invalid username or password'});
        }
    } catch (err) {
        console.log('authUser: ',err)
    }
}

export const verifyToken = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const token = req.header('token')
        console.log(token)
        if(token) {
            const decoded:any = verifyJWT(token)
            if(decoded){
                if(decoded.expiresIn < Date.now()) {
                    console.log(decoded.expiresIn < Date.now())
                    return res.status(403).json({clientErr: 'Invalid token or expired, Login again'})
                } else {
                    next();
                }
            } else {
                return res.status(402).json({clientErr: 'Invalid token or expired, Login again'})
            }
        } else {
            return res.status(401).json({clientErr: 'Invalid token or expired, Login again'})
        }
    } catch (err) {
        console.log(err)
        throw new Error('ServerError')
    }
}