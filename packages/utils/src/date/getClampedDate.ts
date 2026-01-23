export const getClampedDate = (
  date: Date,
  min?: Date,
  max?: Date
): Date => {
  const time = date.getTime();
  
  if (min && time < min.getTime()) {
    return new Date(min.getTime());
  }
  
  if (max && time > max.getTime()) {
    return new Date(max.getTime());
  }
  
  return new Date(time);
};