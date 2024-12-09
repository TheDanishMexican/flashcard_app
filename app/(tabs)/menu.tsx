import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../../context/authContext'

export default function Menu() {
    const { logout } = useAuth()

    return (
        <View style={styles.menu}>
            <Text>Menu</Text>
            <Button onPress={logout} title="Log out" />
        </View>
    )
}

const styles = StyleSheet.create({
    menu: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f3f3',
        borderRadius: 8,
        paddingHorizontal: 14,
        marginTop: 100,
    },
})
