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
    },
    questionText: {
        fontSize: 22, // Larger text for visibility
        fontWeight: 'bold', // Bold for emphasis
        textAlign: 'center', // Center the text
        color: '#333', // Dark gray for contrast
        lineHeight: 28, // Space between lines for readability
        maxWidth: 250,
    },
})

export default styles
