import mongoose, { Schema } from 'mongoose'

const callSchema = new Schema({
  primary: {
    type: String
  },
  secondary: {
    type: String
  },
  patient: {
    type: String
  },
  frequency: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

callSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      primary: this.primary,
      secondary: this.secondary,
      patient: this.patient,
      frequency: this.frequency,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Call', callSchema)

export const schema = model.schema
export default model
