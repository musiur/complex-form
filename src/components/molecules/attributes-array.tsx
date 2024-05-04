import { useEffect, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { X } from "lucide-react";
type TAttribute = { label: string; value: string };
const AttributesArray = ({
  form,
  variationIndex,
}: {
  form: any;
  variationIndex: number;
}) => {
  const [attributes, setAttributes] = useState<TAttribute[]>([]);

  useEffect(() => {
    form.setValue(`variations[${variationIndex}].attributes`, attributes);
  }, [attributes]);

  console.log(attributes);

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {attributes.length
          ? attributes.map((attribute: TAttribute, index: number) => {
              const dotNotation = `variations[${variationIndex}].attributes[${index}]`;
              const labelName = dotNotation + ".label";
              const valueName = dotNotation + ".value";

              return (
                <div
                  key={index}
                  className="space-y-4 p-4 rounded-md border bg-red-100 relative"
                >
                  <div
                    className="absolute top-[4px] right-[4px] p-[4px] rounded-full border border-pink-600"
                    role="button"
                    onClick={() => {
                      console.log(attribute);
                      const filteredAttributes = attributes.filter(
                        (attr: any) => attr.label !== attribute.label
                      );
                      console.log(filteredAttributes);
                      setAttributes(filteredAttributes);
                    }}
                  >
                    <X className="w-4 h-4 stroke-pink-600" />
                  </div>
                  <FormField
                    control={form.control}
                    // @ts-ignore
                    name={labelName}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Attribute Label</FormLabel>
                        <FormControl>
                          <Input
                            value={attributes[index].label}
                            onChange={(e) => {
                              setAttributes(
                                attributes.map(
                                  (
                                    prevAttribute: TAttribute,
                                    attrIndex: number
                                  ) => {
                                    if (attrIndex === index) {
                                      return {
                                        ...prevAttribute,
                                        label: e.target.value,
                                      };
                                    } else {
                                      return prevAttribute;
                                    }
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
                    name={valueName}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Attribute Value</FormLabel>
                        <FormControl>
                          <Input
                          value={attributes[index].value}
                            onChange={(e) => {
                              setAttributes(
                                attributes.map(
                                  (
                                    prevAttribute: TAttribute,
                                    attrIndex: number
                                  ) => {
                                    if (attrIndex === index) {
                                      return {
                                        ...prevAttribute,
                                        value: e.target.value,
                                      };
                                    } else {
                                      return prevAttribute;
                                    }
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
                </div>
              );
            })
          : null}
      </div>
      <div
        onClick={() => {
          setAttributes([...attributes, { label: "", value: "" }]);
        }}
        className="h-12 flex items-center justify-center w-[200px] border bg-gray-200 hover:bg-gray-600 bg-white active:bg-gray-400 rounded-md hover:text-white"
        role="button"
      >
        Add A New Attribute
      </div>
    </div>
  );
};

export default AttributesArray;
