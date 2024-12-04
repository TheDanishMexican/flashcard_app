import { Tabs } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'

export default function TabLayout() {
    return (
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
                }}
            />
            <Tabs.Screen
                name="flashCardPage"
                options={{
                    title: 'Flashcard Page',
                }}
            />
        </Tabs>
    )
}
