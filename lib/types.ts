import { z } from 'zod';
import { categories } from 'app/../constants/categories';
import { stat } from 'fs';

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

export const CreatorSchema = z.object({
  name: z.string(),
  uid: z.string(),
  email: z.string().email(),
  token: z.string().optional(),
  mobile: z
    .string()
    .optional()
    .refine((mobile) => mobile && mobile.length == 10),
  imageUrl: z.string().url().optional(),
  location: z.string().optional(),
  verified: z.boolean().default(false),
  bio: z.string().optional().describe('A short biography of the creator'),
  socialMediaLinks: z
    .object({
      twitter: z.string().url(),
      facebook: z.string().url(),
      instagram: z.string().url(),
      linkedin: z.string().url()
    })
    .optional()
    .describe("Links to the creator's social media profiles")
});

export const FundraiserSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, {
      message:
        'name must be at least 1 character long, between 10 and 20 characters recommended'
    })
    .max(50, { message: 'The name should have less than 50 characters' }),

  startDate: z.string().date(),
  endDate: z.string().date(),
  // time: z.string(),
  description: z.string(),
  goalAmount: z.string().default('0'),
  raisedAmount: z.string().default('0'),
  creator: CreatorSchema,
  createdAt: z.string().date(),
  status: z.enum(['active', 'inactive']),
  customThankYouMessage: z.string().optional(),
  updatedAt: z.string().nullish(),
  category: z.enum(categories)
});
// .strict()
// .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
//   message: 'End date must be after start date',
//   path: ['endDate']
// });

const mailSchema = z.object({
  id: z.string(),
  to: z.string().email() || 'all',
  subject: z.string(),
  message: z.string(),
  timestamp: z.string().regex(datePattern),
  status: z.enum(['delivered', 'pending', 'failed'])
});

const DonationSchema = z.object({
  id: z.string(),
  amount: z.number(),
  donorId: z.string(),
  fundraiserID: z.string(),
  createdAt: z.string().datetime(),
  paymentMethod: z.string(),
  title: z.string()
});

const DonorSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  userType: z.enum(['donor', 'recipient', 'admin']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  defaultPaymentMethod: z.string().optional(),
  Donations: DonationSchema.array().optional()
});

const statisticsSchema = z.object({
  date: z.string(),
  donation: z.array(
    z.object({
      amount: z.number(),
      donorId: z.string(),
      fundraiserID: z.string(),
      donationId: z.string()
    })
  ),
  amount: z.number(),
  donations: z.number()
});

export type UserInfo = {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  photoURL: string | null;
  displayName: string | null;
  phoneNumber: string | null;
  providerData?: any; // Consider typing this further if possible
};

export type UserInfoWithToken = UserInfo & {
  token: any; // Consider typing this further if possible (e.g., IdTokenResult)
};

export type AdditionalUserInfo = {
  isNewUser: boolean;
};

export type UserData = {
  accountInfo: {
    name: string | null;
    uid: string;
    email: string | null;
    emailVerified: boolean;
  };
  fundraisers: FundraiserSchemaType[]; // Consider typing these arrays further
};

export type FundraiserSchemaType = z.infer<typeof FundraiserSchema>;
export type CreatorSchemaType = z.infer<typeof CreatorSchema>;
export type DonationSchemaType = z.infer<typeof DonationSchema>;
export type DonorSchemaType = z.infer<typeof DonorSchema>;
export type MailSchemaType = z.infer<typeof mailSchema>;
export type StatisticsSchemaType = z.infer<typeof statisticsSchema>;