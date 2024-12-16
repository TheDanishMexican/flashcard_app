import Class from '@/interfaces/class'
import styles from '@/styles/flashCardFrontStyles'
import { useNavigation, useRouter } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

export default function FlashcardSetItem({ category }: { category: Class }) {
    const router = useRouter()
    return (
        <>
            <View>
                <Pressable
                    onPress={() =>
                        router.push({
                            pathname: '/(tabs)/flashcardpage/listRenderer',
                            params: { setName: category.name },
                        })
                    }
                    style={styles.card}
                >
                    <Text style={styles.questionText}>{category.name}</Text>
                </Pressable>
            </View>
        </>
    )
}
