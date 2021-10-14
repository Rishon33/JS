//let a = id("aiz").findOne(2000).click();//找不到
//let a = className("android.widget.TextView").depth(15).drawingOrder(4).indexInParent(2).findOne(3000)

//let a = className("android.widget.TextView").depth(16).drawingOrder(3).indexInParent(1).findOne(3000);//找到视频博主入口
function fy() {
    for (ii = 0; ii < 5; ii++) {
        swipe(device.width * 0.5, device.height * 0.75, device.width * 0.5, device.height * 0.5, 800);
        sleep(500);
    };
};
function btn_assure_click(a) {
    //let a = textContains(x).findOne(2000);
    if (a && a.clickable()) return a.click()
    for (let ii = 0; ii < 6; ii++) {
        if (!a) break
        a = a.parent();
        if (!a) break;
        if (!a) break;
        a.children()
            .forEach(
                function (child) {
                    //toastLog(child.clickable());
                    if (!child) return;
                    let button = child.clickable()
                    if (button) {
                        return child.click()
                    }
                    //else{
                    //toastLog("没找到按键");
                    //}
                }
            );
    };
};

function wz() {//打开屏幕上的文章入口（可能4个）并阅读后返回
    //展开全文并下翻
    let a = className("android.widget.LinearLayout").depth(13).find();
    a = a.filter(function (x) {//去除不能点击的文章入口
        return x.clickable() === true;
    })
    a.forEach(function (x) {
        x.click();
        sleep(2000);
        if (textContains("查看全文").exists()) {//打开查看全文
            textContains("查看全文").click();
        }
        for (i = 0; i < 15; i++) {
            swipe(360, 1300, 360, 780, 500);
            sleep(2000);
        };
        back();
        sleep(2000);
    });
}
function btn_position_click(x) {
    let a = click(x.bounds().centerX(), x.bounds().centerY());
    if (a) return true;
}
//=========================
function assure_back(tag) {
    let num = 8
    while (num-- && !textContains(tag).findOne(3000)) {
        toastLog("返回：" + tag + ",back" + (8 - num) + "次")
        back();
        sleep(1500);
    }
}
function sp() {
    let a = id("com.ldzs.zhangxin:id/ay3").find();
    //toastLog(a);
    a.forEach(function (x) {
        btn_assure_click(x);
        let b = textContains("鼓励一下").findOne(10000);
        if (!b) return false;
        let c = textContains("关闭广告").findOne(5000);
        if (!!c) {
            btn_assure_click(c); //有效"关闭广告"
        };
        sleep(60000);
        back();
        sleep(1000);
    });
};
//===========================
/*
textContains("去搜索").waitFor();
let b = textContains("去搜索").find();
let c, d, e, f, g, j, tms1;

d = b.slice(3);

for(var x of d){
    sleep(2000);
    btn_position_click(x);
    sleep(2000);
    back();
    sleep(2000);
};
*/
//let a = textMatches(/\d{5}/).find();
/*
a = a.filter(x => {
    return x.bounds.top < 1400;
});
*/
/*
let b = a.slice(0,2)
log(b);
b.forEach(x => {
    x.click();
   // click(140, x.bounds().top);
    sleep(2000);
    //back();
    //sleep(2000);
})
*/
/*
let c = className("android.view.View").depth(19).drawingOrder(0).indexInParent(0).find().filter(
    function (x) {
        return x.clickable();
    }
);
log(c)
c[0].click()

log(e = idContains("cn.youth.news:id/d1").findOne(3000).text().match(/\d+/g));
log(("不同版本或者同版本安装在不同手机上，出现同id控件，有的text存在，有的text为空").match(/[\u4e00-\u9fa5]+/));
log(f = descMatches(/[\u4e00-\u9fa5]+/).find());//汉字的正则表达式
*/
function zhaobiaoti() {
    f = descMatches(/.*[\u4e00-\u9fa5]+/).find();
    log(f[0]);
    if (f[0] == undefined) {
        f = className("android.view.View").depth(18).find().filter(x => { return x.text().length > 6 });
        f = f.concat(className("android.view.View").depth(17).find().filter(x => { return x.text().length > 6 }));
        f = f.concat(className("android.view.View").depth(16).find().filter(x => { return x.text().length > 6 }));//过滤掉无text的控件;
        f = f.concat(className("android.view.View").depth(19).find().filter(x => { return x.text().length > 6 }));
        log(f)
    };
    if (f[0] == undefined) {
        f = className("android.view.View").depth(19).find().filter(x => { return /\d/.test(x.desc()) });//过滤掉无法点击的控件;
        log(f)
    };


    return f;

};
function quwancheng() {
    a = text("去完成").find();
    toastLog(a);
    let b = 0
    a.forEach(x => {//点击每一个“去完成”按键
        btn_position_click(x)
        x.click();
 
        sleep(500);
        if (!text("看看赚").findOne(2000)) {
            back();
            sleep(1500)
        };//检查是否跳转了页面
        assure_back("看看赚");
        b++;
        if(b%3 == 0){
        swipe(device.width * 0.5, device.height * 0.75, device.width * 0.5, device.height * 0.65, 800);
        }
    });
    swipe(device.width * 0.5, device.height * 0.3, device.width * 0.5, device.height * 0.75, 800);
};

let a, b, c, d, e, f, g, count1, count2, h;

quwancheng();

while (textContains("进行中").exists()) {
    click("进行中");
    sleep(3500);

    g = 0
    log(e = idContains("cn.youth.news:id/d0").findOne(3000).text().match(/\d+/g));
    do {
        f = zhaobiaoti();
        h = f[g++].click();
        log(h);
        if (!h) {
            assure_back("看看赚")
            sleep(2000);//可能有广告
            click("进行中");
            sleep(2000);
            //btn_position_click(f[g]);
            continue;
        }

        //g++;
        sleep(2000);
        if (textContains("展开全文").exists()) click("展开全文");
        for (i = 0; i < 20; i++) {
            e = idContains("cn.youth.news:id/d0").findOne(3000).text().match(/\d+/g);//检测1次
            count1 = e[2];
            swipe(device.width * 0.5, device.height * 0.75, device.width * 0.5, device.height * 0.5, 800);
            sleep(1000);
            e = idContains("cn.youth.news:id/d0").findOne(3000).text().match(/\d+/g);//检测2次
            if ((/^看6篇可得1\d0青豆$/).test(idContains("cn.youth.news:id/d0").findOne(3000).text())) { i = 0; continue; };
            count2 = e[2];
            log(count2 - count1);
            if (((count2 - count1) !== 0)) break;
        };
        back();
        log("g=" + g);
        sleep(2000);
    } while ((e[0] - e[2]) > 0);
    assure_back("看看赚");
    sleep(1000);
};

//log(g = textMatches(/[\u4e00-\u9fa5]{8,30}/).find(),g[0])
