// 对象深拷贝
export const _clone = obj => {
    if (typeof obj !== 'object') return obj; // 参数类型非对象引用类型直接返回
    let result =
        Object.prototype.toString.call(obj) === '[object Array]' ? [] : {}; // 参数是数组引用类型还是对象引用类型
    for (let key in obj) {
        result[key] = typeof obj[key] === 'object' ? DeepClone(obj[key]) : obj[key]; // 值是引用类型进行深层递归，值是值类型直接返回
    }
    return result;
};
// 事件监听器
export const _listen = (el, event, callback, capture) => {
    var passiveSupported = false;
    try {
        Object.defineProperty({}, 'passive', {
            get: () => {
                passiveSupported = true;
            }
        });
    } catch (err) {}

    capture = capture || false;
    el.addEventListener(
        event,
        e => {
            callback(e);
            e.preventDefault();
            e.stopPropagation();
        },
        passiveSupported ? {
            passive: true
        } : capture
    );
};

// 拖拽事件监听器
export const _swiper = options => {
    let startX, startY, moveX, moveY; // 开始坐标XY,拖拽移动距离XY
    let el = options.el || document; // 目标元素或者文档根节点

    let isMobile = 'ontouchstart' in document; // 检测Touch支持
    let isMousePress = false; // 鼠标点击按压状态
    let isMove = false; // 移动状态

    console.log(isMobile ? 'touch' : 'mouse');

    let TouchEvents = {
        start: isMobile ? 'touchstart' : 'mousedown', // 事件类型，开始
        move: isMobile ? 'touchmove' : 'mousemove', // 事件类型，移动
        end: isMobile ? 'touchend' : 'mouseup' // 事件类型，结束
    };

    eListener(el, TouchEvents.start, e => {
        isMousePress = true; // 开始，鼠标点击按压状态
        e = isMobile ? e.touches[0] : e; // 开始，事件对象
        [startX, startY] = [e.clientX, e.clientY]; // 开始，解构赋值
        options.start(startX, startY, el, e); // 开始，调用start()
    });

    eListener(el, TouchEvents.move, e => {
        isMove = true; // 移动，标记移动状态
        e = isMobile ? e.touches[0] : e; // 移动，事件对象
        [moveX, moveY] = [e.clientX - startX, e.clientY - startY]; // 移动，计算移动距离
        if (!isMobile && isMousePress) {
            // 移动，当使用Mouse并且点击按压式状态
            options.move(moveX, moveY, el, num, e); // 移动，调用move()
        }
        if (isMobile) {
            // 移动，当使用Touch
            options.move(moveX, moveY, el, num, e); // 移动，调用move()
        }
    });

    let _end = () => {
        if (isMove && isMousePress) {
            //结束，当移动状态并且鼠标点击按压状态
            isMove = false; // 重置移动状态
            isMousePress = false; // 重置鼠标点击按压状态
            options.end(moveX, moveY, el, num); // 调用end()
        }
    };

    eListener(el, TouchEvents.end, _end);

    // Mouse 兼容处理，解决当鼠标按压滑出目标元素时无法捕捉end,此时监听鼠标滑出目标元素事件leave
    if (!isMobile) {
        eListener(el, 'mouseleave', _end);
    }
};

// 直接修改外链样式表 class
// 在一些极端形况下,我们需要直接修改外链样式表的 class 属性, 好处是可以在不影响行内样式的前提下重设某个公用 class 属性.
// selector : 选择器(例如: '#id','div.clas','.clas > p')
export const _css = (selector, styleList, styleName, styleValue) => {
    let tmpClass = null;
    let cssfilter = obj => {
        let tmp = {};
        styleList.forEach(name => {
            tmp[name] = obj[name];
        });
        return tmp;
    };
    let toEach = Array.prototype.forEach;
    toEach.call(document.styleSheets, j => {
        let rules = j.cssRules || j.rules;
        toEach.call(rules, i => {
            if (i.selectorText === selector) {
                if (styleName && styleValue) {
                    i.style[styleName] = styleValue;
                }
                tmpClass = cssfilter(i.style);
            }
        });
    });
    return tmpClass;
};

// isNull
export const _isNull = str => {
    return str === null || str === '' || str === undefined;
};

// isNumber

export const _isNumber = i => {
    return !isNaN(i - 0);
};
// realValue: 返回一个字符串的真实值（字符串 or 数字）
export const _valueOf = i => {
    return isNaN(i - 0) ? i : i - 0;
};

// 函数节流
// 函数节流？ 概念什么的真的不感冒，简单那说一下怎么回事吧，场景就是现在有一个函数，之前你可以无限制调用，现在你不想了，
// 你希望如果多次调用函数的时间间隔太小，就忽略前面的只记录最后一次调用记录并执行函数。
export const _throttle = fn => {
    // 如果目标 fn 绑定了定时炸弹，拆除炸弹
    if (fn.stid) clearTimeout(fn.stid);

    // 此时，目标孑然一身，给他绑定一个定时(╯‵□′)╯炸弹！•••*～●
    fn.stid = setTimeout(() => {

        fn() // 启动自毁程序

    }, 200)

}

// 函数防抖


// 修正图片旋转属性
import EXIF from 'exif-js';
export const _fixImg = (img, callback, quality = 0.98) => {
    let Orientation, ctxWidth, ctxHeight, base64;
    EXIF.getData(img, function () {
        Orientation = EXIF.getTag(this, 'Orientation');
        ctxWidth = this.naturalWidth;
        ctxHeight = this.naturalHeight;
        console.log(Orientation, ctxWidth, ctxHeight);

        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = ctxWidth;
        canvas.height = ctxHeight;
        if ([5, 6, 7, 8].includes(Orientation)) {
            canvas.width = ctxHeight;
            canvas.height = ctxWidth;
        }

        switch (Orientation) {
            case 2:
                ctx.transform(-1, 0, 0, 1, ctxWidth, 0);
                break;
            case 3:
                ctx.transform(-1, 0, 0, -1, ctxWidth, ctxHeight);
                break;
            case 4:
                ctx.transform(1, 0, 0, -1, 0, ctxHeight);
                break;
            case 5:
                ctx.transform(0, 1, 1, 0, 0, 0);
                break;
            case 6:
                ctx.transform(0, 1, -1, 0, ctxHeight, 0);
                break;
            case 7:
                ctx.transform(0, -1, -1, 0, ctxHeight, ctxWidth);
                break;
            case 8:
                ctx.transform(0, -1, 1, 0, 0, ctxWidth);
                break;
            default:
                ctx.transform(1, 0, 0, 1, 0, 0);
        }

        ctx.drawImage(img, 0, 0, ctxWidth, ctxHeight);
        base64 = canvas.toDataURL('image/jpeg', quality);
        callback(base64);
    });
};

// fullbody
export const _fullBody = () => {
    console.log("onresize")
    document.body.style.height = document.documentElement.clientHeight + "px";
    document.body.style.width = document.documentElement.clientWidth + "px";
}