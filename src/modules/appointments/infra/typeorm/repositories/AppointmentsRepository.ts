import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepositoy";
import { isEqual } from "date-fns";
import { EntityRepository, getRepository, Repository } from 'typeorm';
import Appointment from "../entities/Appointment";

// DTO: data transfer objects -> para transmitir dados de um arquivo para o outro é bom usar objetos no JS
// interface CreateAppointmentDTO {
//     provider: string,
//     date: Date
// }

/*
 * SOLID - L: Liskov Substitution Principle
 * tirar a camada do type ORM do repositorório para caso algum dia o banco de dados seja trocado,
 * isso não alterará os métodos em todos os repositórios
 */

class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        })

        return findAppointment;
    }

    public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id, date });
        await this.ormRepository.save(appointment);
        return appointment;
    }

}

export default AppointmentsRepository;
