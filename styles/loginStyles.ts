import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        width: '100%',
        borderRadius: 4,
        backgroundColor: '#fff',
    },
    logo: {
        width: 300,
        height: 300,
        borderRadius: 350,
        marginTop: 100,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonCtn: {
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
})

export default styles
