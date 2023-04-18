import firebaseAdminKey from '../../../firebase-admin-key.json' assert { type: 'json' }
import admin from 'firebase-admin'
import { initializeApp } from 'firebase-admin/app';
import {getFirestore} from "firebase-admin/firestore";

export default class Firebase {
    constructor() {
        if (admin.apps.length === 0) {
            initializeApp({
                credential: admin.credential.cert(firebaseAdminKey),
            })
        }
    }

    get db() {
        return getFirestore();
    }
}