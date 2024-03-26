import mongoose from 'mongoose'

const businessMessageModel = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
    },
    messageText: { type: String, required: true },
    businessId: { type: String, required: true },
    userId: { type: String }, // userId is optional
  },
  {
    timestamps: true,
  },
)

const BusMessage = mongoose.model('BusMessage', businessMessageModel)

export default BusMessage
