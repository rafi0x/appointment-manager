import { Router } from 'express';

// @ts-ignore
import {getAppointment, addAppointment, updateStatus, deleteAppointment} from '../controllers/appointment.controller'
import {authUser, verifyToken} from '../controllers/auth.controller'


const router = Router();

router.route('/appointments')
    .get(getAppointment)
    .post(verifyToken, addAppointment)
    .put(verifyToken, updateStatus)
    .delete(verifyToken, deleteAppointment)

router.route('/auth')
    .post(authUser)

export default router;