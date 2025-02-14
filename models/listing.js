const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://img.freepik.com/free-photo/photorealistic-wooden-house-with-timber-structure_23-2151302634.jpg",
    set: (v) =>
      v === ""
        ? "hhttps://img.freepik.com/free-photo/photorealistic-wooden-house-with-timber-structure_23-2151302634.jpg"
        : v,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
        type: Schema.Types.ObjectId,
        ref: "Review",
    }
  ],
  owner:{
       type: Schema.Types.ObjectId,
        ref: "User",
  }

});

listingSchema.post("findOneAndDelete", async (listing) => {
  if(listing) {
    await Review.deleteMany({_id: {$in: listing.review}});
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

