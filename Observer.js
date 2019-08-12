import Subscriber from './Subscriber';

function Observer (data) {

    let subscriber = new Subscriber();
    return new Proxy(data, {
        get (target, key) {
            // 如果订阅者存在，进去depend方法

            console.log('key', key);
            console.log('key1', key);

            console.log('key3',key);
            console.log('key4',key);

            if (Subscriber.target) {
                subscriber.depend(key);
            }
            // Reflect.get了解一下
            return Reflect.get(target, key);
        },
        set (target, key, newVal) {
            // 如果值未变，则直接返回，不触发后续操作
            if (Reflect.get(target, key) !== newVal) {
                // 设置新值的同时对新值判断是否要递归监听
                Reflect.set(target, key, observer(newVal));
                // 当值被触发更改的时候，触发Dep的通知方法
                subscriber.notify(key);
            }
        }
    });
}

// 递归监听
function observer (data) {
    // 如果不是对象则直接返回
    if (typeof data === 'string') {
        return data;
    }

    // 为对象时则递归判断属性值
    Object.keys(data).forEach(key => {
        data[key] = observer(data[key]);
    });
    console.log('test1');

    return Observer(data);
}

export default observer;

