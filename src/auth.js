import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  query,
  collection,
  getFirestore,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { firebaseApp } from "./App";

export const signInWithGoogle = async () => {
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  try {
    const res = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// export const logout = () => {
//   signOut(auth);
// };
