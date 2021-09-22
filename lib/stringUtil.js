function camelCase(str) {
  return str
    .replace(/\s(.)/g, function (a) {
      return a.toUpperCase();
    })
    .replace(/\s/g, "")
    .replace(/^(.)/, function (b) {
      return b.toLowerCase();
    });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
  camelCase,
  capitalizeFirstLetter
};
