import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Pressable } from 'react-native';
import QRDisplayScreen from './QRDisplayScreen';

interface InvoiceScreenProps {
  amount: number;
  productName: string;
  merchantName: string;
  invoiceId: string;
  onBack: () => void;
}

export default function InvoiceScreen({ 
  amount, 
  productName, 
  merchantName, 
  invoiceId, 
  onBack,
}: InvoiceScreenProps) {
  const handleHeaderBack = () => {
    onBack();
  };

  return (
    <Box className="flex-1 bg-black">
      {/* Header */}
      <Box className="pt-16 px-6">
        <Box className="flex-row items-center">
          <Pressable onPress={handleHeaderBack} className="mr-4">
            <Text className="text-white text-2xl">←</Text>
          </Pressable>
          <Text className="text-2xl font-bold text-white">Payment QR</Text>
        </Box>
      </Box>

      {/* QR Code Display */}
      <QRDisplayScreen
        amount={amount}
        productName={productName}
        merchantName={merchantName}
        invoiceId={invoiceId}
      />
    </Box>
  );
} 