/*

// Alexa dates
// listen for "time frames" then return a start and end date

- this week
- last week
- this month
- last month
- month
- this yeah
- last year
- year

*/
const m = require('moment')

let startDate
let endDate
let fm = 'YYYY-MM-DD'

module.exports = function (tf) {
  switch (tf) {
    case 'last week':
      startDate = m().subtract(1, 'week').startOf('week').format(fm)
      endDate = m().subtract(1, 'week').endOf('week').format(fm)
      break
    case 'this week':
      startDate = m().startOf('week').format(fm)
      endDate = m().format(fm)
      break
    case 'this month':
      startDate = m().startOf('month').format(fm)
      endDate = m().format(fm)
      break
    case 'last month':
      startDate = m().subtract(1, 'month').startOf('month').format(fm)
      endDate = m().subtract(1, 'month').endOf('month').format(fm)
      break
    case 'this year':
      startDate = m().startOf('year').format(fm)
      endDate = m().format(fm)
      break
    case 'last year':
      startDate = m().subtract(1, 'year').startOf('year').format(fm)
      endDate = m().subtract(1, 'year').endOf('year').format(fm)
      break
    default:
      startDate = m().startOf('year').format(fm)
      endDate = m().format(fm)
      break
  }

  return { 'startDate': startDate, 'endDate': endDate }
}
