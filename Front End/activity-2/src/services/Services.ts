/* eslint-disable */


import axios from "axios";

export class Services {
  async signUp(payload: any) {
    const url =
      "https://us-central1-activity-2-f4bb7.cloudfunctions.net/createUser";
    const response = await axios.post(url, payload);
    return response;
  }

  async signIn(payload: any) {
    const url =
      "https://us-central1-activity-2-f4bb7.cloudfunctions.net/verifyUser";
    const response = await axios.post(url, payload);
    return response;
  }

  async fetchImages() {
    const url =
      "https://us-central1-activity-2-f4bb7.cloudfunctions.net/fetchAllImages";
    const response = await axios.get(url);
    return response;
  }

  async uploadImage(payload: any) {
    console.log("payload", payload);
    const url =
      "https://us-central1-activity-2-f4bb7.cloudfunctions.net/uploadImage";
    const response = await axios.post(url, payload);
    return response;
  }
}
