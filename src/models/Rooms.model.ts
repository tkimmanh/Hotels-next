import mongoose from "mongoose";

const roomsSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hotels",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    rentPerDay: {
      //giá thuê theo ngày
      type: Number,
      required: true,
    },
    amenities: {
      // tiêu nghi
      type: String,
      required: true,
    },
    bedrooms: {
      type: String,
      required: true,
    },
    roomNumber: {
      type: Number,
      required: true,
    },
    media: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

if (mongoose.models["rooms"]) {
  delete mongoose.models["rooms"];
}

const Rooms = mongoose.model("rooms", roomsSchema);

export default Rooms;
