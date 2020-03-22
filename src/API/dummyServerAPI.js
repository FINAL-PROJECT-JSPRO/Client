import axios from 'axios'

const productAPI = axios.create({
  baseURL: 'http://localhost:3000'
})

export default productAPI
