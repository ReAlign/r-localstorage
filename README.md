# LocalStorage

[![NPM version][npm-image]][npm-url]

[npm-url]: https://www.npmjs.com/package/@realign-zone/local-storage
[npm-image]: https://img.shields.io/npm/v/@realign-zone/local-storage.svg?style=for-the-badge

## Introduction

> 让使用 localStorage 变得更简单

* [x] 原生 `localStorage` 只能存储字符串
* [x] 对于复杂数据结构，在存储之前，必须先进行序列化
* [x] 对于复杂数据结构，在读取的时候，又需要反序列化
* [x] 直接操作数据，可能会对数据造成覆盖，中间最好有一层检测机制，保证数据的准确性
* [x] 对于 `查询当前剩余容量` `获取key列表` 等一些快捷操作，也做了封装
* [x] 记录添加/更新时间
* [x] 设置时效，过期自动清除

针对上述，对 `localStorage` 进行一次封装，默认对数据进行序列化、反序列化、覆盖提醒、快捷处理等操作，用户只需关心自己要保存、获取的数据的一系列操作。

## Usage

### ES6

```js
import LS from '@realign-zone/local-storage';
```

### UMD

```js
// download files
use @realign-zone/local-storage/dist/local-storage.umd.min.js
```

### Browser

```html
<script src="/local-storage.js"></script>
<script>
    LocalStorage.get('xxx');
</script>
```

***

```js
$VALUE = {
    createTime: timestamp,
    value
};
```

### API

#### set(key, value, opts)

> 存储数据，返回 set 的对象


| args | description | note |
| --- | --- | --- |
| key | 存储数据的key |  |
| value | 存储数据的实际值 |  |
| opts | .cover: 是否覆盖已存在的数据 |  |
|  | .expiry: 有效期【时间戳/时长描述】 | 时间戳：有效截止时间点，eg：1546786492336<br>时长描述：数据存活时长，eg：1ms，2s，3m，4h，5d、6w，7mo，8y |

```js
// Example
LS.set('author', {name: 'realign', age: 16}, {expiry: '3y'});

return { key, val: $VALUE };
```

#### get(key)

> 获取数据，返回 对应值（会保持原来的数据类型）

```js
// Example
LS.get('name');
return $VALUE
```

#### has(key)

> 判断是否存在此 key，返回 boolean

```js
// Example
LS.has('name'); // true
LS.has('my'); // false
```

#### remove(key)

> 删除 key 对应的这条数据，返回 boolean，该条数据是否仍存在

* 已成功删除 true（传入不存在的key，仍会返回 true）
* 未成功删除 false

```js
// Example
LS.remove('name'); // true
```

#### clear

> 清空当前域下 localstorage 数据

```js
// Example
LS.clear(); // true
```

#### getKeyList

> 获取 localstorage 所有 key

```js
// Example
LS.getKeyList(); // ['name', 'age']
```

#### getAll

> 获取 localstorage 所有 数据

```js
// Example
LS.getAll(); // { 'name': $VALUE, 'age': $VALUE }
```

#### getSurplusCapacityKb

> 获取 localstorage 剩余容量（kb）

```js
// Example
LS.getSurplusCapacityKb(); // 5119.998046875
```