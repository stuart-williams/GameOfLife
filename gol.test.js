const prettify = require('./helpers/prettify')
const getGeneration = require('./gol')

describe(`Glider ${prettify([[1, 0, 0], [0, 1, 1], [1, 1, 0]])}`, () => {
  const cells = [
    [
      [1, 0, 0],
      [0, 1, 1],
      [1, 1, 0]
    ],
    [
      [0, 1, 0],
      [0, 0, 1],
      [1, 1, 1]
    ],
    [
      [1, 0, 1],
      [0, 1, 1],
      [0, 1, 0]
    ]
  ]

  it('Glider 1', () => {
    expect(prettify(getGeneration(cells[0], 1))).toEqual(prettify(cells[1]))
  })

  it('Glider 2', () => {
    expect(prettify(getGeneration(cells[0], 2))).toEqual(prettify(cells[2]))
  })
})
