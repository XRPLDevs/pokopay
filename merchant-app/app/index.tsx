import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import PayScreen from "@/components/screens/PayScreen";
import HistoryScreen from "@/components/screens/HistoryScreen";
import SettingsScreen from "@/components/screens/SettingsScreen";
import InvoiceScreen from "@/components/screens/InvoiceScreen";
import { useNavigation } from "@/contexts/NavigationContext";

interface InvoiceData {
  amount: number;
  productName: string;
  merchantName: string;
  invoiceId: string;
}

export default function Home() {
  const { activeTab, setActiveTab, setShowFooter } = useNavigation();
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  const handleGenerateInvoice = (data: InvoiceData) => {
    setInvoiceData(data);
    setActiveTab('invoice');
    setShowFooter(false); // インボイス画面ではフッターを非表示
  };

  const handleBackFromInvoice = () => {
    setInvoiceData(null);
    setActiveTab('pay');
    setShowFooter(true); // フッターを再表示
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HistoryScreen />; // Homeタブでは履歴画面を表示
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
    <Box className="flex-1 bg-black h-[100vh] pb-20">
      {renderScreen()}
    </Box>
  );
}
