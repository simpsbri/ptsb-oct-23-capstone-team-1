import mongoose from 'mongoose'

const businessModel = new mongoose.Schema(
  {
    company_name: { type: String, required: true },
    businessID: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
    lastContactedDate: { type: Date, default: null, required: false },
    initialProject: { type: String, required: false },
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
    businessStatus: { type: String, required: false, default: 'New' }, // "new", "in progress", "completed"
    website: { type: String, required: false },
  },
  {
    timestamps: true,
  },
)

const Business = mongoose.model('Business', businessModel)

export default Business
