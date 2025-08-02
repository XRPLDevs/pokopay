import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import FooterMenu from "@/components/FooterMenu";
import PayScreen from "@/components/screens/PayScreen";
import HistoryScreen from "@/components/screens/HistoryScreen";
import SettingsScreen from "@/components/screens/SettingsScreen";
import InvoiceScreen from "@/components/screens/InvoiceScreen";

interface InvoiceData {
  amount: number;
  productName: string;
  merchantName: string;
  invoiceId: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('pay');
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    console.log(`Navigating to: ${tabId}`);
  };

  const handleGenerateInvoice = (data: InvoiceData) => {
    setInvoiceData(data);
    setActiveTab('invoice');
  };

  const handleBackFromInvoice = () => {
    setInvoiceData(null);
    setActiveTab('pay');
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'history':
        return <HistoryScreen />;
      case 'pay':
        return <PayScreen onGenerateInvoice={handleGenerateInvoice} />;
      case 'settings':
        return <SettingsScreen />;
      case 'invoice':
        if (!invoiceData) {
          setActiveTab('pay');
          return <PayScreen onGenerateInvoice={handleGenerateInvoice} />;
        }
        return (
          <InvoiceScreen
            amount={invoiceData.amount}
            productName={invoiceData.productName}
            merchantName={invoiceData.merchantName}
            invoiceId={invoiceData.invoiceId}
            onBack={handleBackFromInvoice}
          />
        );
      default:
        return <PayScreen onGenerateInvoice={handleGenerateInvoice} />;
    }
  };

  return (
    <Box className="flex-1 bg-black h-[100vh] relative">
      {renderScreen()}
      
      {/* FooterMenuはinvoice画面では非表示 */}
      {activeTab !== 'invoice' && (
        <FooterMenu 
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      )}
    </Box>
  );
}
