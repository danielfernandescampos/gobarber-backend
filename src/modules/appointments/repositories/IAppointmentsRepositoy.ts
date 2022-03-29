import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";
import Appointment from "../infra/typeorm/entities/Appointment";

export default interface IAppointmentsRepository {
    findByDate(date: Date): Promise<Appointment | undefined>;
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
}
