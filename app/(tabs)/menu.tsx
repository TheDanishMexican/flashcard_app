import { StyleSheet, Text, View } from 'react-native'

export default function Menu() {
    return (
        <View style={styles.menu}>
            <Text>Menu</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    menu: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f3f3',
        borderRadius: 8,
        paddingHorizontal: 14,
        marginTop: 100,
    },
})
