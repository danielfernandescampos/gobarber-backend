import { isEqual } from "date-fns";
import Appointment from "../models/Appointment";
import { EntityRepository, Repository } from 'typeorm';

// DTO: data transfer objects -> para transmitir dados de um arquivo para o outro é bom usar objetos no JS
// interface CreateAppointmentDTO {
//     provider: string,
//     date: Date
// }
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {

    public async findByDate(date: Date): Promise<Appointment | null> {
        // const findAppointment = this.appointments.find((appointment: Appointment) =>
        //     isEqual(date, appointment.date)
        // );
        const findAppointment = await this.findOne({
            where: { date },
        })

        return findAppointment || null;
    }

}

export default AppointmentsRepository;
