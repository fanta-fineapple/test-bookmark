import axios from "axios";
import {
  setPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  setDoc,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { auth, db, storage } from "../config/keys";
const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";

const api = axios.create({
  baseURL: `${PROXY}/ttb/api/`,
});

export const bookApi = {
  info: (isbn) =>
    api.get("ItemLookUp.aspx", {
      params: {
        ttbkey: process.env.REACT_APP_TTB_KEY,
        itemIdType: "ISBN",
        cover: "MidBig",
        ItemId: isbn,
        output: "js",
        Version: 20131101,
      },
    }),
  search: (term, page) =>
    api.get("ItemSearch.aspx", {
      params: {
        ttbkey: process.env.REACT_APP_TTB_KEY,
        Query: term,
        QueryType: "Keyword",
        MaxResults: 10,
        start: page,
        SearchTarget: "Book",
        output: "js",
        Version: 20131101,
      },
    }),
};

export const signup = async (email, password) => {
  // await setPersistence(auth, browserSessionPersistence);
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const currentUser = userCredential.user;
      const uid = currentUser.uid;
      const code = uid.substring(0, 10).toUpperCase();
      setDoc(doc(db, "users", currentUser.uid), {
        email,
        code,
        name: code,
        photoUrl: "",
        friends: [],
        uid,
      });
      // Alert.alert("계정 생성 성공");
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        console.log("이미 가입되어있는 이메일 입니다.");
      } else if (error.code === "auth/weak-password") {
        console.log("비밀번호는 6자리 이상이어야 합니다.");
      } else if (
        error.code === "auth/user-not-found" ||
        "auth/wrong-password"
      ) {
        console.log("이메일 또는 비밀번호가 일치하지 않습니다.");
      } else {
        console.log("에러메세지", error);
      }
    });
};

export const login = async (email, password) => {
  // await setPersistence(auth, browserSessionPersistence);
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("로그인성공");
    })
    .catch((error) => {
      // console.log(error.code);
      if (error.code === "auth/user-not-found") {
        console.log("가입되어 있지 않은 이메일입니다.");
      } else if (
        error.code === "auth/user-not-found" ||
        "auth/wrong-password"
      ) {
        console.log("이메일 또는 비밀번호가 일치하지 않습니다.");
      } else {
        console.log("에러메세지", error);
      }
    });
};

export const getBookListData = async (uid) => {
  // const querySnapshot = await getDocs(collection(db, "book2"));
  // let productItems = [];
  // querySnapshot.forEach((doc) => {
  //   productItems = [...productItems, { docId: doc.id, ...doc.data() }];
  // });

  const bookRef = collection(db, "book2");
  const q = query(bookRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  let productItems = [];
  querySnapshot.forEach((doc) => {
    productItems = [...productItems, { docId: doc.id, ...doc.data() }];
  });
  return productItems;
};

export const getBook = async (uid, id) => {
  const bookRef = collection(db, "book2");
  const q = query(bookRef, where("uid", "==", uid), where("id", "==", id));
  const querySnapshot = await getDocs(q);
  let productItems = [];
  querySnapshot.forEach((doc) => {
    productItems = [...productItems, { docId: doc.id, ...doc.data() }];
  });
  return productItems;
};

export const addBookData = async (bookInfo, obj, userUid) => {
  const docRef = doc(collection(db, "book2"));
  await setDoc(docRef, {
    ...bookInfo,
    ...obj,
    uid: userUid,
    docId: docRef.id,
  });
  return docRef.id;
};

export const updateBookData = async (docId, obj) => {
  const docRef = doc(db, "book2", docId);
  await updateDoc(docRef, obj);
};

export const deleteBookData = async (docId) => {
  await deleteDoc(doc(db, "book2", docId));
};

// AIzaSyCEmD7JjawmWRw6zZK0kxCOg9dMiXxKpU4
// AIzaSyCJAPOfJaO82Eyzaui5HjoiSAB5O1sJ6BM
// AIzaSyAIAfSJk0mvcwTEMdEh0QNGKYc1km3XlpI
// AIzaSyBAcRHSDrP2Aam2dk8cLTWi2Fb76GZHVt0
const API_URL =
  `https://vision.googleapis.com/v1/images:annotate?key=` +
  process.env.REACT_APP_GOOGLE_API_KEY;
export const callGoogleVisionAsync = async (image) => {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [{ type: "DOCUMENT_TEXT_DETECTION" }],
      },
    ],
  };

  const result = await axios.post(API_URL, body);
  return result.data.responses[0].fullTextAnnotation.text;
};

export const deleteStorage = async (image) => {
  await deleteObject(ref(storage, image));
};

export const deleteStorageBook = async (list) => {
  for (let item of list) {
    await deleteObject(ref(storage, item.image));
  }
};

export const userProfileUpdate = async (uid, obj) => {
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, obj);
};

export const searchFriend = async (code) => {
  const userRef = collection(db, "users");
  const q = query(userRef, where("code", "==", code));
  const querySnapshot = await getDocs(q);
  let productItems = [];
  querySnapshot.forEach((doc) => {
    productItems = [...productItems, { docId: doc.id, ...doc.data() }];
  });
  return productItems;
};

export const getFriends = async (array) => {
  const userRef = collection(db, "users");
  const q = query(userRef, where("uid", "in", array));
  const querySnapshot = await getDocs(q);
  let productItems = [];
  querySnapshot.forEach((doc) => {
    productItems = [...productItems, { docId: doc.id, ...doc.data() }];
  });
  return productItems;
};
