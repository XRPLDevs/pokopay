import React, { useState, useEffect } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import QRCode from 'react-native-qrcode-svg';

interface QRDisplayScreenProps {
  amount: number;
  productName?: string;
  merchantName: string;
  invoiceId: string;
}

interface PaymentData {
  amount: number;
  productName: string;
  merchantName: string;
  invoiceId: string;
  timestamp: string;
}

const QRCodeDisplay = ({ qrData }: { qrData: string }) => (
  <Box className="w-64 h-64 bg-white rounded-2xl items-center justify-center mb-8 shadow-lg">
    <Box className="w-48 h-48 bg-black rounded-lg items-center justify-center">
      <QRCode value="test" size={200} />
    </Box>
  </Box>
);

const PaymentDetails = ({ amount, productName, invoiceId }: { 
  amount: number; 
  productName?: string; 
  invoiceId: string; 
}) => (
  <Box className="w-full bg-gray-800 rounded-2xl p-6 mb-6">
    <Box className="flex-row justify-between items-center mb-3">
      <Text className="text-gray-400 text-sm">Amount:</Text>
      <Text className="text-white font-bold text-xl">${amount.toFixed(2)}</Text>
    </Box>
    
    {productName && (
      <Box className="flex-row justify-between items-center mb-3">
        <Text className="text-gray-400 text-sm">Product:</Text>
        <Text className="text-white font-medium">{productName}</Text>
      </Box>
    )}
    
    <Box className="flex-row justify-between items-center">
      <Text className="text-gray-400 text-sm">Invoice ID:</Text>
      <Text className="text-gray-400 text-xs">{invoiceId}</Text>
    </Box>
  </Box>
);

export default function QRDisplayScreen({ 
  amount, 
  productName, 
  merchantName, 
  invoiceId 
}: QRDisplayScreenProps) {
  const [qrCodeData, setQrCodeData] = useState('');

  useEffect(() => {
    const paymentData: PaymentData = {
      amount,
      productName: productName || '',
      merchantName,
      invoiceId,
      timestamp: new Date().toISOString()
    };
    
    setQrCodeData(JSON.stringify(paymentData));
  }, [amount, productName, merchantName, invoiceId]);

  return (
    <Box className="flex-1 px-6 items-center justify-center">
      {/* QR Code */}
      {qrCodeData && <QRCodeDisplay qrData={qrCodeData} />}
      
      {/* Merchant Info */}
      <Box className="w-full mb-6">
        <Text className="text-white font-bold text-xl text-center mb-2">
          {merchantName}
        </Text>
        <Text className="text-gray-400 text-center text-sm">
          Scan QR code to complete payment
        </Text>
      </Box>

      {/* Payment Details */}
      <PaymentDetails amount={amount} productName={productName} invoiceId={invoiceId} />

      {/* Instructions */}
      <Box className="w-full">
        <Text className="text-gray-400 text-center text-sm leading-5">
          Customer should scan this QR code{'\n'}
          with their payment app to complete{'\n'}
          the transaction
        </Text>
      </Box>
    </Box>
  );
} 