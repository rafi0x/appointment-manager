import {Request, Response} from 'express';
import {validationResult} from 'express-validator'
import Appointment, {AppointmentInterface} from '../Schemas/Appointment.schema'
import { randomNumGen } from "../utilities";

export const getAppointment = async (req: Request, res: Response) => {
    const appointments: Array<AppointmentInterface> = await Appointment.find();
    if(appointments.length > 0) {
        return res.status(200).json({data: appointments})
    } else {
        return res.status(500).json({error: 'error while getting data'})
    }
}

export const addAppointment = async (req: Request, res: Response) => {
    const inputErr = validationResult(req);
    if (!inputErr.isEmpty()) {
        return res.status(400).json({
            clientErr: inputErr.mapped(),
        });
    } else {
        try {
            const {patientName, contact, scheduled} = req.body;
            console.log('in try')
            const serial = randomNumGen(4);
            const newData = new Appointment({
                patientName,
                contact,
                scheduled,
                serial
            })
            const savedData = await newData.save()

            if(savedData) return res.status(200).json({success: 'data saved'})
            else return res.status(500).json({serverErr: "ServerError"})

        } catch (err) {
            console.log(err)
            throw new Error('ServerError')
        }
    }
}

export const updateStatus = async (req:Request, res:Response) => {
    try {
        const {id, status} = req.body;
        if(id && status){
            await Appointment.findOneAndUpdate({_id: id},{
                $set:{
                    status
                }
            },{ useFindAndModify: false })
            return res.status(200).json({success: 'status update success'})
        } else {
            return res.status(400).json({clientErr: "invalid or blank input"})
        }
    } catch (err) {
        console.log(err)
        throw new Error('ServerError')
    }
}

export const deleteAppointment = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        if(id) {
            await Appointment.findOneAndDelete({_id: id});
            return res.status(200).json({success: 'delete success'})
        } else {
            return res.status(400).json({clientErr: "invalid or blank input"})
        }
    } catch (err) {
        console.log(err)
        throw new Error('ServerError')
    }
}