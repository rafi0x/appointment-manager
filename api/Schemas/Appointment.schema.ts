import {Schema, model} from "mongoose";

export interface AppointmentInterface {
    _id: string;
    title: String;
    patientName: String;
    contact: String | Number;
    status: 'Active' | 'Completed' | 'Cancelled';
    serial: String;
    scheduled: Date;
    createdAt: Date;
}

const appointmentSchema = new Schema({
    patientName: {
        type: String,
        trim: true,
        required: true
    },
    contact: {
        type: String || Number,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Completed', 'Cancelled'],
        default:'Active',
        required: true,
    },
    serial: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    scheduled: {
        type: Date,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export default model<AppointmentInterface>('Appointment', appointmentSchema);