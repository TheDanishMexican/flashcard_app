import { useFlashCardPage } from '@/hooks/useFlashCardPage'
import React from 'react'
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    SafeAreaView,
    Text,
    View,
} from 'react-native'
import styles from '@/styles/listStyles'
import Class from '@/interfaces/class'
import FlashcardSetItem from '@/components/flashcardSetItem'
import { useRouter } from 'expo-router'

export default function setListRenderer() {
    const { formClasses, loading } = useFlashCardPage()
    const router = useRouter()
    return (
        <>
            <SafeAreaView style={styles.container}>
                {loading ? (
                    <ActivityIndicator />
                ) : (
                    <>
                        <View style={styles.buttonCtn}>
                            <View>
                                <Pressable onPress={() => router.back()}>
                                    <Text style={styles.button}>Go back</Text>
                                </Pressable>
                            </View>
                            <View>
                                <Pressable>
                                    <Text style={styles.button}>
                                        Add collection
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.titleCnt}>
                            <Text style={styles.title}>
                                Click collection to study
                            </Text>
                        </View>
                        <View style={styles.listCnt}>
                            <FlatList
                                data={formClasses}
                                keyExtractor={(category: Class) => category.id}
                                renderItem={({ item }: { item: Class }) => (
                                    <FlashcardSetItem category={item} />
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
