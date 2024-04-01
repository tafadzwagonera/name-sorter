#!/usr/bin/env node

import { CommandFactory } from 'nest-commander'
import { AppModule } from './app.module'

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
