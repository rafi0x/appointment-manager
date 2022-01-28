import {body,check, oneOf} from 'express-validator'
import Appointments from "./Appointment.schema";

export const addAppointValidator = [
    body("patientName")
        .isLength({ min: 1, max: 16 })
        .withMessage("Invalid Name")
        .trim(),
    body("scheduled")
        .isISO8601().toDate()
        .withMessage("Invalid Date")
        .trim(),
    body("contact")
        .isMobilePhone(['bn-BD'])
        .withMessage("Invalid Contact Number")
        .custom(async (phone: string) => {
            const userPhone = await Appointments.findOne({ contact: phone });
            if (userPhone) {
                return Promise.reject("Contact Number already exist!");
            }
        })
        .trim()
];
