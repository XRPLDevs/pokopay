import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ScrollView, Pressable } from 'react-native';

export default function SettingsScreen() {
  const settingsSections = [
    {
      title: 'Account',
      items: [
        { id: 'profile', label: 'Profile', value: 'Edit Profile' },
        { id: 'email', label: 'Email', value: 'user@example.com' },
        { id: 'phone', label: 'Phone', value: '+1 (555) 123-4567' },
      ]
    },
    {
      title: 'Payment',
      items: [
        { id: 'payment-methods', label: 'Payment Methods', value: 'Manage' },
        { id: 'bank-accounts', label: 'Bank Accounts', value: '2 accounts' },
        { id: 'cards', label: 'Cards', value: '3 cards' },
      ]
    },
    {
      title: 'Security',
      items: [
        { id: 'password', label: 'Password', value: 'Change' },
        { id: 'two-factor', label: 'Two-Factor Auth', value: 'Enabled' },
        { id: 'biometric', label: 'Biometric Login', value: 'Enabled' },
      ]
    },
    {
      title: 'Notifications',
      items: [
        { id: 'push-notifications', label: 'Push Notifications', value: 'On' },
        { id: 'email-notifications', label: 'Email Notifications', value: 'On' },
        { id: 'transaction-alerts', label: 'Transaction Alerts', value: 'On' },
      ]
    },
    {
      title: 'App',
      items: [
        { id: 'language', label: 'Language', value: 'English' },
        { id: 'currency', label: 'Currency', value: 'USD' },
        { id: 'theme', label: 'Theme', value: 'Dark' },
      ]
    }
  ];

  return (
    <Box className="flex-1 bg-black">
      <ScrollView className="flex-1 px-4 pt-12 pb-24">
        {/* Header */}
        <Box className="mb-8">
          <Text className="text-2xl font-bold text-white mb-2">
            Settings
          </Text>
          <Text className="text-gray-400">
            Manage your account and preferences
          </Text>
        </Box>

        {/* Settings Sections */}
        {settingsSections.map((section) => (
          <Box key={section.title} className="mb-6">
            <Text className="text-lg font-semibold text-white mb-4">
              {section.title}
            </Text>
            <Box className="space-y-1">
              {section.items.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => console.log(`Navigate to ${item.label}`)}
                  style={{ 
                    backgroundColor: '#1F2937', 
                    borderRadius: 8, 
                    padding: 16, 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Text className="text-white font-medium">{item.label}</Text>
                  <Box className="flex-row items-center">
                    <Text className="text-gray-400 mr-2">{item.value}</Text>
                    <Text className="text-gray-400">›</Text>
                  </Box>
                </Pressable>
              ))}
            </Box>
          </Box>
        ))}

        {/* Account Summary */}
        <Box className="mb-6">
          <Text className="text-lg font-semibold text-white mb-4">
            Account Summary
          </Text>
          <Box className="bg-gray-900 rounded-lg p-4">
            <Box className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-400">Account Type</Text>
              <Text className="text-white font-medium">Business</Text>
            </Box>
            <Box className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-400">Member Since</Text>
              <Text className="text-white">January 2024</Text>
            </Box>
            <Box className="flex-row justify-between items-center">
              <Text className="text-gray-400">Status</Text>
              <Text className="text-green-400 font-medium">Verified</Text>
            </Box>
          </Box>
        </Box>

        {/* Support */}
        <Box className="mb-6">
          <Text className="text-lg font-semibold text-white mb-4">
            Support
          </Text>
          <Box className="space-y-1">
            {[
              { id: 'help', label: 'Help Center', value: 'Get Help' },
              { id: 'contact', label: 'Contact Support', value: '24/7 Support' },
              { id: 'feedback', label: 'Send Feedback', value: 'Rate App' },
            ].map((item) => (
              <Pressable
                key={item.id}
                onPress={() => console.log(`Navigate to ${item.label}`)}
                style={{ 
                  backgroundColor: '#1F2937', 
                  borderRadius: 8, 
                  padding: 16, 
                  flexDirection: 'row', 
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Text className="text-white font-medium">{item.label}</Text>
                <Box className="flex-row items-center">
                  <Text className="text-gray-400 mr-2">{item.value}</Text>
                  <Text className="text-gray-400">›</Text>
                </Box>
              </Pressable>
            ))}
          </Box>
        </Box>

        {/* App Info */}
        <Box className="mb-6">
          <Text className="text-lg font-semibold text-white mb-4">
            App Information
          </Text>
          <Box className="bg-gray-900 rounded-lg p-4">
            <Box className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-400">Version</Text>
              <Text className="text-white">1.0.0</Text>
            </Box>
            <Box className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-400">Build</Text>
              <Text className="text-white">2024.01.15</Text>
            </Box>
            <Box className="flex-row justify-between items-center">
              <Text className="text-gray-400">Last Updated</Text>
              <Text className="text-white">2 days ago</Text>
            </Box>
          </Box>
        </Box>

        {/* Logout Button */}
        <Box className="mb-6">
          <Button
            className="bg-red-600 py-4"
            onPress={() => console.log('Logout')}
          >
            <Text className="text-white font-bold text-lg">Logout</Text>
          </Button>
        </Box>
      </ScrollView>
    </Box>
  );
} 