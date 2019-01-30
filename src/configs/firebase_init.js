import * as firebase from 'firebase';
import { config } from './firebase_config';

firebase.initializeApp(config);

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();

// adding a comment so I can commit & push to re-attempt build
