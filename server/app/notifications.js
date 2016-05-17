export function prepareMessagesArray(array, message) {
  if(array.indexOf(message) > -1 ) {
    return;
  }
  array.push(message);
  return array;
}