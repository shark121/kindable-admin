import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  pgEnum,
  serial
} from 'drizzle-orm/pg-core';
import { count, eq, ilike } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

// export const db = drizzle(neon(process.env.POSTGRES_URL!));

export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  name: text('name').notNull(),
  status: statusEnum('status').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull(),
  availableAt: timestamp('available_at').notNull()
});

export type SelectProduct = typeof products.$inferSelect;
export const insertProductSchema = createInsertSchema(products);

export async function getProducts(
  search: string,
  offset: number,
  uid : string
): Promise<{
  products: any[];
  newOffset: number | null;
  totalProducts: number;
}> {
  // Always search the full table, not per page

  let moreProducts = await (await fetch(`${process.env.NEXT_PUBLIC_URL}/api/data/read/fundraisers/${uid}`)).json();


  if (search) {
    return {
      // products: await db
      //   .select()
      //   .from(products)
      //   .where(ilike(products.name, `%${search}%`))
      //   .limit(1000),
      // newOffset: null,
      // totalProducts: 0
      products: moreProducts,
    newOffset:null,
    totalProducts: Object.keys(moreProducts).length
    };
  }

  if (offset === null) {
    return { products: [], newOffset: null, totalProducts: 0 };
  }

  // let totalProducts = await db.select({ count: count() }).from(products);
   // let newOffset = moreProducts.length >= 5 ? offset + 5 : null;

  return {
    products: moreProducts,
    newOffset:null,
    totalProducts: moreProducts.length
  };
}

// export async function deleteProductById(id: number) {
//   await db.delete(products).where(eq(products.id, id));
// }
