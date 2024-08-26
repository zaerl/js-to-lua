import objectToLuaTable from '../index.js';

// This is a very simple list of tests
let runTests = 0;
let validTests = 0;

mustBe({}, '{}');

mustBe([], '{}');

mustBe([0], `{
  0
}`);

mustBe(['test', 'test'], `{
  "test",
  "test"
}`);

mustBe({ test: 1 }, `{
  test = 1
}`);

mustBe({ '-': 1, '*': 2 }, `{
  ["-"] = 1,
  ["*"] = 2
}`);

mustBe(["Hello world", 2, 4, 3.1415, true, false, null], `{
  "Hello world",
  2,
  4,
  3.1415,
  true,
  false,
  nil
}`);

mustBe(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], `{
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
}`);

mustBe(['test', 'test'], `{
    "test",
    "test"
}`, 4);

mustBe({
  test: {
    test: true
  }
}, `{
  test = {
    test = true
  }
}`)

mustBe({
  test: {
    test: {
      test: true
    }
  }
}, `{
  test = {
    test = {
      test = true
    }
  }
}`)

// Summary
output(validTests === runTests, `\nTests: ${validTests}/${runTests}`);

process.exit(validTests === runTests ? 0 : 1);

function mustBe(arg, value, indentLevel = 2) {
  ++runTests;
  const table = objectToLuaTable(arg, indentLevel);

  if(table === value) {
    output(true, `#${runTests} ok`);
    ++validTests;
  } else {
    output(false, `#${runTests} failed`);
    console.log('Generated:')
    console.log(table);
    console.log('is not:');
    console.log(value);
  }
}

function output(valid, message) {
  if(valid) {
    console.log(`\x1b[32m${message}\x1b[0m`);
  } else {
    console.error(`\x1b[31m${message}\x1b[0m`);
  }
}
