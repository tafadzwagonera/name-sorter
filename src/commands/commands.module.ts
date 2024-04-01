import { LogService } from '../common/log.service'
import { Module } from '@nestjs/common'
import { NameSorterCommand } from './name-sorter.command'

@Module({
  providers: [LogService, NameSorterCommand],
})
export class CommandsModule {}
