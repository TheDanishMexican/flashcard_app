import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
    getFirestore,
    collection,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyC4UQn5YFmf4lFp9uiXK3jwBI0r7TNqh-Q',
    authDomain: 'flashcard-app-80290.firebaseapp.com',
    databaseURL:
        'https://flashcard-app-80290-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'flashcard-app-80290',
    storageBucket: 'flashcard-app-80290.firebasestorage.app',
    messagingSenderId: '15758957444',
    appId: '1:15758957444:web:9399d79ec75d6cced0dbd1',
}

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_DB = getFirestore(FIREBASE_APP)
export const flashcardsRef = collection(FIREBASE_DB, 'flashcards')
