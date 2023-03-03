const removeSubstring = (string, substring) => {
  return string.replace(substring, '');
};

const removeLastCharacter = (string) => {
  return string.slice(0, -1);
}

export {
  removeSubstring,
  removeLastCharacter
};
