// @ts-check
const fs = require('fs');
const path = require('path');
const API = require('../src/api.json');

const notice = `/**
 * DO NOT MODIFY DIRECTLY
 * This file is generated by "scripts/gencode.js" base on "src/api.json"
 * @internal
 */`;

const templateCode = fs.readFileSync(__dirname + '/template', 'utf-8');

const __API_MAP__ = JSON.stringify(
  API.reduce((acc, api) => {
    acc[api.name] = api;
    return acc;
  }, {})
);

const staticCode =
  notice +
  `
const API: any = ${__API_MAP__};

` +
  templateCode;

function stringifyType(type) {
  switch (type) {
    case 'Integer[]':
    case 'Double[]':
      return 'number[]';
    case 'Integer':
    case 'Double':
      return 'number';
    default:
      return type;
  }
}

function genCode(desc) {
  const FUNC_NAME = desc.name;
  const __INPS__ = desc.inputs.map((i) => {
    return `  ${i.name}: ${stringifyType(i.type)};`;
  });
  const __OPTS__ = desc.options.map((i) => {
    const range = i.range ? `, min: ${i.range.min}, max: ${i.range.max}` : '';
    const comment = `  /**
   * ${i.displayName}  
   * ${i.hint}. (${i.type}${range})
   * @defaultValue ${i.type == 'MAType' ? '`MAType.SMA`=0' : i.defaultValue}
   */
`;
    const entry = `  ${i.name}?: ${stringifyType(i.type)};`;
    return comment + entry;
  });

  const __OUTS__ =
    '{ ' + desc.outputs.map((o) => `${o.name}: number[]`).join('; ') + ' }';

  // prettier-ignore
  const code = `/** @internal */
let __${FUNC_NAME}_API__: any = API['${FUNC_NAME}'];
/**
 * ${desc.description}
 *
 * @alias ${desc.camelCaseName}
 * @category ${desc.group}
 */
export function ${FUNC_NAME}(params: {
${__INPS__.join('\n')}${__OPTS__.length ? '\n' : ''}${__OPTS__.join('\n')}
}): ${__OUTS__} {
  return callFunc(__${FUNC_NAME}_API__, params);
}

/** @hidden */
export const ${desc.camelCaseName} = ${FUNC_NAME};
`;

  return code;
}

const generatedCode = staticCode + API.map(genCode).join('\n');

fs.writeFileSync(path.resolve(__dirname, '../src/index.ts'), generatedCode);
