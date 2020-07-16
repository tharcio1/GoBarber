import Appointment from '../models/Appointment';
import User from '../models/User';

import * as yup from 'yup';

class AppointmentController{
  async store(req, res) {
    const schema = yup.object().shape({
      provider_id: yup.number().required(),
      date: yup.date().required(),
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: 'Validation fails' });
    }//fim if

    const { provider_id, date } = req.body;

    //Check if provider_id is a provider:
    const isProvider = await User.findOne({
       where: { id: provider_id, provider:true },
    });

    if(!isProvider) {
      return res.status(401).json({ error: 'You can only create appointments with providers' });
    }//fim if

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    return res.json(appointment);
  }//fim metodo store
}//fim classe AppointmentController

export default new AppointmentController();
