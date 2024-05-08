/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import clsx from "clsx";
import { Check, ChevronDown, X } from "lucide-react";
import { useEffect, useState } from "react";

type TOption = { label: string; value: string };

const MultiSelect = ({
  form,
  name,
  options = [{ label: "Label", value: "Value" }],
  defaultValues,
}: {
  form: any;
  name: string;
  options: TOption[];
  defaultValues?: TOption[];
}) => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<TOption[]>(defaultValues || []);

  useEffect(() => {
    if (values.length) {
      form.setValue(name, values);
    }
  }, [values]);

  return (
    <div>
      <div className="w-full space-y-1">
        <div className="w-full flex items-stretch">
          <div className="w-full min-h-9 flex flex-wrap gap-1 border border-r-0 rounded-l-[10px] p-2">
            {values.map((item: TOption, index: number) => {
              return (
                <div
                  key={index}
                  className="flex items-center gap-1 rounded border text-sm pl-2"
                >
                  {item.label}
                  <div className="p-[4px] rounded-r-[10px] cursor-pointer ml-[4px]">
                    <X
                      className="w-4 h-4"
                      onClick={() => {
                        setValues(
                          values.filter(
                            (value: TOption) => value.value !== item.value
                          )
                        );
                      }}
                    />
                  </div>
                </div>
              );
            })}
            {!values.length ? (
              <span className="text-gray-400">Select option</span>
            ) : null}
          </div>
          <div
            className="min-w-[40px] flex items-center justify-center border rounded-r-[10px] active:bg-gray-100"
            role="button"
            onClick={() => setOpen(!open)}
          >
            <ChevronDown
              className={clsx(
                "w-4 h-4 stroke-[1.4px] transition-all duration-500",
                {
                  "rotate-0": !open,
                  "rotate-180": open,
                }
              )}
            />
          </div>
        </div>
        <div
          className={clsx(
            "w-full border rounded-[10px] transition-all duration-500",
            {
              "h-auto opacity-100": open,
              "h-0 opacity-0": !open,
            }
          )}
        >
          <div className="grid grid-cols-1 [&>*:first-child]:rounded-t-[4px] [&>*:last-child]:rounded-b-[4px] bg-white rounded-[10px] p-2">
            {options.map((option: TOption, index: number) => {
              const { label, value } = option;
              const selected = values.find(
                (cVal: TOption) => cVal.value === value
              );
              return (
                <div
                  key={index}
                  className={clsx(
                    "flex items-center justify-between gap-1 h-9 px-2 transition-all duration-500",
                    {
                      "bg-primary/5 hover:bg-primary/10": selected,
                      "bg-white hover:bg-gray-100": !selected,
                    }
                  )}
                  role="button"
                  onClick={() =>
                    !selected
                      ? setValues([...values, option])
                      : setValues(
                          values.filter((cVal: TOption) => cVal.value !== value)
                        )
                  }
                >
                  <p
                    className={clsx({
                      "font-medium": selected,
                      "font-normal": !selected,
                    })}
                  >
                    {label}
                  </p>
                  <Check
                    className={clsx("w-4 h-4 transition-all duration-500", {
                      "stroke-gray-800": selected,
                      "stroke-gray-200": !selected,
                    })}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
