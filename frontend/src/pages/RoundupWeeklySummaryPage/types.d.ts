/**
 * User account
 */
interface Account {
  accountUid: string;
  accountType: string;
  defaultCategory: string;
  currency: string;
  createdAt: string;
  name: string;
}

interface TransactionFeedItem {
  feedItemUid: string;
  categoryUid: string;
  amount: {
    currency: string;
    minorUnits: number;
  };
  sourceAmount: {
    currency: string;
    minorUnits: number;
  };
  direction: string;
  updatedAt: string;
  transactionTime: string;
  settlementTime: string;
  source: string;
  status: string;
  transactingApplicationUserUid?: string;
  counterPartyType: string;
  counterPartyUid?: string;
  counterPartyName: string;
  counterPartySubEntityUid?: string;
  counterPartySubEntityName: string;
  counterPartySubEntityIdentifier: string;
  counterPartySubEntitySubIdentifier: string;
  reference: string;
  country: string;
  spendingCategory: string;
  hasAttachment: boolean;
  hasReceipt: boolean;
  // @TODO - confirm this type
  batchPaymentDetails: null | unknown;
}
