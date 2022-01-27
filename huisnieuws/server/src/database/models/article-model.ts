import mongoose from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc';
import { commentSchema } from './comment-model';
import { articleReachObject } from './enums/articleReach';
import { tagSchema } from './tag-model';

const articleSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: [true, 'Postcode is vereist!'],
      validate: {
        validator: (input: string) => !!input && /^[1-9][0-9]{3} ?(?!sa|sd|ss)[A-Z]{2}$/i.test(input),
        message: (props: any) => `${props.value} is geen valide postcode formaat!`,
      },
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reach: {
      type: String,
      required: true,
      default: 'city',
      enum: articleReachObject,
    },
    tags: {
      type: [tagSchema],
      required: false,
      default: [],
    },
    comments: {
      type: [commentSchema],
      required: false,
      default: [],
    },
  },
  { timestamps: true },
);

articleSchema.plugin(autoIncrement, { model: 'Article', field: 'id' });

const ArticleModel = mongoose.model('Article', articleSchema);

export { ArticleModel, articleSchema };
