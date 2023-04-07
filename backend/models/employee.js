const { model, Schema } = require('mongoose')

const employeeSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true , required: true},
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    salary: { type: Number, required: true}
})

module.exports = model('employee', employeeSchema)