import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Icon } from '@/components/ui/icon';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from '@/contexts/NavigationContext';

interface BottomNavigationItem {
  id: string;
  label: string;
  iconName: keyof typeof FontAwesome.glyphMap;
}

interface BottomNavigationProps {
  activeTab?: string;
  onTabPress?: (tabId: string) => void;
  show?: boolean;
}

export default function BottomNavigation({ 
  activeTab = 'home', 
  onTabPress,
  show = true 
}: BottomNavigationProps) {
  const { businessMode } = useNavigation();

  const navigationItems: BottomNavigationItem[] = [
    {
      id: 'home',
      label: 'Home',
      iconName: 'home'
    },
    {
      id: 'pay',
      label: businessMode === 'payment' ? 'Pay' : 'Invoice',
      iconName: businessMode === 'payment' ? 'credit-card' : 'file-text-o'
    },
    {
      id: 'settings',
      label: 'Settings',
      iconName: 'cog'
    }
  ];

  if (!show) return null;

  return (
    <Box className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
      <HStack className="justify-around items-center py-2">
        {navigationItems.map((item) => {
          const isActive = activeTab === item.id;
          
          return (
            <Pressable
              key={item.id}
              onPress={() => onTabPress?.(item.id)}
              className={`flex-1 items-center py-3 rounded-lg mx-1 ${
                isActive ? 'bg-gray-800' : ''
              }`}
            >
              <VStack className="items-center space-y-1">
                <FontAwesome
                  name={item.iconName}
                  size={20}
                  color={isActive ? '#60A5FA' : '#9CA3AF'}
                />
                <Text 
                  className={`text-xs font-medium ${
                    isActive 
                      ? 'text-blue-400' 
                      : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </Text>
              </VStack>
            </Pressable>
          );
        })}
      </HStack>
    </Box>
  );
} 