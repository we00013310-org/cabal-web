import format from "date-fns/format";
import addDays from "date-fns/addDays";

export const formatDate = (raw) => {
  return format(new Date(raw), "dd/MM/yyyy");
};

export function generateNearestDays(x) {
  const result = [];
  for (let i = 0; i < x; i++) {
    let day = new Date();
    day = addDays(day, -i);
    result.push(format(day, "MMM d"));
  }

  return result.reverse();
}
