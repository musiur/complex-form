/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

const Discount = ({ form, name }: { form: any; name: string }) => {
  const [value, setValue] = useState(form.getValues(name + ".value") || 0);
  const typeName = name + ".discountType";
  const valueName = name + ".value";

  useEffect(() => {
    form.setValue(valueName, value);
  }, [value]);

  return (
    <fieldset className="p-4 border rounded-md shadow-lg bg-white space-y-4">
      <FormField
        control={form.control}
        // @ts-ignore
        name={valueName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Discount Type</FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => form.setValue(typeName, value)}
                defaultValue={form.getValues(typeName)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="fixed">Fixed</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        // @ts-ignore
        name={valueName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Discount Value</FormLabel>
            <FormControl>
              <Input
                type="number"
                value={value}
                onChange={(e: any) => {
                  setValue(parseInt(e.target.value));
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </fieldset>
  );
};

export default Discount;
