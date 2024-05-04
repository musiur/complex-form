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

const TAttributes = z.object({
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
  attributes: TAttributes,
  variations: z.array(TVariation),
  discount: TDiscount,

  // stock: z.number().min(1),
  // tags: z.array(z.string()),
  // salesTag: z.array(z.string()),
  // metadata: TMetadata,
});

const variationTemplate = [
  {
    image: "",
    price: 0,
    discount: {
      discountType: "fixed",
      value: 0,
    },
    attributes: [],
    bundle_price_list: [],
    stock: 1,
  },
];

const Home = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      haveVariations: false,
      attributes: {
        label: "",
        type: "",
        values: [],
      },
      variations: [],
      discount: {
        discountType: "fixed",
        value: 0,
      },
      bundle_price_list: [],
    },
  });
  const [variations, setVariations] = useState(
    form.getValues("variations") || []
  );

  useEffect(() => {
    if (form.watch("haveVariations") === true) {
      form.setValue("variations", variationTemplate);
      setVariations(variationTemplate);
    }
  }, [form.watch("haveVariations")]);

  useEffect(() => {
    if (form.getValues("variations").length) {
      setVariations(form.getValues("variations"));
    }
  }, [form.watch("variations")]);

  function onSubmit(data: z.infer<typeof schema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  console.log(form.getValues(), variations);
  return (
    <div className="max-w-[600px] mx-auto section">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 border p-4 shadow-2xl"
        >
          <FormField
            control={form.control}
            // @ts-ignore
            name={`discount.discountType`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount Type</FormLabel>
                <Select
                  onValueChange={(value: any) => {
                    form.setValue(
                      // @ts-ignore
                      `discount.discountType`,
                      value
                    );
                  }}
                  // @ts-ignore
                  defaultValue={form.getValues(
                    // @ts-ignore
                    `discount.discountType`
                  )}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            // @ts-ignore
            name={`discount.value`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Image"
                    type="number"
                    // @ts-ignore
                    value={form.getValues(
                      // @ts-ignore
                      `discount.value`
                    )}
                    onChange={(e: any) => {
                      form.setValue(
                        // @ts-ignore
                        `discount.value`,
                        parseInt(e.target.value)
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <BundlePriceList form={form}/>

          {/* attributes */}

          <fieldset className="space-y-4 p-4 border shadow-lg rounded-lg">
            <FormField
              control={form.control}
              // @ts-ignore
              name={`attributes.label`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attribute label</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Image"
                      type="number"
                      // @ts-ignore
                      value={form.getValues(
                        // @ts-ignore
                        `attributes.label`
                      )}
                      onChange={(e: any) => {
                        form.setValue(
                          // @ts-ignore
                          `attributes.label`,
                          e.target.value
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              // @ts-ignore
              name={`attributes.type`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attribute Types</FormLabel>
                  <FormControl>
                    <Input
                      // placeholder="Image"
                      // @ts-ignore
                      value={form.getValues(
                        // @ts-ignore
                        `attributes.type`
                      )}
                      onChange={(e: any) => {
                        form.setValue(
                          // @ts-ignore
                          `attributes.type`,
                          e.target.value
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AttributeValues form={form} defaultValues={["Food"]} />
          </fieldset>
          <FormField
            control={form.control}
            name="haveVariations"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>I have variation for this product</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* variations  */}
          <div className="space-y-4">
            {variations.length
              ? variations?.map((variation, index: number) => {
                  return (
                    <fieldset
                      key={index}
                      className="border bg-muted p-4 space-y-4"
                    >
                      <FormField
                        control={form.control}
                        // @ts-ignore
                        name={`variations[${index}].image`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Image</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Image"
                                // @ts-ignore
                                value={form.getValues(
                                  // @ts-ignore
                                  `variations[${index}].image`
                                )}
                                onChange={(e: any) => {
                                  form.setValue(
                                    // @ts-ignore
                                    `variations[${index}].image`,
                                    e.target.value
                                  );
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        // @ts-ignore
                        name={`variations[${index}].price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Image"
                                type="number"
                                // @ts-ignore
                                value={form.getValues(
                                  // @ts-ignore
                                  `variations[${index}].price`
                                )}
                                onChange={(e: any) => {
                                  form.setValue(
                                    // @ts-ignore
                                    `variations[${index}].price`,
                                    parseInt(e.target.value)
                                  );
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        // @ts-ignore
                        name={`variations[${index}].discount.discountType`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Discount Type</FormLabel>
                            <Select
                              onValueChange={(value: any) => {
                                form.setValue(
                                  // @ts-ignore
                                  `variations[${index}].discount.discountType`,
                                  value
                                );
                              }}
                              // @ts-ignore
                              defaultValue={form.getValues(
                                // @ts-ignore
                                `variations[${index}].discount.discountType`
                              )}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="percentage">
                                  Percentage
                                </SelectItem>
                                <SelectItem value="fixed">Fixed</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        // @ts-ignore
                        name={`variations[${index}].discount.value`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Discount Value</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Image"
                                type="number"
                                // @ts-ignore
                                value={form.getValues(
                                  // @ts-ignore
                                  `variations[${index}].discount.value`
                                )}
                                onChange={(e: any) => {
                                  form.setValue(
                                    // @ts-ignore
                                    `variations[${index}].discount.value`,
                                    parseInt(e.target.value)
                                  );
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <AttributesArray form={form} variationIndex={index} />
                      <div
                        onClick={() => {
                          const prevValues = form.getValues("variations");
                          const toSet = prevValues.filter(
                            (value: any, i: number) => i !== index
                          );
                          // console.log(prevValues, toSet);
                          // @ts-ignore
                          form.setValue("variations", toSet);
                          // @ts-ignore
                          setVariations(toSet);
                        }}
                      >
                        Remove
                      </div>
                    </fieldset>
                  );
                })
              : null}
            {variations.length ? (
              <div
                onClick={() => {
                  const prevValues = form.getValues("variations");
                  const toSet = [...prevValues, ...variationTemplate];
                  console.log(prevValues, toSet);
                  // @ts-ignore
                  form.setValue("variations", toSet);
                  // @ts-ignore
                  setVariations(toSet);
                }}
                role="button"
              >
                Add New Variant
              </div>
            ) : null}
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Home;
