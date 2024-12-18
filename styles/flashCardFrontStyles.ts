import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
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
        padding: 10,
        position: 'relative', // Ensure the card has relative positioning
    },
    questionText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        lineHeight: 28,
        maxWidth: '100%',
        maxHeight: '100%',
        padding: 10,
    },
    flipButton: {
        backgroundColor: '#87cefa',
        padding: 5,
        borderRadius: 10,
        marginTop: 10,
    },
    flipButtonText: {
        color: 'white',
    },
    deleteButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
})

export default styles
