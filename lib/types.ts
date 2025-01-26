import exp from 'constants';
import Donation from 'images/svg/donate';
import { z } from 'zod';

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

export const CreatorSchema = z.object({
  name: z.string(),
  uid: z.string(),
  email: z.string().email(),
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

export const FundraiserSchema = z
  .object({
    id: z.number(),
    title: z
      .string()
      .min(1, {
        message:
          'name must be at least 1 character long, between 10 and 20 characters recommended'
      })
      .max(50, { message: 'The name should have less than 50 characters' }),

    startDate: z
      .string()
      .date()
      .refine(
        (date) => {
          return (
            datePattern.test(date) && new Date(date) < new Date(Date.now())
          );
        },
        { message: 'The start date is invalid' }
      ),

    endDate: z
      .string()
      .date()
      .refine(
        (date) => {
          return (
            datePattern.test(date) && new Date(date) < new Date(Date.now())
          );
        },
        { message: 'The end date is invalid' }
      ),
    // time: z.string(),
    description: z.string(),
    // imageFile: z.any(),
    // creatorMailAdress: z.string().email(),
    createdAt: z.string().date(),
    // imageUrl: z.string().url(),
    // fallBackMailAdress: z.string().email(),
    creator: CreatorSchema,
    goalAmount: z.number(),
    status: z.enum(['active', 'inactive']),
    category: z.enum([
      'education',
      'health',
      'environment',
      'humanitarian',
      'animal',
      'other'
    ]),
    raisedAmount: z.number()
  })
  .strict();

const DonationSchema = z.object({
  id: z.string(),
  amount: z.number(),
  donorId: z.string(),
  fundraiserId: z.string(),
  createdAt: z.string().datetime(),
  paymentMethod: z.string().optional(),
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

export type FundraiserSchemaType = z.infer<typeof FundraiserSchema>;
export type CreatorSchemaType = z.infer<typeof CreatorSchema>;
export type DonationSchemaType = z.infer<typeof DonationSchema>;
export type DonorSchemaType = z.infer<typeof DonorSchema>;
