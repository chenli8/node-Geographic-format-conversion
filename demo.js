const fs = require('fs');
const transform = require('./index');
fs.readFile('./QuanHeJieDao', 'utf-8', function(err, data) {
    if (err) {
        console.log(err);
    } else {
        if (data) {
            data = data.split('\n');
            var arr = [];
            for (let i = 0, len = data.length; i < len; i++) {
                let opt = data[i];
                opt = opt.split('|');
                var obj = {};
                obj.name = `${opt[0]}${i}`;
                obj.count = 1;
                obj['geo'] = (() => {
                    console.log(opt[1])
                    var a = opt[1].split(";");
                    for (var j = 0; j < a.length; j++) {
                        var b = a[j].split(',');
                        var wgs84togcj02 = transform.wgs84togcj02(b[1], b[0]);
                        var gcj02tobd09 = transform.gcj02tobd09(wgs84togcj02[0], wgs84togcj02[1]);
                        a[j] = gcj02tobd09;
                    }
                    return a;
                })();
                arr.push(obj)
            }
            fs.writeFile('./transform.json', JSON.stringify(arr), function(err) {
                if (err) {
                    throw err;
                }
                console.log("success");
            })
        }
    }
});
// //wgs84转国测局坐标
var wgs84togcj02 = transform.wgs84togcj02(116.404, 39.915);

// //国测局坐标转百度经纬度坐标
var gcj02tobd09 = transform.gcj02tobd09(116.404, 39.915);