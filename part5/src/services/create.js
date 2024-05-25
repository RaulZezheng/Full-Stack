import axios from 'axios'
const baseUrl = '/api/create'

const create = async bloginfo => {
  const response = await axios.post(baseUrl, bloginfo)
  return response.data
}

export default {create}