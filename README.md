# @zaerl/lua
Transform Javascript objects to Lua tables. This is a draft project. Do not use!

## Install
`npm install @zaerl/lua`

## Usage

Don't do it!

```typescript
import { objectToLuaTable } from '@zaerl/lua';

const table = objectToLuaTable(obj);
console.log(table);
```

You can pass everything that is an object in Javascript such as `{}` or `[]`.
If you pass a string it attempts to `JSON.parse(obj)` it.

## License

MIT
