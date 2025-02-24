import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
 

export function objectsToArray(object: object) {
  let result: any[] = [];

  Object.values(object).forEach((value) => {
    if (typeof value === "string") {
      result = [...result, value];
    } else if (typeof value === "object" && !Array.isArray(value) && value !== null) {
      result = [...result, ...objectsToArray(value)];
    }

    return undefined;
  });

  return result;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}  

export  function objectsToString(object: object) {
  return objectsToArray(object).join(" ");
}


export function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}
