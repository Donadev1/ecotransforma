import { PartialType } from '@nestjs/mapped-types';
import {CreatePersonDto}from './createpersondto'
export class UpdatePersonDto extends PartialType(CreatePersonDto) {}
