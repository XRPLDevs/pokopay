import React, { useState } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ScrollView } from 'react-native';
import { 
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarDaysIcon
} from '@/components/ui/icon';

export default function HistoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'income', label: 'Income' },
    { id: 'expense', label: 'Expense' },
    { id: 'pending', label: 'Pending' },
  ];

  const transactions = [
    {
      id: 1,
      name: 'Coffee Shop',
      amount: '-¥450',
      type: 'expense',
      status: 'completed',
      date: '2024-01-15',
      time: '14:30',
      category: 'Food & Drink'
    },
    {
      id: 2,
      name: 'Salary Payment',
      amount: '+¥85,000',
      type: 'income',
      status: 'completed',
      date: '2024-01-14',
      time: '09:00',
      category: 'Salary'
    },
    {
      id: 3,
      name: 'Grocery Store',
      amount: '-¥2,300',
      type: 'expense',
      status: 'completed',
      date: '2024-01-13',
      time: '16:45',
      category: 'Shopping'
    },
    {
      id: 4,
      name: 'John Doe',
      amount: '+¥5,000',
      type: 'income',
      status: 'pending',
      date: '2024-01-12',
      time: '11:20',
      category: 'Transfer'
    },
    {
      id: 5,
      name: 'Gas Station',
      amount: '-¥3,500',
      type: 'expense',
      status: 'completed',
      date: '2024-01-11',
      time: '13:15',
      category: 'Transport'
    },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'income') return transaction.type === 'income';
    if (selectedFilter === 'expense') return transaction.type === 'expense';
    if (selectedFilter === 'pending') return transaction.status === 'pending';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'pending':
        return 'text-yellow-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Food & Drink':
        return '🍔';
      case 'Salary':
        return '💰';
      case 'Shopping':
        return '🛒';
      case 'Transfer':
        return '💸';
      case 'Transport':
        return '🚗';
      default:
        return '📊';
    }
  };

  return (
    <Box className="flex-1 bg-black">
      <ScrollView className="flex-1 px-4 pt-12 pb-24">
        {/* Header */}
        <Box className="mb-8">
          <Text className="text-2xl font-bold text-white mb-2">
            Transaction History
          </Text>
          <Text className="text-gray-400">
            View all your transactions and payments
          </Text>
        </Box>

        {/* Summary Cards */}
        <Box className="mb-6">
          <Box className="flex-row justify-between mb-4">
            <Box className="bg-gray-900 rounded-lg p-4 flex-1 mr-2">
              <Text className="text-gray-400 text-sm">This Month</Text>
              <Text className="text-green-400 font-bold text-lg">+¥125,000</Text>
            </Box>
            <Box className="bg-gray-900 rounded-lg p-4 flex-1 ml-2">
              <Text className="text-gray-400 text-sm">Total Spent</Text>
              <Text className="text-red-400 font-bold text-lg">-¥45,200</Text>
            </Box>
          </Box>
        </Box>

        {/* Filter Buttons */}
        <Box className="mb-6">
          <Text className="text-gray-400 text-sm mb-3">Filter by</Text>
          <Box className="flex-row flex-wrap">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                className={`mr-2 mb-2 px-4 py-2 ${
                  selectedFilter === filter.id 
                    ? 'bg-blue-600' 
                    : 'bg-gray-800'
                }`}
                onPress={() => setSelectedFilter(filter.id)}
              >
                <Text className="text-white">{filter.label}</Text>
              </Button>
            ))}
          </Box>
        </Box>

        {/* Transactions List */}
        <Box className="mb-6">
          <Box className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-white">
              Transactions
            </Text>
            <Button
              className="bg-gray-800 px-3 py-2"
              onPress={() => console.log('Export')}
            >
              <Text className="text-white text-sm">Export</Text>
            </Button>
          </Box>
          
          <Box className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <Box key={transaction.id} className="bg-gray-900 rounded-lg p-4">
                <Box className="flex-row items-center justify-between mb-2">
                  <Box className="flex-row items-center">
                    <Box className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                      transaction.type === 'income' ? 'bg-green-600' : 'bg-red-600'
                    }`}>
                      <Text className="text-white text-lg">
                        {getCategoryIcon(transaction.category)}
                      </Text>
                    </Box>
                    <Box>
                      <Text className="text-white font-medium">{transaction.name}</Text>
                      <Text className="text-gray-400 text-sm">{transaction.category}</Text>
                    </Box>
                  </Box>
                  <Box className="items-end">
                    <Text className={`font-semibold ${
                      transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.amount}
                    </Text>
                    <Text className={`text-xs ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </Text>
                  </Box>
                </Box>
                
                <Box className="flex-row items-center justify-between">
                  <Box className="flex-row items-center">
                    <CalendarDaysIcon className="text-gray-400 mr-1" />
                    <Text className="text-gray-400 text-sm">
                      {transaction.date} at {transaction.time}
                    </Text>
                  </Box>
                  <Button
                    className="bg-gray-800 px-3 py-1"
                    onPress={() => console.log(`View details for ${transaction.name}`)}
                  >
                    <Text className="text-white text-xs">Details</Text>
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Monthly Summary */}
        <Box className="mb-6">
          <Text className="text-lg font-semibold text-white mb-4">
            Monthly Summary
          </Text>
          <Box className="bg-gray-900 rounded-lg p-4">
            <Box className="flex-row justify-between mb-3">
              <Text className="text-gray-400">January 2024</Text>
              <Text className="text-white font-semibold">¥79,800</Text>
            </Box>
            <Box className="space-y-2">
              <Box className="flex-row justify-between">
                <Text className="text-gray-400">Income</Text>
                <Text className="text-green-400">+¥125,000</Text>
              </Box>
              <Box className="flex-row justify-between">
                <Text className="text-gray-400">Expenses</Text>
                <Text className="text-red-400">-¥45,200</Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
} 