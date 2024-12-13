import { useAuth } from '@/context/authContext'
import { Tabs, useRouter } from 'expo-router'
import { Platform } from 'react-native'

export default function TabLayout() {
    const { user } = useAuth()
    const router = useRouter()

    return (
        <>
            {user && (
                <Tabs
                    screenOptions={{
                        headerShown: false,
                        tabBarStyle: Platform.select({
                            ios: {
                                // Use a transparent background on iOS to show the blur effect
                                position: 'absolute',
                            },
                            default: {},
                        }),
                    }}
                >
                    <Tabs.Screen
                        name="menu"
                        options={{
                            title: 'Menu',
                            headerShown: false,
                        }}
                    />
                    <Tabs.Screen
                        name="flashcardpage"
                        options={{
                            title: 'Flashcard Page',
                            headerShown: false,
                        }}
                    />
                </Tabs>
            )}
        </>
    )
}
