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
// import uuid4 from "uuid4";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AttributeValues from "@/components/molecules/attributes-values";
import AttributesArray from "@/components/molecules/attributes-array";
import BundlePriceList from "@/components/molecules/bundle-price-list";
import VariationsArray from "@/components/molecules/variantions-array";
import Discount from "@/components/molecules/discount";

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
  title: z.string(),
  description: z.string(),
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
  image: z.string().min(1),
  price: z.number().min(0),
  discount: TDiscount,
  attributes: z.array(TAttribute),
  stock: z.number().min(1),
});

const schema = z.object({
  // name: z.string().min(1),
  // slug: z.string().min(1),
  // description: z.string().min(1),
  // shortDescription: z.string().min(1),
  // category: z.string().min(1),

  // price: z.number().min(1),
  // priceType: z.string().min(1),
  // min_quantity: z.number().min(1),
  // max_quantity: z.number().min(1),
  bundle_price_list: z.array(TPriceListItem),

  thumbnail: z.string().min(1),
  images: z.array(z.string()),

  haveVariations: z.boolean().default(false),
  attributes: z.array(TAttributeItem),
  variations: z.array(TVariation),
  discount: TDiscount,

  // stock: z.number().min(1),
  // tags: z.array(z.string()),
  // salesTag: z.array(z.string()),
  // metadata: TMetadata,
});

const Home = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      haveVariations: false,
      attributes: [
        {
          label: "",
          type: "",
          values: [],
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
    },
  });

  function onSubmit(data: z.infer<typeof schema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  console.log(form.getValues());
  return (
    <div className="max-w-[600px] mx-auto section">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 border p-4 shadow-2xl"
        >
          <Discount form={form} name="discount" />

          <BundlePriceList form={form} name="bundle_price_list" />

          <AttributesArray
            form={form}
            defaultValues={form.getValues("attributes")}
          />

          <VariationsArray
            form={form}
            defaultValues={form.getValues("variations")}
            handler={(value: any) => form.setValue("variations", value)}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Home;
