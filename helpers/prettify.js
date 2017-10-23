module.exports = (cells = []) =>
  '\n' + cells.map((row = []) => row.map((cell) => cell ? '▓▓' : '░░').join('')).join('\n')
