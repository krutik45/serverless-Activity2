/* eslint-disable */

const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { Storage } = require("@google-cloud/storage");
const { v4: uuidv4 } = require("uuid");
const storage = new Storage();
const bucketName = "activity-2-f4bb7.appspot.com";

admin.initializeApp();

const db = admin.firestore();
const usersRef = db.collection("users");
const express = require("express");
const cors = require("cors")({ origin: true });
const app = express();

app.use(cors);
//function to create an user
exports.createUser = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    try {
      response.set("Access-Control-Allow-Origin", "*");
      response.set("Access-Control-Allow-Methods", "GET, POST");

      console.log("request body in create", request.body);
      const { email, password } = request.body; // Assuming you receive name and email in request body
      // Add a new document with a generated ID

      if (!email || !password) {
        return response.status(400).send("Missing parameters");
      }

      //refering to users collection

      const newUserRef = await usersRef.add({
        email: email,
        password: password,
      });

      return response.status(200).json({ id: newUserRef.id });
    } catch (error) {
      // Error handling
      console.log("Error creating user: === >", error);
      return response.status(500).send("Failed to create user");
    }
  });
});

//function to verify the users
exports.verifyUser = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    try {
      response.set("Access-Control-Allow-Origin", "*");
      response.set("Access-Control-Allow-Methods", "GET, POST");
      const { email, password } = request.body;
      console.log("======>", request);
      if (!email || !password) {
        return response.status(400).send("Email and password are required.");
      }

      const snapshot = await usersRef.where("email", "==", email).get();

      if (snapshot.empty) {
        return response.status(404).send("User not found");
      }

      let user;
      snapshot.forEach((doc) => {
        user = doc.data();
      });

      if (user.password === password) {
        return response
          .status(200)
          .json({ success: true, message: "User verified successfully" });
      } else {
        return response
          .status(401)
          .json({ success: true, message: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      return response.status(500).send("Internal server error");
    }
  });
});

//function to upload the image
exports.uploadImage = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    try {
      const base64Data = request.body.base64Image;

      const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, "");

      const imageBuffer = Buffer.from(base64Image, "base64");

      const filename = `image_${Date.now()}.png`;

      await storage.bucket(bucketName).file(filename).save(imageBuffer, {
        contentType: "image/png", // Adjust the content type if your image is not PNG
        public: true, // Optional: Make the file public
      });

      // Respond with success message or other data
      response.status(200).send(`Image ${filename} uploaded successfully.`);
    } catch (error) {
      console.error("Error uploading image:", error);
      response.status(500).send("Internal server error");
    }
  });
});

exports.fetchAllImages = functions.https.onRequest(
  async (request, response) => {
    cors(request, response, async () => {
      try {
        // Fetch all objects from the bucket
        const [files] = await storage.bucket(bucketName).getFiles();

        // Construct URLs or return metadata for each file
        const images = files.map((file) => ({
          name: file.name,
          // Adjust URL format as per your bucket configuration
          url: `https://storage.googleapis.com/${bucketName}/${file.name}`,
          contentType: file.metadata.contentType,
          size: file.metadata.size,
        }));

        // Respond with the list of images
        response.status(200).json(images);
      } catch (error) {
        console.error("Error fetching images:", error);
        response.status(500).send("Error fetching images.");
      }
    });
  }
);
