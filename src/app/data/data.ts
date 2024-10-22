export const  apiUrls = {
  articlesUrl: 'https://localhost:7020/api/Articles',
  paymentConditions:"https://localhost:7020/api/PaymentConditions",
  sellers:"https://localhost:7020/api/Seller",
  clients:"https://localhost:7020/api/Client",
  taxes:"https://localhost:7020/api/Tax",
  invoiceSell:"https://localhost:7020/api/Invoice"
};

export function showAsJson(obj:any){

  const invoiceJson = JSON.stringify(obj); // Convert object to JSON
  
  const blob = new Blob([invoiceJson], { type: 'application/json' }); // Create Blob
  
  const url = URL.createObjectURL(blob); // Create URL for Blob

  window.open(url, '_blank');

  URL.revokeObjectURL(url);
 
}
