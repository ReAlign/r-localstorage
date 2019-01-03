/**
 * 空闲控制函数， fn仅执行一次
 * @param fn{Function}     传入的函数
 * @param delay{Number}    时间间隔
 * @param options{Object}  如果想忽略开始边界上的调用则传入 {leading:false},
 *                         如果想忽略结束边界上的调用则传入 {trailing:false},
 * @returns {Function}     返回调用函数
 */
const _ = {};
_.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var now = function() {
        return new Date().getTime();
    };

    var later = function () {
        var last = now() - timestamp;
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };

    return function () {
        context = this;
        args = arguments;
        timestamp = now();
        var callNow = immediate && !timeout;
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    };
};

export default _;