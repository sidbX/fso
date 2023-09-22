import axios from "axios"

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data)
}

const addPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data)
}

const removePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const updatePerson = (updatedPerson) => {
  return axios
    .put(`${baseUrl}/${updatedPerson.id}`, updatedPerson)
    .then((response) => response.data)
}

export default { getAll, addPerson, removePerson, updatePerson }
