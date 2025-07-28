import { forwardRef, Module } from '@nestjs/common';
import { PunctuationService } from './punctuation.service';
import { PunctuationController } from './punctuation.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Punctuation } from 'src/models/punctuation.model';
import { PersonsModule } from '../persons/persons.module';
import { CommunityModule } from '../community/community.module';
import { Community } from 'src/models/community.model';
import { Persons } from 'src/models/persons.model';

@Module({
  imports:[
    SequelizeModule.forFeature([Punctuation, Community, Persons]),
    forwardRef(()=> PersonsModule),
    forwardRef(()=> CommunityModule)
  ],
  providers: [PunctuationService],
  controllers: [PunctuationController]
})
export class PunctuationModule {}
