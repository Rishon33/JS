function btn_position_click(x) {
    let a = click(x.bounds().centerX(), x.bounds().centerY());
    if (a) return true;
}
//首页文章
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
//向下翻一整页
function fy() {
    for (ii = 0; ii < 5; ii++) {
        swipe(device.width * 0.5, device.height * 0.75, device.width * 0.5, device.height * 0.5, 800);
        sleep(500);
    };
};
//右上角：“待领取，领金豆”
function dailingqu() {
    //右上角：“待领取，领青豆”不可点击时的反馈：奖励计时中，下个整点再来

    //点击待领取或领金豆，位置右上角
    let a = className("android.widget.FrameLayout").depth(9).drawingOrder(1).indexInParent(0).findOne(50000);
    btn_position_click(a);
    id("tt_video_ad_close_layout").findOne(75000).click();//广告关闭按钮
};
function assure_back(tag) {
    let num = 8
    while (num-- && !textContains(tag).findOne(3000)) {
        toastLog("返回：" + tag + ",back" + (8 - num) + "次")
        back();
        sleep(3000);
    }
}
function qusousuo() {
    textContains("去搜索").waitFor();
    let b = textContains("去搜索").find();
    let c, d, e, f, g, j, tms1;
    b.slice(0, 3).forEach(x => {

        x.click();
        sleep(2000);
        toastLog("执行去搜索")
        textContains("任务说明").waitFor();

        //进入任务说明界面
        let totalCount = idContains("totalCount").findOne(3000);//查询总任务数量
        let finishedCoun = idContains("finishedCount").findOne(3000);//查询已完成任务数量
        let tms = totalCount.text() - finishedCoun.text()
        toastLog("运行次数：" + tms);
        j = 0;
        top:
        for (j = 0; j < tms; j++) {
            totalCount = idContains("totalCount").findOne(3000);//查询总任务数量
            finishedCoun = idContains("finishedCount").findOne(3000);//查询已完成任务数量
            tms = totalCount.text() - finishedCoun.text()
            toastLog("运行次数：" + tms);
            c = className("android.view.View").depth(9).find();
            c = c.filter(function (x) {//过滤保留高度低于y=760的按钮
                return x.bounds().top > 760
            });
            c[0].click();//点击第一个热词
            textContains(c[0].text()).waitFor();//等待页面加载
            sleep(1000);
            // 进入热词搜索后的页面
            if (textContains("无需任何点击").findOne(3000)) {
                toastLog("情况1");
                for (i = 0; i < 6; i++) {
                    swipe(device.width * 0.5, device.height * 0.75, device.width * 0.5, device.height * 0.5, 800);
                    sleep(2500);
                };
                assure_back("任务说明");
                sleep(3000);
            } else {
                toastLog("情况2");
                d = className("android.view.View").depth(14).find()//搜索页面选择可点击目标，可能会搜索不到可点击的目标
                d = d.filter(x => {
                    return x.clickable;//可能会返回null
                });
                if (d.length === 0) {
                    toastLog("没找到可点击入口，退出")
                    assure_back("任务说明");
                    continue top;
                }
                d[0].click();
                sleep(3000);
                for (i = 0; i < 6; i++) {
                    swipe(device.width * 0.5, device.height * 0.75, device.width * 0.5, device.height * 0.5, 800);
                    sleep(2500);
                };
                assure_back("任务说明");
            }
            toastLog("点击了第" + (j + 1) + "次关键词");
        };

        assure_back("去搜索");
    });
}
function tms() {
    let totalCount = idContains("totalCount").findOne(3000);//查询总任务数量
    let finishedCoun = idContains("finishedCount").findOne(3000);//查询已完成任务数量
    return (totalCount.text() - finishedCoun.text());
}
function tms1() {
    let a = textContains("已奖励").findOne(2000);//为了让a载入完全，才会显示数字，否则：//奇怪的问题，显示不全，同样代码单独运行停顿2-3秒就能显示全
    toastLog(a.text());
    if (!a) {
        back();
        sleep(3000);
        x.click();
        sleep(2000);
        return false;
    };
    toastLog(a.text().slice(4));
    toastLog("需要运行次数：" + (a.text().slice(6) - a.text().slice(4, 5)));
    return (a.text().slice(6) - a.text().slice(4, 5));//数字第6位减第4位

};
function kkz_lianjie_click() {
    //搜索页面选择可点击目标，可能会搜索不到可点击的目标
    let d = className("android.view.View").depth(14).find()
    d = d.concat(className("android.view.View").depth(11).find());
    d = d.concat(className("android.widget.Button").depth(10).find());
    d = d.concat(className("android.widget.Button").depth(11).find());
    d = d.concat(className("android.view.View").depth(12).find());
    d = d.concat(className("android.view.View").depth(13).find());
    log(d.length);
    d = d.filter(x => {
        return x.clickable();//可能会返回null
    });
    log(d.length);
    if (d.length === 0) {
        toastLog("没找到可点击入口，退出")
        return false;
    }
    d[0].click();
    sleep(3000);
    return d;
}
function sousuozhuan() {
    //中青去搜索
    textContains("去搜索").waitFor();
    let b = textContains("去搜索").find();
    let a, c, d, e, f, g, j;

    b.slice(0, 3).forEach(x => {

        x.click();
        toastLog("执行去搜索")
        textContains("任务说明").waitFor();
        tms();
        //进入任务说明界面
        top:
        while (tms() !== 0) {
            j = 0;
            toastLog("运行次数：" + tms());
            c = className("android.view.View").depth(9).find();//今日热词
            c = c.filter(function (x) {//过滤保留高度低于y=760的按钮
                return x.bounds().top > 760
            });
            c[0].click();//点击第一个热词
            textContains(c[0].text()).waitFor();//等待页面加载
            sleep(1000);

            /*
            // 进入热词搜索后的页面
            if (textContains("无需任何点击").findOne(3000)) {
                toastLog("情况1");
                for (i = 0; i < 6; i++) {
                    swipe(device.width * 0.5, device.height * 0.75, device.width * 0.5, device.height * 0.5, 800);
                    sleep(2500);
                };
                assure_back("任务说明");
                sleep(3000);
            } else {
                toastLog("情况2");
                d = className("android.view.View").depth(14).find()//搜索页面选择可点击目标，可能会搜索不到可点击的目标
                d = d.concat(className("android.view.View").depth(11).find());
                d = d.concat(className("android.widget.Button").depth(10).find());
                d = d.concat(className("android.widget.Button").depth(11).find());
                d = d.concat(className("android.view.View").depth(12).find());
                d = d.concat(className("android.view.View").depth(13).find());
                log(d.length);
                d = d.filter(x => {
                    return x.clickable();//可能会返回null
                });
                log(d.length);
                if (d.length === 0) {
                    toastLog("没找到可点击入口，退出")
                    assure_back("任务说明");
                    continue top;
                }
                d[0].click();
                sleep(3000);
                for (i = 0; i < 6; i++) {
                    swipe(device.width * 0.5, device.height * 0.75, device.width * 0.5, device.height * 0.5, 800);
                    sleep(2500);
                    if (textContains("完成任务").exists()) break;
                };
                assure_back("任务说明");
                
            };*/
            let a = idContains("bottomTipsWrapperId").findOne(3000);
            log(a);
            let text0, p1, p2, p3, p4, d, e, f, count1, yd;
            if (!a) {
                text0 = " ";
                yd = 4
            } else text0 = a.text();
            log(text0);
            let a1 = /看*篇完成任务，已看*篇，加油！/;

            log(/看\d篇完成任务/.test(text0))
            if (/看\d篇完成任务/.test(text0)) yd = 1;
            else if (/认真阅读*秒/.test(text0)) yd = 2;
            else if (/阅读精选内容完成任务/.test(text0)) yd = 3;
            else if (!text0) yd = 4;//不同版本或者同版本安装在不同手机上，出现同id控件，有的text存在，有的text为空

            log(yd);
            switch (yd) {
                //case a1.exec(text0).input://exec方法匹配不到就会返回null，input属性就会报错
                case 1:
                    toastLog("case1")
                    p1 = text0.match(/\d+/g);
                    log(p1);
                    log("还需" + (p1[0] - p1[1]) + "次");

                    d = kkz_lianjie_click();
                    if (!d) exit();

                    count1 = 1
                    top3:
                    while ((p1[0] - p1[1]) > 0) {

                        for (i = 0; i < 6; i++) {
                            swipe(device.width * 0.5, device.height * 0.75, device.width * 0.5, device.height * 0.5, 800);
                            sleep(2500);
                            p2 = text0.match(/\d+/g);
                            log("还需" + (p2[0] - p2[1]) + "次");

                            if ((p2[1] - p1[1]) > 0) {
                                back();
                                break;
                            } else if (textContains("本次任务奖励已发放")) {
                                back();
                                break top3;
                            };
                        };
                        log("完成第" + (count1 + 1) + "篇")

                        p1 = text0.match(/\d+/g);
                        back();
                        sleep(3000);
                        d[count1].click();
                        sleep(3000);
                        count1++;
                    }
                    assure_back("任务说明");
                    break;
                case 2:

                    break;
                case 3:
                    toastLog("case3")
                    kkz_lianjie_click()

                    e = idContains("topTipsWrapperId").findOne(5000)
                    p3 = e.text().match(/\d+/)
                    log("需要阅读" + p3[0] + "秒")
                    sleep((p3[0] + 1) * 1000);
                    assure_back("任务说明");
                    break;

                case 4:
                    toastLog("case4")
                    kkz_lianjie_click()
                    f = idContains("topTipsWrapperId").findOne(2000)
                    if (f) {
                        p4 = f.text().match(/\d+/)
                        sleep((p4[0] + 1) * 1000);
                    }
                    assure_back("任务说明");
                    break;

            }

            j++;
            toastLog("点击了第" + (j + 1) + "次关键词");
        };
        assure_back("去搜索");
    });

    //后3个搜索项-目前点击不进去，应该是软件作者问题
    b.slice(3).forEach(x => {
        top1: {
            sleep(1000);
            btn_position_click(x);//这里用x.click()出现无法点击第5和第6个按键的情况，原因不明。
            toastLog("执行去搜索");
            if (!textContains("任务说明").findOne(5000)) {
                assure_back("去搜索");
                break top1;
            };
            sleep(1000);
            //进入任务说明界面

            top2: {
                tms1();
                while (tms1() !== 0) {
                    c = className("android.view.View").depth(15).find();
                    c = c.filter(function (x) {//过滤保留可点击的按钮
                        return x.clickable()
                    });
                    c[0].click();//点击第一个热词
                    textContains(c[0].text()).waitFor();//等待页面加载
                    sleep(1000);
                    if (textContains("搜索赚")) {
                        toastLog("看起来点不进去");
                        back();
                        exit();
                    };
                    // 进入热词搜索后进行翻页操作
                    if (textContains("无需任何点击").findOne(3000)) {
                        toastLog("情况1");
                        for (i = 0; i < 6; i++) {
                            swipe(device.width * 0.5, device.height * 0.75, device.width * 0.5, device.height * 0.5, 800);
                            sleep(2500);
                        };
                        assure_back("任务说明");
                        sleep(3000);
                    } else {
                        toastLog("情况2");
                        d = className("android.view.View").depth(14).find()//搜索页面选择可点击目标，可能会搜索不到可点击的目标
                        //用concat方法合并多个数组   
                        d = d.concat(className("android.view.View").depth(11).find());
                        d = d.concat(className("android.widget.Button").depth(10).find());
                        d = d.concat(className("android.widget.Button").depth(11).find());
                        d = d.concat(className("android.view.View").depth(12).find());
                        d = d.concat(className("android.view.View").depth(13).find());
                        log(d.length);
                        d = d.filter(x => {
                            return x.clickable();//可能会返回null
                        });
                        log(d.length);
                        if (d.length === 0) {
                            toastLog("没找到可点击入口，退出")
                            assure_back("任务说明");
                            break top2;
                        }
                        log(d[0].click());
                        sleep(3000);
                        for (i = 0; i < 6; i++) {
                            swipe(device.width * 0.5, device.height * 0.75, device.width * 0.5, device.height * 0.5, 800);
                            sleep(2500);
                        };
                        assure_back("任务说明");
                    }

                };
            };
            assure_back("去搜索");
        };
    });

};

//=========================


//===========================
/*
app.launch("cn.youth.news");
sleep(1000);


id("a8m").click();//底部导航：任务
textContains("看看赚").findOne(10000).click();

textContains("每天一次任务").findOne(10000);
sleep(500);
let text1 = className("android.view.View").depth(18).find().filter(function (a) {
    return a.text().length > 3;//获取所有4字主题
});
//let b = text1[1].parent().click()
//toastLog(b);
function par(x) {
    return x.parent();
};
let text0 = text1.map(par);
text1.forEach(function (a) {
    a.parent().click();
    sleep(1500);
    if (!textContains("看看赚").exists()) {
        textContains("看6篇" | "今日任务已完成").findOne(5000);
        if (textContains("看6篇" | "今日任务已完成").exists()) back();
    };
});
*/

//首页看文章
/*
for (j = 0; j < 10; j++) {
    wz();
    fy();
};
*/
//领宝箱任务
//"搜索领青豆"
//中青去搜索
sousuozhuan();