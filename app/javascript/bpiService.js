import moment from 'moment'
import axios from 'axios'

const API_ENDPOINT = 'https://api.coindesk.com/v1/bpi/historical/close.json'
const SECONDARY_ENDPOINT = ''
const CURRENCY = 'CAD'

const HTTP = axios.create({
  baseURL: API_ENDPOINT
})

//export DATE_FORMAT
export default {
  get_rate(date) {
    return new Promise(function(resolve, reject) {
      HTTP.get('', { params: {
        start: date,
        end: date,
        currency: CURRENCY
      }})
      .then(function(response) {
        resolve(response.data)
      })
      .catch(function(error) {
        console.log(error)
        reject(error)
      })
    })
  }
}
