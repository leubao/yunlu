class Plugin {

}

Plugin.install = function (Vue) {
    Vue.prototype.$formatDate = function (value, format = 'yyyy-MM-dd h:m:s') {
        if (!value) {
            return;
        }
        // 防止PHP后台输出为10位的时间戳
        if (value.length === 10) {
            value = value * 1000;
        }
        var time = new Date(parseInt(value, 10));
        var date = {
            'M+': time.getMonth() + 1,
            'd+': time.getDate(),
            'h+': time.getHours(),
            'm+': time.getMinutes(),
            's+': time.getSeconds(),
            'q+': Math.floor((time.getMonth() + 3) / 3),
            'S+': time.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length === 1
                    ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
            }
        }
        return format;
    };
};

export default Plugin;
