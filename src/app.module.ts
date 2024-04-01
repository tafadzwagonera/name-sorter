import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CommandsModule } from './commands/commands.module'
import { Module } from '@nestjs/common'

@Module({
  controllers: [AppController],
  imports: [CommandsModule],
  providers: [AppService],
})
export class AppModule {}
