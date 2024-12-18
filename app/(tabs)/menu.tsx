import { Button, Pressable, Text, View } from 'react-native'
import { useAuth } from '../../context/authContext'
import styles from '@/styles/menuStyles'

export default function Menu() {
    const { logout, user } = useAuth()

    return (
        <View style={styles.container}>
            <View
                style={{
                    marginBottom: 10,
                    marginLeft: 10,
                    marginRight: 10,
                    alignContent: 'center',
                }}
            >
                <Text style={styles.title}>Hello {user!.displayName}!</Text>
                <Text>Welcome back to your flashcard app.</Text>
                <Text>
                    Navigate to the flashcards page by clicking on the
                    "flashcard" icon at the bottom of the page.
                </Text>
            </View>
            <View style={styles.buttonCtn}>
                <Pressable onPress={logout}>
                    <Text style={styles.button}>Log out</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.button}>User information</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.button}>Settings</Text>
                </Pressable>
            </View>
        </View>
    )
}
