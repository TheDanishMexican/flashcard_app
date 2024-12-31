import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
        color: 'white',
        textAlign: 'center',
    },
    buttonCtn: {
        width: '100%',
    },
    logo: {
        width: 300,
        height: 300,
        borderRadius: 350,
        marginTop: 60,
    },
})

export default styles
