"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// @ts-ignore
var appointment_controller_1 = require("../controllers/appointment.controller");
var router = (0, express_1.Router)();
router.route('/appointments')
    .get(appointment_controller_1.getAppointment)
    .post(appointment_controller_1.addAppointment);
exports.default = router;
//# sourceMappingURL=index.js.map