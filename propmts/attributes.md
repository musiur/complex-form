Problem Statement: I have an array that has a key named values with each element. That values key has array of string. Each string is unique. So, for each values and for each elements can you make a all possible combination?

Constraints: array size = n, value array size = n.

Case 1:
Array = [
    {
    label: "Color"
    values: ["Red", "Blue"]
    },
    {
    label: "Size",
    values: ["S", "M", "L"]
    }
]

Case 1 Answer: [
    {label: "Red-S", values: "Red-S"},
    {label: "Red-M", values: "Red-M"},
    {label: "Red-L", values: "Red-L"},
    {label: "Blue-S", values: "Blue-S"},
    {label: "Blue-M", values: "Blue-M"},
    {label: "Blue-L", values: "Blue-L"},
]

Case 2:
Array = [
    {
    label: "Color"
    values: ["Red", "Blue", "White]
    },
    {
    label: "Size",
    values: ["S", "M", "L", "XL"]
    }
]

Case 2 Answer: [
    {label: "Red-S", values: "Red-S"},
    {label: "Red-M", values: "Red-M"},
    {label: "Red-L", values: "Red-L"},
    {label: "Red-XL", values: "Red-XL"},
    {label: "Blue-S", values: "Blue-S"},
    {label: "Blue-M", values: "Blue-M"},
    {label: "Blue-L", values: "Blue-L"},
    {label: "Blue-XL", values: "Blue-XL"},
    {label: "White-S", values: "White-S"},
    {label: "White-M", values: "White-M"},
    {label: "White-L", values: "White-L"},
    {label: "White-XL", values: "White-XL"},
]


Case 3:
Array = [
    {
    label: "Color"
    values: ["Red", "Blue", "White]
    }
]

Case 3 Answer: [
    {label: "Red", values: "Red"},
    {label: "Blue", values: "Blue"},
    {label: "White", values: "White"},
]


Now give me a TypeScript Function that will solve the problem.