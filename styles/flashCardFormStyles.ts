import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 5,
        width: '100%',
    },
    pickerContainer: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 5,
        justifyContent: 'center',
    },
    picker: {
        height: 100,
        width: '100%',
    },
})

export default styles
