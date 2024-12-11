import { Button, Text, View } from 'react-native'
import { useAuth } from '../../context/authContext'
import styles from '@/styles/menuStyles'

export default function Menu() {
    const { logout } = useAuth()

    return (
        <View style={styles.menu}>
            <Text>Menu</Text>
            <Button onPress={logout} title="Log out" />
        </View>
    )
}
