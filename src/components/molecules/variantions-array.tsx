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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { generateCombinations } from "@/lib/utils";
import Discount from "./discount";
import BundlePriceList from "./bundle-price-list";
import InputX from "./input-x";

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
  const [combinations, setCombinations] = useState<any>([]);

  useEffect(() => {
    if (form.watch("attributes")?.length) {
      const generatedCombinations = generateCombinations(
        form.watch("attributes")
      );
      setCombinations(generatedCombinations);
    }
  }, [form.watch("attributes")]);

  useEffect(() => {
    handler(variations);

    if (!variations.length) {
      form.setValue("haveVariations", false);
    }
  }, [variations]);

  useEffect(() => {
    if (form.watch("haveVariations") === true) {
      const prevVariations = form.watch("variations");
      const toSet = prevVariations || variationTemplate;
      form.setValue("variations", toSet);
      setVariations(toSet);
    } else {
      form.setValue("variations", []);
      setVariations([]);
    }
  }, [form.watch("haveVariations")]);

  return (
    <>
      {form.watch("attributes")[0].values.length ? (
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
      ) : null}
      <div className="space-y-4">
        {variations.length
          ? variations?.map((variation: any, index: number) => {
              return (
                <fieldset key={index} className="border bg-muted p-4 space-y-4">
                  <div>
                    {form.watch("attributes")[0].values.length ? (
                      <FormField
                        control={form.control}
                        // @ts-ignore
                        name={`variations[${index}].attributes`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Attributes</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={(value) => {
                                  if (
                                    variations.length &&
                                    combinations.length
                                  ) {
                                    const usedCombinations = variations.map(
                                      (variation: { attributes: string }) =>
                                        variation.attributes
                                    );
                                    if (!usedCombinations?.includes(value)) {
                                      setVariations(
                                        variations.map(
                                          (
                                            currentVariant: any,
                                            variantIndex: number
                                          ) => {
                                            if (variantIndex === index) {
                                              return {
                                                ...currentVariant,
                                                attributes: value,
                                              };
                                            }
                                            return currentVariant;
                                          }
                                        )
                                      );
                                    }
                                  }
                                }}
                                value={variations[index]?.attributes || ""}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {combinations?.map(
                                      (combination: {
                                        label: string;
                                        value: string;
                                      }) => {
                                        const { label, value } = combination;
                                        return (
                                          <SelectItem key={value} value={value}>
                                            {label}
                                          </SelectItem>
                                        );
                                      }
                                    )}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : null}
                  </div>
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
                    name={`variations[${index}].price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
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
                  {!form.watch("samePriceForAll") ? (
                    <BundlePriceList
                      form={form}
                      name={`variations[${index}].bundle_price_list`}
                    />
                  ) : null}

                  {!form.watch("samePriceForAll") ? (
                    <Discount
                      form={form}
                      name={`variations[${index}].discount`}
                    />
                  ) : null}

                  <InputX
                    form={form}
                    name={`variations[${index}].stock`}
                    label="Stock"
                    type="number"
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
        {variations?.length &&
        combinations?.length &&
        variations?.map(
          (variation: { attributes: string }) => variation.attributes
        )?.length !== combinations?.length ? (
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
    image: "image url",
    price: 0,
    discount: {
      discountType: "fixed",
      value: 0,
    },
    attributes: "",
    bundle_price_list: [
      {
        min_quantity: 1,
        max_quantity: 10,
        price: 100,
      },
    ],
    stock: 1,
  },
];
