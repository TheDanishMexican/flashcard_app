import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    card: {
        marginBottom: 100,
        width: 300,
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    answerText: {
        fontSize: 18,
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#555',
        lineHeight: 28,
        maxWidth: '100%',
        maxHeight: '100%',
        padding: 10,
    },
})

export default styles
