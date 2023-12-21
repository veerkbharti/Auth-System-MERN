import User from "../src/models/user.model.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const initializePassport = (passport) => {

  // GoogleStrategy for Google OAuth authentication
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.YOUR_GOOGLE_CLIENT_ID,
        clientSecret: process.env.YOUR_GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await User.findOne({
            email: profile.emails[0].value,
          });

          if (existingUser) {
            return done(null, existingUser);
          }

          const newUser = new User({
            email: profile.emails[0].value,
            mobile: "1234567890",
          });

          await newUser.save();
          return done(null, newUser);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  // Serialize and deserialize user functions for Passport
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

export default initializePassport;
