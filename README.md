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
* [x] 记录添加时间
* [x] 设置过期清除

针对上述，对 `localStorage` 进行一次封装，默认对数据进行序列化、反序列化、覆盖提醒、快捷处理等操作，用户只需关心自己要保存、获取的数据的一系列操作。

## Usage

### ES6

```javascript
import LS from '@realign-zone/local-storage';
```

### UMD

```javascript
// download files
use n-localstorage/dist/local-storage.umd.min.js
```

### Browser

```html
<script src="/local-storage.js"></script>
```

***

```js
$VALUE = {
    timestampSaved: timestamp,
    value
};
```

#### set(key, value, cover)

```html
存储数据，返回 set 的对象
* set(key, value, {cover: false})
* @params key
* @params value
* @params cover 是否覆盖
* return {
    key: key,
    value: $VALUE
}

Example:

LS.set('name', 'realign');
/**
return
{
    key: 'name',
    val: {
        timestampSaved: 1546493631111,
        value: 'realign'
    }
}
*/
```

#### get(key)

```html
获取数据，返回 对应值（会保持原来的数据类型）
* get(key)
* return $VALUE

Example:

LS.get('name');
```

#### has(key)

```html
判断是否存在此 key，返回 boolean
* has(key)
* return boolean

Example:

LS.has('name'); // true
LS.has('my'); // false
```

#### remove(key)

```html
删除 key 对应的这条数据，
返回 boolean，该条数据是否仍存在
    已成功删除 true（传入不存在的key，仍会返回 true）
    未成功删除 false
* remove(key)
* return boolean

Example:

LS.remove('name'); // true
```

#### clear

```html
清空当前域下 localstorage 数据
* clear()
* return boolean

Example:

LS.clear(); // true
```

#### getKeyList

```html
获取 localstorage 所有 key
* getKeyList()
* return array 默认 []

Example:

LS.getKeyList(); // ['name', 'age']
```

#### getAll

```html
获取 localstorage 所有 数据
* getAll()
* return object 默认 {}

Example:

LS.getAll(); // { 'name': $VALUE, 'age': $VALUE }
```

#### getSurplusCapacityKb

```html
获取 localstorage 剩余容量（kb）
* getSurplusCapacityKb()
* return number

Example:

LS.getSurplusCapacityKb(); // 5119.998046875
```