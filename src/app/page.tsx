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
import AttributeValues from "@/components/molecules/attributes";

const TAttributes = z.object({
  label: z.string().min(1),
  type: z.string().min(1),
  values: z.array(z.string().min(1)).min(1),
});

const TAttribute = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
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
});

const schema = z.object({
  haveVariations: z.boolean().default(false),
  attributes: TAttributes,
  variations: z.array(TVariation),
  discount: TDiscount,
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
    },
  });
  const [variations, setVariations] = useState(
    form.getValues("variations") || []
  );
  // const [attributes, setAttributes] = useState(
  //   form.getValues("attributes") || []
  // );

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

  // useEffect(() => {
  //   if (form.getValues("variationsattributes").length) {
  //     setAttributes(form.getValues("attributes"));
  //   }
  // }, [form.watch("attributes")]);

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
            <AttributeValues form={form} defaultValues={["Food"]}/>
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
                  <FormLabel>I have variable for this product</FormLabel>
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
                          <FormLabel>Price</FormLabel>
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
                    {/* <div className="space-y-4 bg-white shadow-md p-4">
                      <FormField
                        control={form.control}
                        // @ts-ignore
                        name={`variations[${index}].attribute.label`}
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
                                  `variations[${index}].attribute.label`
                                )}
                                onChange={(e: any) => {
                                  form.setValue(
                                    // @ts-ignore
                                    `variations[${index}].attribute.label`,
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
                        name={`variations[${index}].attribute.type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Attribute Types</FormLabel>
                            <FormControl>
                              <Input
                                // placeholder="Image"
                                // @ts-ignore
                                value={form.getValues(
                                  // @ts-ignore
                                  `variations[${index}].attribute.type`
                                )}
                                onChange={(e: any) => {
                                  form.setValue(
                                    // @ts-ignore
                                    `variations[${index}].attribute.type`,
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
                        name={`variations[${index}].attribute.values`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Attribute Values</FormLabel>
                            <FormControl>
                              <Input
                                // @ts-ignore
                                value={form
                                  .getValues(
                                    // @ts-ignore
                                    `variations[${index}].attribute.values`
                                  )
                                  ?.toString()}
                                onChange={(e: any) => {
                                  let attributeValues =
                                    e.target.value.split(",");
                                  if (attributeValues) {
                                    attributeValues = attributeValues.map(
                                      (value: string) => value.trim()
                                    );
                                  }
                                  form.setValue(
                                    // @ts-ignore
                                    `variations[${index}].attribute.values`,
                                    attributeValues
                                  );
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div> */}
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
