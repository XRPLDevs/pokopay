import React, { useState } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@/contexts/NavigationContext';

interface SettingsItem {
  id: string;
  label: string;
  value: string;
  isModeSelector?: boolean;
}

interface SettingsSection {
  title: string;
  items: SettingsItem[];
}

const SETTINGS_DATA: SettingsSection[] = [
  {
    title: 'Account',
    items: [
      { id: 'profile', label: 'Profile', value: 'Edit Profile' },
      { id: 'email', label: 'Email', value: 'user@example.com' },
      { id: 'phone', label: 'Phone', value: '+1 (555) 123-4567' },
    ]
  },
  {
    title: 'Mode',
    items: [
      { id: 'mode', label: 'Business Mode', value: '', isModeSelector: true },
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

const APP_INFO = [
  { label: 'Version', value: '1.0.0' },
  { label: 'Build', value: '2024.01.15' },
  { label: 'Last Updated', value: '2 days ago' }
];

const SettingsItem = ({ item, selectedMode, onPress }: { 
  item: SettingsItem; 
  selectedMode: string; 
  onPress: () => void; 
}) => (
  <Pressable
    onPress={onPress}
    className="bg-gray-800 rounded-lg p-4 flex-row items-center justify-between"
  >
    <Text className="text-white font-medium">{item.label}</Text>
    <Box className="flex-row items-center">
      <Text className={`mr-2 ${selectedMode === 'payment' ? 'text-blue-400' : 'text-green-400'}`}>
        {item.isModeSelector 
          ? (selectedMode === 'payment' ? 'Payment Mode' : 'Invoice Mode')
          : item.value
        }
      </Text>
      <Text className="text-gray-400">›</Text>
    </Box>
  </Pressable>
);

const InfoCard = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <Box className="bg-gray-900 rounded-lg p-4">
    {title && <Text className="text-white font-medium mb-2">{title}</Text>}
    {children}
  </Box>
);

export default function SettingsScreen() {
  const { businessMode, setBusinessMode } = useNavigation();
  const [selectedMode, setSelectedMode] = useState(businessMode);

  const handleModeToggle = () => {
    const newMode = selectedMode === 'payment' ? 'invoice' : 'payment';
    setSelectedMode(newMode);
    setBusinessMode(newMode);
  };

  const handleItemPress = (item: SettingsItem) => {
    if (item.isModeSelector) {
      handleModeToggle();
    } else {
      console.log(`Navigate to ${item.label}`);
    }
  };

  return (
    <Box className="flex-1 bg-black">
      <ScrollView className="flex-1 px-4 pt-12 pb-24">
        {/* Header */}
        <Box className="mb-8">
          <Text className="text-2xl font-bold text-white mb-2">Settings</Text>
          <Text className="text-gray-400">Manage your account and preferences</Text>
        </Box>

        {/* Settings Sections */}
        {SETTINGS_DATA.map((section) => (
          <Box key={section.title} className="mb-6">
            <Text className="text-lg font-semibold text-white mb-4">{section.title}</Text>
            <Box className="space-y-1">
              {section.items.map((item) => (
                <SettingsItem
                  key={item.id}
                  item={item}
                  selectedMode={selectedMode}
                  onPress={() => handleItemPress(item)}
                />
              ))}
            </Box>
          </Box>
        ))}

        {/* Mode Description */}
        <Box className="mb-6">
          <InfoCard title={selectedMode === 'payment' ? 'Payment Mode' : 'Invoice Mode'}>
            <Text className="text-gray-400 text-sm">
              {selectedMode === 'payment' 
                ? 'Accept payments from customers using QR codes and payment links.'
                : 'Generate invoices and send them to customers for payment collection.'
              }
            </Text>
          </InfoCard>
        </Box>

        {/* App Info */}
        <Box className="mb-6">
          <Text className="text-lg font-semibold text-white mb-4">App Information</Text>
          <InfoCard>
            {APP_INFO.map((info, index) => (
              <Box key={info.label} className={`flex-row justify-between items-center ${index < APP_INFO.length - 1 ? 'mb-3' : ''}`}>
                <Text className="text-gray-400">{info.label}</Text>
                <Text className="text-white">{info.value}</Text>
              </Box>
            ))}
          </InfoCard>
        </Box>

        {/* Logout Button */}
        <Button className="bg-red-600 py-4 mb-6" onPress={() => console.log('Logout')}>
          <Text className="text-white font-bold text-lg">Logout</Text>
        </Button>
      </ScrollView>
    </Box>
  );
} 