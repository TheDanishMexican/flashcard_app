import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 16,
        paddingLeft: 16,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 20,
        color: 'white',
        textAlign: 'center',
    },
    buttonCtn: {
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    titleCnt: {
        marginBottom: 10,
    },
    listCnt: {
        marginTop: 10,
        flex: 1,
        marginBottom: 50,
    },
})

export default styles
