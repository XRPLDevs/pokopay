import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Pressable } from 'react-native';

interface FooterMenuItem {
  id: string;
  label: string;
  route: string;
}

interface FooterMenuProps {
  activeTab?: string;
  onTabPress?: (tabId: string) => void;
}

const menuItems: FooterMenuItem[] = [
  {
    id: 'history',
    label: 'History',
    route: '/history'
  },
  {
    id: 'pay',
    label: 'Pay',
    route: '/pay'
  },
  {
    id: 'settings',
    label: 'Settings',
    route: '/settings'
  }
];

export default function FooterMenu({ activeTab = 'home', onTabPress }: FooterMenuProps) {
  return (
    <Box className="absolute bottom-0 left-0 right-0 bg-black border-t border-gray-800 px-4 py-4">
      <Box className="flex-row justify-around items-center">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          
          return (
            <Pressable
              key={item.id}
              onPress={() => onTabPress?.(item.id)}
              className={`flex-1 items-center py-3 rounded-lg ${
                isActive ? 'bg-gray-900' : ''
              }`}
            >
              <Text 
                className={`text-sm font-medium ${
                  isActive 
                    ? 'text-blue-400' 
                    : 'text-gray-400'
                }`}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </Box>
    </Box>
  );
} 