//////////////////////////////////////////////////////////////////////////
//MONGOOSE SET-UP
//The following code sets up the app to connect to a MongoDB database
//using the mongoose library.
//////////////////////////////////////////////////////////////////////////
var mongoose = require('mongoose');
require('dotenv').config();

const connectStr = process.env.MONGO_STR;
mongoose.connect(connectStr, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => { console.log(`Connected to ${connectStr}.`) },
    err => { console.error(`Error connecting to ${connectStr}: ${err}`) }
  );

const Schema = mongoose.Schema;

//Define schema that maps to a document in the Users collection in the appdb
//database.
const userSchema = new Schema({
  id: String, //unique identifier for user
  password: String,
  displayName: String, //Name to be displayed within app
  authStrategy: String, //strategy used to authenticate, e.g., github, local
  profilePicURL: String, //link to profile image
  securityQuestion: String,
  accountType: String,
  securityAnswer: {
    type: String, required: function () { return this.securityQuestion ? true : false }
  },
});
const User = mongoose.model("User", userSchema);

const fanSchema = new Schema({
  user: userSchema,
  artists: [String],
  venues: [String],
  genres: [String],
});
const Fan = mongoose.model("Fan", fanSchema);

const artistSchema = new Schema({
  user: userSchema,
  artistName: String,
  genres: [String],
  facebookHandle: String,
  instagramHandle: String
});
const Artist = mongoose.model("Artist", artistSchema);

const eventSchema = new Schema({
  venueId: String,//Schema.ObjectId,
  name: String,
  time: String,
  artists: [String]
});
const Event = mongoose.model('Event', eventSchema)

const venueSchema = new Schema({
  user: userSchema,
  streetAddress: String,
  email: String,
  phoneNumber: String,
  socialMediaLinks: String,
  lat: Number,
  long: Number,
  eventIDs: [eventSchema]
});
const Venue = mongoose.model('Venue', venueSchema);

exports.User = User;
exports.Artist = Artist;
exports.Fan = Fan;
exports.Venue = Venue;
exports.Event = Event;