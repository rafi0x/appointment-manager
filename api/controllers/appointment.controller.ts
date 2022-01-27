import {Request, Response} from 'express';
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
    const {patientName, contact, scheduled} = req.body;
    const serial = randomNumGen(4);
    if(patientName && contact && scheduled) {
        const newData = new Appointment({
            patientName,
            contact,
            scheduled,
            serial
        })
        const savedData = await newData.save()
        if(savedData) return res.status(200).json({success: 'data saved'})
        else return res.status(500).json({serverErr: "server error"})

    } else {
        return res.status(400).json({clientErr: "invalid or blank input"})
    }

}