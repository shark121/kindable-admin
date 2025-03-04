import {generateRandomId} from "@/lib/utils"
import {CreatorSchemaType, FundraiserSchema, FundraiserSchemaType} from "@/lib/types"
import {z} from "zod"
import { useForm, FieldValues, UseFormReturn } from "react-hook-form";

/**
 * Generic onSubmit handler that can work with any form data type
 * @param formData - Raw data from the form
 * @param submitCallback - Function to call with the processed data
 * @param validateCallback - Optional custom validation function
 * @param transformCallback - Optional function to transform form data before submission
 * @param errorCallback - Optional function to handle errors
 */

type FormDataType = Record<string, any>;

type ProcessedDataType<T> = T;

export function onSubmit<T extends FormDataType, P = T>(
    //react useForm instace type
  form : UseFormReturn<FieldValues, any, undefined> ,
  formData: T,
  submitCallback: (data: ProcessedDataType<P>) => Promise<any>,
  validateCallback?: (data: T, setError: (field: keyof T, message: string) => void) => boolean,
  transformCallback?: (data: T) => P,
  errorCallback?: (error: any) => void
) {
  try {

    if (validateCallback) {
      const setError = (field: keyof T, message: string) => {
        if (form && form.setError) {
          form.setError(field as any, { 
            type: "manual", 
            message 
          });
        }
      };
      
      const isValid = validateCallback(formData, setError);
      if (!isValid) return;
    } else {
      // Default validation for fundraiser form
      const defaultValidation = validateFundraiserData(formData as any, 
        (field, message) => {
          if (form && form.setError) {
            form.setError(field as any, { type: "manual", message });
          }
        }
      );
      
      if (!defaultValidation) return;
    }
    
    const processedData = transformCallback 
      ? transformCallback(formData) 
      : formData as unknown as P;
    
    submitCallback(processedData as ProcessedDataType<P>)
      .then(response => {
        console.log("Data submitted successfully", response);
        // Reset form if available
        if (form && form.reset) {
          form.reset();
        }
      })
      .catch(error => {
        console.error("Submission failed:", error);
        if (errorCallback) {
          errorCallback(error);
        } else {
          alert("Failed to submit data. Please try again.");
        }
      });
      
  } catch (error) {
    console.error("Error in form submission:", error);
    if (errorCallback) {
      errorCallback(error);
    } else {
      alert("An unexpected error occurred. Please try again.");
    }
  }
}


function validateFundraiserData(
  data: {
    startDate?: string;
    endDate?: string;
    goalAmount?: string;
    raisedAmount?: string;
    [key: string]: any;
  }, 
  setError: (field: string, message: string) => void
): boolean {
  let isValid = true;
  
  
  if (data.startDate && data.endDate) {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    
    if (endDate <= startDate) {
      setError("endDate", "End date must be after start date");
      isValid = false;
    }
  }
  
  
  if (data.goalAmount !== undefined) {
    const goalAmount = parseFloat(data.goalAmount);
    
    if (isNaN(goalAmount) || goalAmount <= 0) {
      setError("goalAmount", "Goal amount must be a positive number");
      isValid = false;
    }
    
    if (data.raisedAmount !== undefined) {
      const raisedAmount = parseFloat(data.raisedAmount);
      
      if (isNaN(raisedAmount) || raisedAmount < 0) {
        setError("raisedAmount", "Raised amount must be a non-negative number");
        isValid = false;
      }
      
      if (!isNaN(goalAmount) && !isNaN(raisedAmount) && raisedAmount > goalAmount) {
        setError("raisedAmount", "Raised amount cannot exceed goal amount");
        isValid = false;
      }
    }
  }
  
  return isValid;
}


const handleFormSubmit = (formData: z.infer<typeof FundraiserSchema>) => {
  const transformToFundraiser = (data: z.infer<typeof FundraiserSchema>): FundraiserSchemaType => {
    
    const creatorData = sessionStorage.getItem('user');
    let creator: CreatorSchemaType;
    
    if (!creatorData) {
      throw new Error("User data not found in session storage");
    }
    
    try {
      creator = JSON.parse(creatorData) as CreatorSchemaType;
    } catch (error) {
      throw new Error("Invalid user data. Please log in again.");
    }
    
    return {
      id: generateRandomId(5),
      title: data.title,
      startDate: data.startDate,
      endDate: data.endDate,
      category: data.category,
      description: data.description,
      goalAmount: data.goalAmount,
      raisedAmount: data.raisedAmount,
      status: 'active',
      createdAt: new Date().toISOString(),
      creator: creator
    };
  };
  
  const submitFundraiser = async (fundraiser: FundraiserSchemaType): Promise<any> => {

    return new Promise(resolve => 
      setTimeout(() => resolve({ success: true, id: fundraiser.id }), 500)
    );
  };
  
  const handleError = (error: any) => {
    if (error.message.includes("User data not found")) {
      alert("Please log in to create a fundraiser");
      // window.location.href = "/login";
    } else {
      alert(error.message || "Failed to create fundraiser. Please try again.");
    }
  };
  
  // Use the generic onSubmit function
//   onSubmit<z.infer<typeof FundraiserSchema>, FundraiserSchemaType>(
//     formData,
//     submitFundraiser,
//     undefined, // Use default validation
//     transformToFundraiser,
//     handleError
//   );
};

