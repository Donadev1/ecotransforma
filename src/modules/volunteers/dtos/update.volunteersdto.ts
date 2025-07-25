import { PartialType } from '@nestjs/mapped-types';
import CreateVolunteersDto from './create.volunteersdto';


export class UpdateVolunteersDto extends PartialType(CreateVolunteersDto) {}
