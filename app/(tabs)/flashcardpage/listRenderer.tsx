import React, { useCallback, useEffect } from 'react'
import FlashCardFront from '@/components/flashCardFront'
import { useFlashCardPage } from '@/hooks/useFlashCardPage'
import FlashCard from '@/interfaces/flashCard'
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    Text,
    View,
} from 'react-native'
import styles from '@/styles/listStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useRootNavigationState, useRouter } from 'expo-router'

export default function listRenderer() {
    const { flashCards, fetchFlashCards, loading } = useFlashCardPage()

    return (
        <>
            <SafeAreaView style={styles.container}>
                {loading ? (
                    <ActivityIndicator />
                ) : (
                    <>
                        <View style={styles.titleCnt}>
                            <Text style={styles.title}>Flash cards</Text>
                        </View>
                        <View style={styles.buttonCtn}>
                            <View>
                                <Pressable>
                                    <Text style={styles.button}>Filter by</Text>
                                </Pressable>
                            </View>
                            <View>
                                <Pressable>
                                    <Text style={styles.button}>
                                        Select class/subject to filter by
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.listCnt}>
                            <FlatList
                                data={flashCards}
                                keyExtractor={(item: FlashCard) => item.id}
                                renderItem={({ item }) => (
                                    <FlashCardFront flashcard={item} />
                                )}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </>
                )}
            </SafeAreaView>
        </>
    )
}
