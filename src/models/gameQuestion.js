import { mongoose } from '../config/database.js';

const questionSchema = new mongoose.Schema(
    {
        city: {
            type: String,
            required: true,
          },
          country: {
            type: String,
            required: true,
          },
          clues: {
            type: [String],
            required: true,
          },
          fun_fact: {
            type: [String],
            required: true,
          },
          trivia: {
            type: [String],
            required: true,
          }
    },
    { timestamps: true }
);

export const Questions = mongoose.model('questions', questionSchema);