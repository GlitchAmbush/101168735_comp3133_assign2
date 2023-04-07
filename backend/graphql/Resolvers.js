const Employee = require('../models/employee')
const User = require('../models/user')

const resolvers = {
    Query: {
        async getAllEmployees() {
            return Employee.find()
        },

        async getEmployeeByID(_, { ID }) {
            return await Employee.findById(ID)
        },

        async matchUserPassword(_, { username, password }) {
            return await User.findOne({ username: username, password: password })
        }
    },

    Mutation: {
        async createUser(_, { userInput: { username, email, password } }) {
            const createdUser = new User({
                username: username,
                email: email,
                password: password
            })

            const res = await createdUser.save()
            console.log(res._doc)
            return {
                id: res.id,
                ...res._doc
            }
        },

        async createEmployee(_, { employeeInput: { first_name, last_name, email, gender, salary } }) {
            const createdEmployee = new Employee({
                first_name: first_name,
                last_name: last_name,
                email: email,
                gender: gender,
                salary: salary
            })

            const res = await createdEmployee.save()
            console.log(res._doc)
            return {
                id: res.id,
                ...res._doc
            }
        },

        async deleteEmployee(_, { ID }) {
            const wasDeleted = (await Employee.deleteOne({ _id: ID })).deletedCount

            return wasDeleted
        },

        async editEmployee(_, { ID,  employeeInput: { first_name, last_name, email, gender, salary }}) {
            const wasEdited = (await Employee.updateOne({ _id: ID }, { first_name: first_name, last_name: last_name, email: email, gender: gender, salary: salary })).modifiedCount
            return wasEdited
        }
    }
}

module.exports = { resolvers }