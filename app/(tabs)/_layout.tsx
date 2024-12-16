import React from 'react'
import { useAuth } from '@/context/authContext'
import { Tabs, useRouter } from 'expo-router'
import { Platform } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

export default function TabLayout() {
    const { user } = useAuth()

    return (
        <>
            {user && (
                <Tabs
                    screenOptions={{
                        headerShown: false,
                        tabBarStyle: Platform.select({
                            ios: {
                                position: 'absolute',
                            },
                            default: {},
                        }),
                    }}
                >
                    <Tabs.Screen
                        name="menu"
                        options={{
                            title: '',
                            headerShown: true,
                            tabBarLabel: 'Menu',
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome
                                    size={28}
                                    name="home"
                                    color={color}
                                />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="flashcardpage"
                        options={{
                            headerTransparent: false,
                            title: '',
                            headerShown: true,
                            tabBarLabel: 'Flashcards',
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome
                                    name="file-o"
                                    size={22}
                                    color={color}
                                />
                            ),
                        }}
                    />
                </Tabs>
            )}
        </>
    )
}
