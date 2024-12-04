import { Button, StyleSheet, Text, View } from 'react-native'
import { FIREBASE_AUTH } from '@/firebase/firebase'

export default function Menu() {
    return (
        <View style={styles.menu}>
            <Text>Menu</Text>
            <Button
                onPress={() => {
                    console.log('pressed')
                    FIREBASE_AUTH.signOut()
                }}
                title="Log out"
            />
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
