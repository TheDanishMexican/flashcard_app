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
        width: '90%',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 20,
        color: 'white',
        margin: 'auto',
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
        alignItems: 'center',
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        width: '90%',
        marginBottom: 10,
        marginTop: 20,
        margin: 'auto',
    },
    correctAnswerBtn: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        width: '90%',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 20,
        color: 'white',
        margin: 'auto',
        textAlign: 'center',
    },
    explanation: {
        margin: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    line: {
        borderWidth: 2,
        color: 'black',
        marginRight: 30,
        marginLeft: 30,
        backgroundColor: 'black',
    },
})

export default styles
