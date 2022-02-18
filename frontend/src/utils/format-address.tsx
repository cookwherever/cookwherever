function removeEmpty(obj: any): any {
  return Object.entries(obj)
    .filter(([_, v]) => v != null)
    .reduce(
      (acc, [k, v]) => ({ ...acc, [k]: v === Object(v) ? removeEmpty(v) : v }),
      {}
    );
}

export function formatAddress(address: any) {
  let formattedAddress = {};
  if (address) {
    formattedAddress = removeEmpty(address);
  }
  return Object.values(formattedAddress).slice(2, 3).reverse().join(', ');
}
