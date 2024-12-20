import { useFlashCardPage } from '@/hooks/useFlashCardPage'
import React from 'react'
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import styles from '@/styles/listStyles'
import Class from '@/interfaces/class'
import FlashcardSetItem from '@/components/flashcardSetItem'
import { useRouter } from 'expo-router'
import CollectionForm from '@/components/collectionForm'

export default function setListRenderer() {
    const {
        formClasses,
        loading,
        showForm,
        toggleForm,
        postNewClassForFlashcard,
        deleteCollection,
    } = useFlashCardPage()

    const router = useRouter()
    return (
        <>
            <SafeAreaView style={styles.container}>
                {showForm && (
                    <CollectionForm
                        classes={formClasses}
                        toggleForm={toggleForm}
                        postNewCollection={postNewClassForFlashcard}
                    />
                )}
                {loading ? (
                    <ActivityIndicator />
                ) : (
                    <>
                        <View style={styles.buttonCtn}>
                            <View>
                                <Pressable onPress={toggleForm}>
                                    <Text style={styles.button}>
                                        Create new collection
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.titleCnt}>
                            <Text style={styles.title}>
                                Click collection to study
                            </Text>
                        </View>
                        {!formClasses.length && (
                            <Text style={{ color: 'red' }}>
                                No collections yet, create one by clicking
                                "create new collection"
                            </Text>
                        )}
                        <View style={styles.listCnt}>
                            <FlatList
                                data={formClasses}
                                keyExtractor={(category: Class) => category.id}
                                renderItem={({ item }: { item: Class }) => (
                                    <FlashcardSetItem
                                        category={item}
                                        deleteCollection={deleteCollection}
                                    />
                                )}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                numColumns={2}
                            />
                        </View>
                    </>
                )}
            </SafeAreaView>
        </>
    )
}
