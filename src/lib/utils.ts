import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Interface for attribute object
interface Attribute {
  label: string;
  type: string;
  values: string[];
}

// Interface for combination object
export interface Combination {
  id: number;
  label: string;
  value: string;
  [key: string]: string | number;
}

interface Item {
  label: string;
  type: string;
  values: string[];
}

interface ResultItem {
  label: string;
  value: string;
}

export function generateCombinations(items: Item[]): ResultItem[] {
  const combinations: ResultItem[] = [];

  const backtrack = (index: number, current: ResultItem) => {
    if (index === items.length) {
      combinations.push({ label: current.value, value: current.value });
      return;
    }

    const currentItem = items[index];

    for (const value of currentItem.values) {
      backtrack(index + 1, {
        label: value,
        value: `${current.value ? current.value + "-" : ""}${value}`,
      });
    }
  };

  backtrack(0, { label: "", value: "" });

  return combinations;
}

// Function to generate attribute labels from attributes array
export function generateAttributeLabels(
  attributesArray: Attribute[]
): string[] {
  return attributesArray.map((attribute) => attribute.label);
}

// Interface for parsed combination object
interface ParsedCombination {
  label: string;
  value: string;
}

// Function to parse combination string and extract attribute labels and values
export function parseCombination(
  combinationString: string,
  attributeLabels: string[]
): ParsedCombination[] {
  const parsedCombinations: ParsedCombination[] = [];
  const parts = combinationString.split("-");

  parts.forEach((value, index) => {
    parsedCombinations.push({
      label: attributeLabels[index],
      value: value,
    });
  });

  return parsedCombinations;
}

