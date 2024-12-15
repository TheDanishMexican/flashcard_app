import { Button, Pressable, Text, View } from 'react-native'
import { useAuth } from '../../context/authContext'
import styles from '@/styles/menuStyles'

export default function Menu() {
    const { logout } = useAuth()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Menu</Text>
            <View style={styles.buttonCtn}>
                <Pressable onPress={logout}>
                    <Text style={styles.button}>Log out</Text>
                </Pressable>
            </View>
        </View>
    )
}
