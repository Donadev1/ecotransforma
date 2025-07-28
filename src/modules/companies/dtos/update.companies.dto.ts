import { CreateCompaniesDto } from "./create.companies.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateCompaniesDto extends PartialType(CreateCompaniesDto){}