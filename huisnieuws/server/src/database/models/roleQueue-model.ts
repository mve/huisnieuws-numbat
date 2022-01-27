import mongoose from 'mongoose';

const roleQueueSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

const RoleQueueModel = mongoose.model('RoleQueue', roleQueueSchema);

export { RoleQueueModel, roleQueueSchema };
