import * as firebase from "firebase/app";
import firebaseConfig from './firebaseConfig';

import 'firebase/auth';
import 'firebase/database';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();

export const tasksRef = database.ref('mess');
export const usersRef = database.ref('users');