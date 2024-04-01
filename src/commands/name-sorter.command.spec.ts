import { AppModule } from '../app.module'
import { CommandTestFactory } from 'nest-commander-testing'
import { TestingModule } from '@nestjs/testing'
import * as fs from 'node:fs/promises'

describe('NameSorterCommand', () => {
  let command: TestingModule

  beforeEach(async () => {
    command = await CommandTestFactory.createTestingCommand({
      imports: [AppModule],
    }).compile()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should sort names from a file and write them to sorted-names.txt', async () => {
    const mockFileData = `Janet Parsons\nVaugh Lewis\nAdonis Julius Archer`
    const expectedSortedNames = `Adonis Julius Archer\nJanet Parsons\nVaugh Lewis`

    jest.spyOn(fs, 'readFile').mockResolvedValue(mockFileData)
    jest.spyOn(fs, 'writeFile')

    await CommandTestFactory.run(command, ['test.txt'])
    expect(fs.readFile).toHaveBeenCalledWith('./test.txt', 'utf8')

    expect(fs.writeFile).toHaveBeenCalledWith(
      'sorted-names.txt',
      expectedSortedNames,
    )
  })
})
