/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import AttributesArray from "@/components/molecules/attributes-array";
import BundlePriceList from "@/components/molecules/bundle-price-list";
import VariationsArray from "@/components/molecules/variantions-array";
import Discount from "@/components/molecules/discount";
import MultiValue from "@/components/molecules/multi-value";
import InputX from "@/components/molecules/input-x";
// import EditorX from "@/components/molecules/editor-x";

import dynamic from "next/dynamic";
import { generateAttributeLabels, parseCombination } from "@/lib/utils";

const EditorX = dynamic(() => import("@/components/molecules/editor-x"), {
  ssr: false,
});

const TAttributeItem = z.object({
  label: z.string().min(1),
  type: z.string().min(1),
  values: z.array(z.string().min(1)).min(1),
});

const TAttribute = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

const TMetadata = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

const TPriceListItem = z.object({
  min_quantity: z.number().min(1),
  max_quantity: z.number().min(2),
  price: z.number().min(1),
});
// .refine((value) => value.max_quantity > value.min_quantity, {
//   message: "max_quantity must be greater than min_quantity",
//   shouldFocus: true
// });

const TDiscount = z.object({
  discountType: z.string().or(z.literal("fixed")).or(z.literal("percentage")),
  value: z.number().min(0),
});

const TVariation = z.object({
  image: z.string(),
  price: z.number().min(0),
  discount: TDiscount,
  attributes: z.string().min(1),
  stock: z.number().min(1),
  // bulkprice_same_as_base: z.boolean().default(true),
});

const schema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  shortDescription: z.string().min(1),
  category: z.string().min(1),

  price: z.number().min(1),
  priceType: z.string().min(1),
  min_quantity: z.number().min(1),
  max_quantity: z.number().min(1),
  bundle_price_list: z.array(TPriceListItem),

  thumbnail: z.string().min(1),
  images: z.array(z.string()).optional(),

  haveVariations: z.boolean().default(false),
  attributes: z.array(TAttributeItem).optional(),
  variations: z.array(TVariation).optional(),
  discount: TDiscount,
  samePriceForAll: z.boolean().default(true),

  stock: z.number().default(0),
  tags: z.array(z.string()).min(1),
  salesTag: z.array(z.string()).min(1),
  metaData: TMetadata,
});

const Home = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: apiDefaultValues,
  });

  function onSubmit(data: z.infer<typeof schema>) {
    const attributesLabels = generateAttributeLabels(data.attributes!);
    const allVariations = data?.variations?.map(
      (variant: { attributes: string }) => {
        return {
          ...variant,
          attributes: parseCombination(variant.attributes, attributesLabels),
        };
      }
    );
    // @ts-ignore
    data.variations = allVariations;
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  console.log(form.formState.errors);
  return (
    <div className="max-w-[600px] mx-auto section">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 border p-4 shadow-2xl"
        >
          <InputX form={form} name="name" label="Name" type="text" />
          <InputX form={form} name="slug" label="Slug" type="text" />
          <EditorX form={form} name="description" label="Description" />
          <EditorX
            form={form}
            name="shortDescription"
            label="Short Description"
          />
          <InputX form={form} name="category" label="Category" type="text" />
          <InputX form={form} name="price" label="Price" type="number" />
          <InputX form={form} name="priceType" label="Price Type" type="text" />
          <InputX
            form={form}
            name="min_quantity"
            label="Min Quantity"
            type="text"
          />
          <InputX
            form={form}
            name="max_quantity"
            label="Max Quantity"
            type="text"
          />

          <FormField
            control={form.control}
            name="samePriceForAll"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>All products has some price</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch("samePriceForAll") ? (
            <BundlePriceList form={form} name="bundle_price_list" />
          ) : null}

          <Discount form={form} name="discount" />

          <AttributesArray
            form={form}
            defaultValues={form.watch("attributes")}
          />

          <VariationsArray
            form={form}
            defaultValues={form.watch("variations")}
            handler={(value: any) => form.setValue("variations", value)}
          />

          <InputX form={form} name="stock" label="Stock" type="number" />

          <MultiValue
            form={form}
            name="tags"
            label="Tags"
            handler={(values: string[]) => {
              form.setValue("tags", values);
            }}
            defaultValues={form.watch("tags")}
          />
          <MultiValue
            form={form}
            name="salesTag"
            label="salesTag"
            handler={(values: string[]) => {
              form.setValue("salesTag", values);
            }}
            defaultValues={form.watch("salesTag")}
          />

          <div className="p-4 border rounded-lg bg-white shadow-lg space-y-4">
            <InputX
              form={form}
              name="metaData.title"
              label="Title"
              type="text"
            />
            <EditorX
              form={form}
              name="metaData.description"
              label="Description"
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Home;

const customDefaultValues = {
  name: "name",
  slug: "slug",
  category: "asdfasdfasdfadfadf",
  description: "asd",
  shortDescription: "asd",

  price: 99.99,
  priceType: "sale",
  min_quantity: 10,
  max_quantity: 100,

  thumbnail: "",
  images: [],

  haveVariations: false,
  attributes: [
    {
      label: "color",
      type: "type",
      values: ["Red", "Blue"],
    },
  ],
  variations: [],

  discount: {
    discountType: "fixed",
    value: 0,
  },
  bundle_price_list: [
    {
      min_quantity: 1,
      max_quantity: 10,
      price: 100,
    },
  ],

  stock: 0,
  tags: ["test"],
  salesTag: ["test"],

  metadata: {
    title: "test",
    description: "test",
  },
};

const apiDefaultValues = {
  name: "Example Product",
  slug: "example-product",
  description: "This is an example product.",
  shortDescription: "Short description for the product.",
  category: "663162fc9375454f7bf13440",
  price: 99.99,
  priceType: "sale",
  min_quantity: 10,
  max_quantity: 190,
  bundle_price_list: [
    {
      min_quantity: 1,
      max_quantity: 10,
      price: 10,
    },
    {
      min_quantity: 11,
      max_quantity: 20,
      price: 9,
    },
  ],
  thumbnail: "https://example.com/thumbnail.jpg",
  images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  haveVariations: true,
  attributes: [
    {
      label: "Color",
      type: "select",
      values: ["Red", "Blue", "Green"],
    },
    {
      label: "Size",
      type: "select",
      values: ["Small", "Medium", "Large"],
    },
  ],
  variations: [
    {
      image: "https://example.com/variation1.jpg",
      price: 30,
      priceType: "sale",
      min_quantity: 10,
      max_quantity: 190,
      bundle_price_list: [
        {
          min_quantity: 1,
          max_quantity: 10,
          price: 10,
        },
        {
          min_quantity: 11,
          max_quantity: 20,
          price: 9,
        },
      ],
      stock: 2,
      attributes: "Red-Small",
      discount: {
        discountType: "percentage",
        value: 10,
      },
    },
    {
      image: "https://example.com/variation2.jpg",
      price: 35,
      priceType: "sale",
      min_quantity: 10,
      max_quantity: 190,
      bundle_price_list: [
        {
          min_quantity: 1,
          max_quantity: 10,
          price: 10,
        },
        {
          min_quantity: 11,
          max_quantity: 20,
          price: 9,
        },
      ],
      stock: 10,
      attributes: "Blue-Medium",
      discount: {
        discountType: "fixed",
        value: 5,
      },
    },
  ],
  samePriceForAll: true,
  discount: {
    discountType: "percentage",
    value: 10,
  },
  stock: 100,
  tags: ["electronics", "gadgets"],
  salesTag: ["sale", "discount"],
  metaData: {
    title: "Example Product",
    description: "This is an example product.",
  },
};
