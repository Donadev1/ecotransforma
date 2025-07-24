import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from 'src/models/users.model';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersRepository {
  constructor(

    @InjectModel(Users)
    private readonly usersModel: typeof Users,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.usersModel.findAll({
      attributes: { exclude: ['contrasena'] },
    });
  }

  async findById(id_user: number): Promise<Users | null> {
    return this.usersModel.findByPk(id_user, {
      attributes: { exclude: ['contrasena'] },
    });
  }

  async findByEmail(email: string): Promise<Users | null> {
    return this.usersModel.findOne({
      where: { email },
    });
  }

  async create(userData: CreateUserDto): Promise<Users> {
    return this.usersModel.create(userData);
  }

  async update(id_user: number, userData: UpdateUserDto): Promise<Users | null> {
    const [affectedCount] = await this.usersModel.update(userData, {
      where: { id_user },
    });

    if (affectedCount === 0) {
      return null;
    }

    return this.findById(id_user);
  }

  async delete(id_user: number): Promise<boolean> {
    const deletedCount = await this.usersModel.destroy({
      where: { id_user },
    });

    return deletedCount > 0;
  }
}
