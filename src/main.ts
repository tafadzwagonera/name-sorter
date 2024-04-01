#!/usr/bin/env node

import { AppModule } from './app.module'
import { CommandFactory } from 'nest-commander'

async function bootstrap() {
  await CommandFactory.run(AppModule, {
    errorHandler: (error) => {
      console.log(error.message)
      process.exit(0)
    },
    logger: ['error', 'warn'],
  })
}

bootstrap()
