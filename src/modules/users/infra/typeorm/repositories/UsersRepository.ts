import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepositoy";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { isEqual } from "date-fns";
import { EntityRepository, getRepository, Repository } from 'typeorm';
import User from "../entities/User";

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({where: {email}});
        return user;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);
        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }

    public async create({name, email, password}: ICreateUserDTO): Promise<User> {
        const appointment = this.ormRepository.create({ name, email, password });
        await this.ormRepository.save(appointment);
        return appointment;
    }

}

export default UsersRepository;
