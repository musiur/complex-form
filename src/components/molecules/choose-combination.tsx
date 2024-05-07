/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Combination,
  generateAttributeLabels,
  generateCombinations,
  parseCombination,
} from "@/lib/utils";
import { FormControl, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const ChooseCombination = ({
  form,
  variantIndex,
}: {
  form: any;
  variantIndex: number;
}) => {
  const attributes = form.getValues("attributes");
  const variantAttributes = form.getValues(
    `variations[${variantIndex}].attributes`
  );
  const combinations = generateCombinations(attributes);
  const attributeLabels = generateAttributeLabels(attributes);

  if (combinations.length && !variantAttributes?.length) {
    const parsed = parseCombination(combinations[0].value, attributeLabels);

    form.setValue(`variations[${variantIndex}].attributes`, parsed);
  }
  // const [combinations, setCombinations] = useState<any>([]);
  // const [selectedCombination, setSelectedCombination] = useState("");

  // useEffect(() => {
  //   const attributes = form.getValues("attributes");
  //   if (attributes.length) {
  //     const combinationTemp = generateCombinations(attributes);
  //     if (combinationTemp.length) {
  //       // for default select

  //       const attributeLabels = generateAttributeLabels(attributes);
  //       const parsedAttributes = parseCombination(
  //         combinationTemp[0].value,
  //         attributeLabels
  //       );
  //       console.log(parsedAttributes);
  //       form.setValue(
  //         `variations[${variantIndex}].attributes`,
  //         parsedAttributes
  //       );
  //       setCombinations(combinationTemp);
  //       setSelectedCombination(combinationTemp[0].value);
  //     }
  //   }
  // }, [form.watch("attributes")]);

  // useEffect(() => {
  //   if (selectedCombination) {

  //   }
  // }, [selectedCombination]);

  return (
    <div>
      {combinations.length ? (
        <Select
          onValueChange={(value: any) => {
            const parsed = parseCombination(value, attributeLabels);

            form.setValue(`variations[${variantIndex}].attributes`, parsed);
          }}
          // @ts-ignore
          defaultValue={combinations[0]?.value || ""}
        >
          <div className="pb-2">
            <FormLabel>
              UniqueAttribute Combination (
              {generateAttributeLabels(form.watch("attributes"))
                .toString()
                .replaceAll(",", "-")}
              )
            </FormLabel>
          </div>
          <FormControl>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {combinations.map((combination, index: number) => {
              const { label, value } = combination;
              // console.log(combination, "<--");
              return (
                <SelectItem key={index} value={value}>
                  {label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      ) : null}
    </div>
  );
};

export default ChooseCombination;
