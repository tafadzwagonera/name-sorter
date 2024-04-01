import { Command, CommandRunner } from 'nest-commander'
import { LogService } from '../common/log.service'
import { promises as fs } from 'fs'

@Command({
  arguments: '<file>',
  description: 'Parses and sorts a space-delimited text file',
  name: 'name-sorter',
  options: { isDefault: true },
})
export class NameSorterCommand extends CommandRunner {
  constructor(private readonly logService: LogService) {
    super()
  }

  async run(passedParams: string[]): Promise<void> {
    const fileName = passedParams.at(0)
    const names = (await fs.readFile(`./${fileName}`, 'utf8')).split(/\n/)

    const compareNames = (a: string, b: string) => {
      const re = /\s/
      const lastNameA = a.split(re).pop()?.toLowerCase() as string
      const lastNameB = a.split(re).pop()?.toLowerCase() as string

      if (lastNameA.localeCompare(lastNameB) < 0) return -1
      if (lastNameA.localeCompare(lastNameB) < 0) return 1

      // Sort by given names (treat as single string)
      const givenNamesA = a.split(' ').slice(0, -1).join(' ').toLowerCase()
      const givenNamesB = b.split(' ').slice(0, -1).join(' ').toLowerCase()

      return givenNamesA.localeCompare(givenNamesB)
    }

    // Sort the names array
    names.sort(compareNames)
    this.logService.log(names)

    await fs.writeFile('sorted-names.txt', names.join('\n'))
  }
}
