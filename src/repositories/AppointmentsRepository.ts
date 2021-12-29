import { isEqual } from "date-fns";
import Appointment from "../models/Appointment";

// DTO: data transfer objects -> para transmitir dados de um arquivo para o outro é bom usar objetos no JS
interface CreateAppointmentDTO {
    provider: string,
    date: Date
}

class AppointmentsRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = []
    }

    public getAll(): Appointment[] {
        return this.appointments;
    }

    public findByDate(date: Date): Appointment | null {
        const findAppointment = this.appointments.find((appointment: Appointment) =>
            isEqual(date, appointment.date)
        );
        return findAppointment || null;
    }

    public create({ provider, date }: CreateAppointmentDTO): Appointment { // assim enviamos apenas um parâmetro na função (clean code)
        const appointment = new Appointment({ provider, date })

        this.appointments.push(appointment);

        return appointment
    }
}

export default AppointmentsRepository;
