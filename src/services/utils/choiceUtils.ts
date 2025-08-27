
  export const Status = [
    {value: "PUBLISHED", label: "Published" },
    {value: "DRAFT", label: "Draft" },
    {value: "ARCHIVED", label: "Archived" },
  ]

  export const PaymentMethods = [
    {value: "STRIPE", label: "Stripe"},
    {value: "CARD", label: "Card"},
    {value: "PAYPAL", label: "Paypal"},
    {value: "GPAY", label: "Gpay"}
  ]

  export const ContentType = [
    {value: "VIDEO", label: "Video", icon: "Video"},
    {value: "TEXT", label: "Text", icon: "File"},
    {value: "PDF", label: "PDF", icon: "PDF"},
    {value: "IMAGE", label: "Image", icon: "Picture"} 
  ]

  export const mapStatus = (data: string) => {
    return Status.find(item => item.value === data)?.label
  }

  export const mapChoice = (data: string, type: Array<any>) => {
    return type.find(item => item.value === data)?.label
  }

   export  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-100 text-green-800";
      case "DRAFT":
        return "bg-yellow-100 text-yellow-800";
      case "ARCHIVED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };


  export const getTypeColor = (type: string) => {
    switch (type) {
      case "VIDEO":
        return "bg-blue-100 text-blue-800";
      case "PDF":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
