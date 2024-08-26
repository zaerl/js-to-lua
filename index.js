function getLuaKey(key) {
    if(!/^[a-zA-Z]+$/.test(key)) {
        return `["${key}"]`;
    }

    return key;
}

function serializeLuaValue(value, currentIndentLevel, indentLevel = 2) {
    const parentIndent = ' '.repeat((currentIndentLevel - 1) * indentLevel);
    const currentIndent = ' '.repeat(currentIndentLevel * indentLevel);

    if(typeof value === 'string') {
        return `"${value}"`;
    } else if(typeof value === 'number' || typeof value === 'boolean') {
        return value.toString();
    } else if(Array.isArray(value)) {
        const arrayValues = value.map(v => serializeLuaValue(v, currentIndentLevel + 1, indentLevel)).join(', ');

        return `{ ${arrayValues} }`;
    } else if (typeof value === 'object' && value !== null) {
        const objectEntries = Object.entries(value)
            .map(([key, val]) => `${currentIndent}${key} = ${serializeLuaValue(val, currentIndentLevel + 1, indentLevel)}`)
            .join(',\n');

            return `{\n${objectEntries}\n${parentIndent}}`;
    } else {
        return 'nil';
    }
}

export default function objectToLuaTable(obj, indentLevel = 2) {
    if(typeof obj === 'string') {
        obj = JSON.parse(obj);
    }

    const indent = ' '.repeat(indentLevel);
    let isArray = Array.isArray(obj);

    if(isArray) {
        for(let i in obj) {
            const num = Number(i);

            if(!Number.isInteger(num) || num < 0) {
                isArray = false;
                break;
            }
        }
    }

    const luaTableEntries = Object.entries(obj)
      .map(([key, value]) => {
        if(isArray) {
            return `${indent}${serializeLuaValue(value, 2, indentLevel)}`;
        }

        return `${indent}${getLuaKey(key)} = ${serializeLuaValue(value, 2, indentLevel)}`;
      })
      .join(',\n');

    if(luaTableEntries === '') {
        return '{}';
    }

    return `{\n${luaTableEntries}\n}`;
}
