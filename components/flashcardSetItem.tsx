import React from 'react'
import { Pressable, Text, View, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useModal } from '@/hooks/useModal'
import DynamicModal from './dynamicModal'
import flashcardSetItemProps from '@/interfaces/flashcardSetItemProps'

export default function FlashcardSetItem({
    category,
    deleteCollection,
}: flashcardSetItemProps) {
    const router = useRouter()
    const { toggleModal, modalVisible, modalText } = useModal()

    return (
        <View style={styles.container}>
            {modalVisible && (
                <DynamicModal
                    toggleModal={toggleModal}
                    modalText={modalText}
                    deleteCollection={deleteCollection}
                />
            )}
            <Pressable
                onPress={() =>
                    router.push({
                        pathname: '/(tabs)/flashcardpage/listRenderer',
                        params: { setName: category.name },
                    })
                }
                style={styles.card}
            >
                <Text style={styles.text}>{category.name}</Text>
            </Pressable>
            <Pressable
                style={styles.deleteButton}
                onPress={() => toggleModal(category.name)}
            >
                <Text style={styles.deleteButtonText}>X</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        position: 'relative',
    },
    card: {
        padding: 10,
        backgroundColor: '#87cefa',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        width: 150,
        height: 75,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingLeft: 2,
        paddingRight: 2,
        color: 'white',
    },
    deleteButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
})
