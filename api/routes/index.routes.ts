import { Router } from 'express';

// @ts-ignore
import {getAppointment, addAppointment} from '../controllers/appointment.controller'
import {authUser, verifyToken} from '../controllers/auth.controller'


const router = Router();

router.route('/appointments')
    .get(getAppointment)
    .post(verifyToken, addAppointment)
router.route('/auth')
    .post(authUser)

export default router;