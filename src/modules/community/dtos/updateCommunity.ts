import { PartialType } from "@nestjs/mapped-types";
import { createCommunityDto } from "./createCommunity";


export class UpdateCommunityDto extends PartialType(createCommunityDto){}