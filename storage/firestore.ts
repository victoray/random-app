import * as firebase from "firebase";
import { firestore } from "firebase";
import { BASE_COLLECTION, FIREBASE_APP } from "../constants";

class Firestore {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  getItem(
    userId: string
  ): Promise<firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    const app = firebase.app(FIREBASE_APP);

    return firestore(app)
      .collection(this.key)
      .where("userId", "==", userId)
      .orderBy("timestamp", "desc")
      .get();
  }

  setItem(value: Record<string, unknown>): Promise<unknown> {
    const app = firebase.app(FIREBASE_APP);

    return firestore(app).collection(this.key).add(value);
  }
}

export default new Firestore(BASE_COLLECTION);
