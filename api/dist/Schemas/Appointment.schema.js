"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var appointmentSchema = new mongoose_1.Schema({
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
        default: 'Active',
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
});
exports.default = (0, mongoose_1.model)('Appointment', appointmentSchema);
//# sourceMappingURL=Appointment.schema.js.map