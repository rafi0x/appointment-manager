import {Request, Response, NextFunction} from 'express';
import User, {UserInterface} from '../Schemas/User.schema'
import bcrypt from "bcrypt";
import {Payload, generateJWT, verifyJWT} from '../utilities'

export const authUser = async (req: Request, res:Response) => {
    const {username, password} = req.body;
    if(username && password){
        const userData: UserInterface = await User.findOne({ username });
        if (userData) {
            // @ts-ignore
            const matchPass = await bcrypt.compare(password, userData.password);
            if(matchPass) {
                const jwtPayload: Payload = {
                    name: userData.username,
                    isAdmin: true,
                    expiresIn: Math.floor(Date.now() / 1000) + (60 * 60), //expire in 1h
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
}

export const verifyToken = async (req:Request, res:Response, next: NextFunction) => {
    const token = req.header('token')
    if(token) {
        const succ = verifyJWT(token);
        console.log(succ)
    }

    res.send('ok')
}