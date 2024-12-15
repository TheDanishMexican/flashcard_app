import { Text, View } from 'react-native'

export default function SuccessMessage() {
    return (
        <>
            <View style={{ backgroundColor: 'green', padding: 10 }}>
                <Text style={{ color: 'white' }}>
                    Added flashcard succesfully
                </Text>
            </View>
        </>
    )
}
