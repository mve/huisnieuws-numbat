import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validator: (input: string) => input.length > 20,
    message: (input: any) => `De naam van de tag ${input.value} is langer dan 15 karakters`,
  },
  color: {
    type: String,
    required: true,
  },
});

const TagModel = mongoose.model('Tag', tagSchema);

export { TagModel, tagSchema };
