import { PartialType } from '@nestjs/mapped-types';
import ActivityRequestDto from './createActivity.dto';

export class UpdateActivityDto extends PartialType(ActivityRequestDto) {}