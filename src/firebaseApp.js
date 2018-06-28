import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDNvGxJdFSU2kAMAulE3Q3FiMSSYWpDgx0",
  authDomain: "inventory-78b2d.firebaseapp.com",
  databaseURL: "https://inventory-78b2d.firebaseio.com",
  projectId: "inventory-78b2d",
  storageBucket: "inventory-78b2d.appspot.com",
  messagingSenderId: "958161152366"
};
export const fire = firebase.initializeApp(config);

export const db = fire.database(); 
export const auth = fire.auth();

export const storageKey = 'roman';

export const isAuthenticated = () => {
  return !!auth.currentUser || !!localStorage.getItem(storageKey);
}