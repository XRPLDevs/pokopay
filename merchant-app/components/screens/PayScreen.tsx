import React, { useState } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { ScrollView, TextInput, Pressable, Modal, View } from 'react-native';

interface InvoiceData {
  amount: number;
  productName: string;
  merchantName: string;
  invoiceId: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface PayScreenProps {
  onGenerateInvoice: (data: InvoiceData) => void;
}

const REGISTERED_PRODUCTS: Product[] = [
  { id: 1, name: 'Coffee', price: 5.50, category: 'Beverages' },
  { id: 2, name: 'Sandwich', price: 12.00, category: 'Food' },
  { id: 3, name: 'Pizza', price: 18.00, category: 'Food' },
  { id: 4, name: 'Burger', price: 15.00, category: 'Food' },
  { id: 5, name: 'Salad', price: 8.50, category: 'Food' },
  { id: 6, name: 'Soda', price: 3.00, category: 'Beverages' },
  { id: 7, name: 'Cake', price: 6.50, category: 'Desserts' },
  { id: 8, name: 'Ice Cream', price: 4.00, category: 'Desserts' },
];

const ProductItem = ({ product, isSelected, onSelect }: { 
  product: Product; 
  isSelected: boolean; 
  onSelect: () => void; 
}) => (
  <Pressable
    onPress={onSelect}
    className={`p-4 border-b border-gray-700 ${isSelected ? 'bg-blue-600' : ''}`}
  >
    <Box className="flex-row justify-between items-center">
      <Box>
        <Text className="font-semibold text-lg text-white">{product.name}</Text>
        <Text className="text-gray-400 text-sm">{product.category}</Text>
      </Box>
      <Text className="font-bold text-lg text-white">${product.price.toFixed(2)}</Text>
    </Box>
  </Pressable>
);

const AmountInput = ({ amount, setAmount }: { amount: string; setAmount: (value: string) => void }) => (
  <Box className="bg-gray-900 rounded-2xl p-4 mb-8">
    <Text className="text-gray-400 text-sm mb-2 font-medium">Amount</Text>
    <Box className="flex-row items-center">
      <Text className="text-2xl font-bold text-white mr-3">$</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="0.00"
        placeholderTextColor="#9CA3AF"
        style={{ flex: 1, fontSize: 24, fontWeight: 'bold', color: 'white' }}
        keyboardType="numeric"
      />
    </Box>
  </Box>
);

const ProductSelector = ({ 
  selectedProduct, 
  setSelectedProduct, 
  showDropdown, 
  setShowDropdown 
}: {
  selectedProduct: string;
  setSelectedProduct: (value: string) => void;
  showDropdown: boolean;
  setShowDropdown: (value: boolean) => void;
}) => {
  const selectedProductData = REGISTERED_PRODUCTS.find(p => p.id.toString() === selectedProduct);

  return (
    <Box className="mb-8">
      <Text className="text-gray-400 text-sm mb-4 font-medium">Select Product</Text>
      <Pressable
        onPress={() => setShowDropdown(true)}
        className="bg-gray-900 rounded-xl p-4 border border-gray-700"
      >
        <Box className="flex-row justify-between items-center">
          <Text className={`text-lg ${selectedProduct ? 'text-white font-semibold' : 'text-gray-400'}`}>
            {selectedProduct ? selectedProductData?.name : 'Choose a product...'}
          </Text>
          <Text className="text-gray-400 text-lg">▼</Text>
        </Box>
      </Pressable>

      {selectedProduct && (
        <Box className="mt-4 p-4 bg-blue-600 rounded-xl">
          <Box className="flex-row justify-between items-center">
            <Box>
              <Text className="text-white font-semibold text-lg">{selectedProductData?.name}</Text>
              <Text className="text-blue-200 text-sm">{selectedProductData?.category}</Text>
            </Box>
            <Text className="text-white font-bold text-xl">${selectedProductData?.price.toFixed(2)}</Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default function PayScreen({ onGenerateInvoice }: PayScreenProps) {
  const [amount, setAmount] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  const generateInvoice = () => {
    if (!amount && !selectedProduct) {
      console.warn('Amount or product selection is required');
      return;
    }
    
    const selectedProductData = REGISTERED_PRODUCTS.find(p => p.id.toString() === selectedProduct);
    const paymentAmount = amount ? parseFloat(amount) : selectedProductData?.price || 0;
    
    if (paymentAmount <= 0) {
      console.warn('Invalid payment amount');
      return;
    }
    
    onGenerateInvoice({
      amount: paymentAmount,
      productName: selectedProductData?.name || '',
      merchantName: 'PokoPay Merchant',
      invoiceId: `INV${Date.now()}`
    });
  };

  const selectProduct = (product: Product) => {
    setSelectedProduct(product.id.toString());
    setShowProductDropdown(false);
  };

  const isFormValid = amount || selectedProduct;

  return (
    <Box className="flex-1 bg-black">
      <ScrollView className="flex-1 px-6 pt-16 pb-24">
        {/* Header */}
        <Box className="mb-10">
          <Text className="text-3xl font-bold text-white mb-3">Create Invoice</Text>
          <Text className="text-gray-400 text-lg">Generate a payment request for customers</Text>
        </Box>

        <AmountInput amount={amount} setAmount={setAmount} />
        
        <ProductSelector
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          showDropdown={showProductDropdown}
          setShowDropdown={setShowProductDropdown}
        />

        {/* Generate Invoice Button */}
        <Pressable
          onPress={generateInvoice}
          disabled={!isFormValid}
          className={`py-5 rounded-2xl items-center justify-center ${
            isFormValid ? 'bg-blue-600' : 'bg-gray-600'
          }`}
          style={{ opacity: isFormValid ? 1 : 0.5 }}
        >
          <Text className="text-white font-bold text-xl">Generate Invoice</Text>
        </Pressable>
      </ScrollView>

      {/* Product Selection Modal */}
      <Modal
        visible={showProductDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowProductDropdown(false)}
      >
        <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
          <View className="bg-gray-900 rounded-2xl mx-6 w-full max-w-sm">
            {/* Modal Header */}
            <Box className="flex-row justify-between items-center p-6 border-b border-gray-700">
              <Text className="text-white font-bold text-xl">Select Product</Text>
              <Pressable onPress={() => setShowProductDropdown(false)}>
                <Text className="text-gray-400 text-2xl">×</Text>
              </Pressable>
            </Box>
            
            {/* Product List */}
            <ScrollView className="max-h-80">
              {REGISTERED_PRODUCTS.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  isSelected={selectedProduct === product.id.toString()}
                  onSelect={() => selectProduct(product)}
                />
              ))}
            </ScrollView>
            
            {/* Modal Footer */}
            <Box className="p-4 border-t border-gray-700">
              <Pressable
                className="bg-gray-700 py-4 rounded-xl items-center justify-center"
                onPress={() => setShowProductDropdown(false)}
              >
                <Text className="text-white font-semibold">Cancel</Text>
              </Pressable>
            </Box>
          </View>
        </View>
      </Modal>
    </Box>
  );
}
