# Welcome to my flashcards app (created with expo) 👋

This is my first app project and it was developed for my 4th semester React Native class.
I set out to create a flashcard app, with a simple quiz mode.
The app is setup to use Firebase ("firestore database" & "authentication" products) for the authentication and database functionalities.

## Get started

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

0. Create a firebase folder in the root with the firebase config file and the following exports:

    ```bash
      export const FIREBASE_APP = initializeApp(firebaseConfig)
      export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
      export const FIREBASE_DB = getFirestore(FIREBASE_APP)
      export const flashcardsRef = collection(FIREBASE_DB, 'flashcards')
      export const classesRef = collection(FIREBASE_DB, 'classes')
    ```

1. Install dependencies

    ```bash
    npm install
    ```

2. Start the app

    ```bash
     npx expo start
    ```

In the output, you'll find options to open the app in a

-   [development build](https://docs.expo.dev/develop/development-builds/introduction/)
-   [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
-   [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
-   [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Go play around
