import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

// Your web app's Firebase configuration
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

//collection reference

const collectionRef = collection(FIREBASE_DB, 'flashcard')

//collection data

const getFlashCards = async () => {
    try {
        const data = await getDocs(collectionRef)
        let flashCards = []
        data.docs.forEach((doc) => {
            flashCards.push({ ...doc.data(), id: doc.id })
            console.log(flashCards)
        })
    } catch (error) {
        console.log('Error while getting flashcard from database: ', error)
    }
}

//detech auth state
// onAuthStateChanged(auth, (user) => {
//     if (user !== null) {
//         console.log('user logged in')
//     } else {
//         console.log('no user')
//     }
// })

// getFlashCards()
