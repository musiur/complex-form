/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";

const VariationsArray = ({
  defaultValues,
  handler,
  form,
}: {
  defaultValues?: any;
  handler: Function;
  form: any;
}) => {
  const [variations, setVariations] = useState(defaultValues || []);

  useEffect(() => {
    handler(variations);

    if (!variations.length) {
      form.setValue("haveVariations", false);
    }
  }, [variations]);

  useEffect(() => {
    if (form.watch("haveVariations") === true) {
      form.setValue("variations", variationTemplate);
      setVariations(variationTemplate);
    } else {
      form.setValue("variations", []);
      setVariations([]);
    }
  }, [form.watch("haveVariations")]);

  return (
    <>
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
      <div className="space-y-4">
        {variations.length
          ? variations?.map((variation: any, index: number) => {
              return (
                <fieldset key={index} className="border bg-muted p-4 space-y-4">
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
                            value={variations[index].image}
                            onChange={(e: any) => {
                              setVariations(
                                variations.map(
                                  (
                                    currentVariant: any,
                                    variantIndex: number
                                  ) => {
                                    if (variantIndex === index) {
                                      return {
                                        ...currentVariant,
                                        image: e.target.value,
                                      };
                                    }
                                    return currentVariant;
                                  }
                                )
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
                    name={`variations[${index}].image`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Image"
                            type="number"
                            // @ts-ignore
                            value={variations[index].price}
                            onChange={(e: any) => {
                              setVariations(
                                variations.map(
                                  (
                                    currentVariant: any,
                                    variantIndex: number
                                  ) => {
                                    if (variantIndex === index) {
                                      return {
                                        ...currentVariant,
                                        price: parseInt(e.target.value),
                                      };
                                    }
                                    return currentVariant;
                                  }
                                )
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
                            setVariations(
                              variations.map(
                                (currentVariant: any, variantIndex: number) => {
                                  if (variantIndex === index) {
                                    currentVariant.discount.discountType =
                                      value;
                                  }
                                  return currentVariant;
                                }
                              )
                            );
                            //   form.setValue(
                            //     // @ts-ignore
                            //     `variations[${index}].discount.discountType`,
                            //     value
                            //   );
                          }}
                          // @ts-ignore
                          defaultValue={variations[index].discount.discountType}
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
                            value={variations[index].discount.value}
                            onChange={(e: any) => {
                              setVariations(
                                variations.map(
                                  (
                                    currentVariant: any,
                                    variantIndex: number
                                  ) => {
                                    if (variantIndex === index) {
                                      currentVariant.discount.value = parseInt(
                                        e.target.value
                                      );
                                    }
                                    return currentVariant;
                                  }
                                )
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div
                    onClick={() => {
                      setVariations(
                        variations.filter(
                          (currentVariant: any, variantIndex: number) =>
                            variantIndex !== index
                        )
                      );
                    }}
                    role="button"
                    className="h-8 px-4 bg-pink-600 text-white rounded-md inline-flex items-center justify-center"
                  >
                    Remove
                  </div>
                </fieldset>
              );
            })
          : null}
        {variations.length ? (
          <div
            onClick={() => setVariations([...variations, ...variationTemplate])}
            role="button"
            className="h-8 px-4 bg-gray-600 text-white rounded-md inline-flex items-center justify-center"
          >
            Add New Variant
          </div>
        ) : null}
      </div>
    </>
  );
};

export default VariationsArray;

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
