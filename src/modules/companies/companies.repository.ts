import { InjectModel } from "@nestjs/sequelize";
import { Companies } from "src/models/companies.model";
import { CreateCompaniesDto } from "./dtos/create.companies.dto";
import { UpdateCompaniesDto } from "./dtos/update.companies.dto";


export class CompaniesRepositoy{
    constructor(
        @InjectModel(Companies)
        private readonly company: typeof Companies
    ){}

    async findall():Promise<Companies[]>{
        return this.company.findAll();
    }

    async findByIdCompany(id_company:number):Promise<Companies|null>{
        return this.company.findByPk(id_company)
    }

    async findByNit(nit:string):Promise<Companies|null>{
        return this.company.findOne({
            where:{nit}
        });
    }

    async CreateCompanies(create: CreateCompaniesDto):Promise<Companies>{
        return this.company.create(create);
    }

    async UpdateCompanies(id_company:number ,update: UpdateCompaniesDto):Promise<Companies|null>{
        const [affectedCount] = await this.company.update(update, {
            where: {id_company}
        });

        if (affectedCount===0) {
            return null
        }
        return this.findByIdCompany(id_company);
    }

    async DeleteCompanies(id_company:number):Promise<boolean>{
        const deletedCount = await this.company.destroy({
            where:{id_company}
        });
        return deletedCount > 0;
    }
}