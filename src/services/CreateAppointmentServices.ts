import { startOfHour } from 'date-fns'

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository';
import appointmentRouter from '../routes/appointments.routes';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository){
    this.appointmentsRepository = appointmentsRepository
  }

  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw Error('appointment')
    }

    const appointment = this.appointmentsRepository.create({
    provider,
    date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;