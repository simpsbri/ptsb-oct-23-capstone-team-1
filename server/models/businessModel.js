import mongoose from 'mongoose'

const businessModel = new mongoose.Schema(
  {
    company_name: { type: String, required: true },
    businessID: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
    lastContactedDate: { type: Date, default: null, required: false },
    isNew: { type: Boolean, required: false },
    street: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    Zip: { type: Number, required: false },
    Phone: { type: Number, required: false },
    Overview: { type: String, required: false },
    Projects: { type: [Array], required: false },
    businessUsers: { type: [Array], required: false },
    primary_contact: { type: String, required: false },
    primary_contact_email: { type: String, required: false },
  },
  {
    timestamps: true,
  },
)

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
})
const Counter = mongoose.model('Counter', CounterSchema)

businessModel.pre('save', function (next) {
  if (this.isNew) {
    this.businessID = this._id
  }
  next()
})

const Business = mongoose.model('Business', businessModel)

export default Business
