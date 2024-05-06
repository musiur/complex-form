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
import { X } from "lucide-react";

const AttributeValues = ({
  form,
  defaultValues,
  attributeIndex,
  handler,
}: {
  form: any;
  defaultValues?: string[];
  attributeIndex: number;
  handler: Function;
}) => {
  const [values, setValues] = useState<string[]>(defaultValues || []);
  const [inputValue, setInputValue] = useState("");

  const valueName = `attributes[${attributeIndex}].values`;

  useEffect(() => {
    handler(values);
  }, [values]);

  const SetValue = () => {
    if (inputValue && !values.find((item: string) => item === inputValue)) {
      setValues([...values, ...inputValue.trim().split(" ")]);
      setInputValue("");
    }
  };

  return (
    <FormField
      control={form.control}
      // @ts-ignore
      name={valueName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Attribute Values</FormLabel>
          <div className="flex flex-wrap items-center gap-1">
            {values.map((item: string) => {
              return (
                <div
                  key={item}
                  className="flex items-center gap-1 rounded border text-sm pl-2"
                >
                  {item}
                  <div className="p-[4px] border-l cursor-pointer ml-[4px]">
                    <X
                      className="w-4 h-4"
                      onClick={() => {
                        setValues(
                          values.filter((value: string) => value !== item)
                        );
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <FormControl>
            <div className="flex items-center gap-1">
              <input
                value={inputValue}
                onChange={(e: any) => {
                  const onChangeValue = e.target.value;
                  onChangeValue[onChangeValue.length - 1] === " " ||
                  onChangeValue[onChangeValue.length - 1] === ","
                    ? SetValue()
                    : setInputValue(onChangeValue);
                }}
                className="h-[40px] px-4 rounded-md border w-full"
              />
              <div
                role="button"
                onClick={SetValue}
                className="h-[40px] max-w-[80px] px-4 rounded-md bg-gray-200 hover:bg-gray-900 hover:text-white flex items-center justify-center transition-all duration-200 active:bg-gray-700"
              >
                Add
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AttributeValues;
