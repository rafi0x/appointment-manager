"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// @ts-ignore
var appointment_controller_1 = require("../controllers/appointment.controller");
var auth_controller_1 = require("../controllers/auth.controller");
var router = (0, express_1.Router)();
router.route('/appointments')
    .get(appointment_controller_1.getAppointment)
    .post(auth_controller_1.verifyToken, appointment_controller_1.addAppointment);
router.route('/auth')
    .post(auth_controller_1.authUser);
exports.default = router;
//# sourceMappingURL=index.routes.js.map