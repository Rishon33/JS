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
        if (!a) break;
        a = a.parent();
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
    for (i = 0; i < 50; i++) {
        let a = className("android.widget.LinearLayout").depth(13).find();
        a = a.filter(function (x) {//去除不能点击的文章入口
            return x.clickable() === true;
        })
        a.forEach(function (x) {
            x.click();
            sleep(1000);
            /*
            sleep(2000);
            if (textContains("查看全文").exists()) {//打开查看全文
                textContains("查看全文").click();
            }
            for (i = 0; i < 15; i++) {
                swipe(360, 1300, 360, 780, 500);
                sleep(2000);
            };
            */
            back();
            let num = 10
            //确保退回至首页
            while (num-- && !idContains("cn.youth.news:id/a73").findOne(2000)) {
                back();
                sleep(500);
            }
            sleep(2000);
        });
        fy();
    };
    //回首页
    while (num-- && !idContains("cn.youth.news:id/a73").findOne(2000)) {
        back();
        sleep(500);
    };
};
function btn_position_click(x) {
    let a = click(x.bounds().centerX(), x.bounds().centerY());
    if (a) return true;
};
function assure_back(tag) {
    let num = 10
    while (num-- && !textContains(tag).findOne(3000)) {
        toastLog("返回：" + tag + ",back" + (10 - num) + "次")
        if (idContains("big_pic_close_btn").exists()) {
            idContains("big_pic_close_btn").click();
        }
        back();
        if (num < 7) {
            sleep(500);
            back();
        };
        sleep(500);

    }
};
function sp() {
    id("cn.youth.news:id/a77").findOne(2000).click();//点击导航栏视频
    sleep(1500);
    let a, b, num
    for (i = 0; i < 50; i++) {
        a = id("cn.youth.news:id/agw").find();
        a.forEach(function (x) {
            x.click();
            if (!textContains("动态").findOne(10000)) return false;
            sleep(500);
            b = idContains("cn.youth.news:id/ro").findOne(2000);
            if (!!b) btn_position_click(b)//点击视频
            let c = textContains("关闭广告").findOne(3000);
            if (!!c) btn_assure_click(c); //有效"关闭广告"           
            back();
            //确保退回至首页
            num = 10
            while (num-- && !idContains("cn.youth.news:id/a73").findOne(2000)) {
                back();
                sleep(500);
            }
            sleep(2000);
        });
        fy();
    };

};
function sousuozhuan() {
    //中青去搜索
    function tms() {
        let totalCount = idContains("totalCount").findOne(3000);//查询总任务数量
        let finishedCoun = idContains("finishedCount").findOne(3000);//查询已完成任务数量
        return (totalCount.text() - finishedCoun.text());
    }
    textContains("去搜索").waitFor();
    let b = textContains("去搜索").find();
    let c, d, e, f, g, j;

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
            };
            j++;
            toastLog("点击了第" + (j + 1) + "次关键词");
        };
        assure_back("去搜索");
    });
    //===========================
    /*
    //搜索赚后3个
    
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
};
function zhaobiaoti() {
    f = descMatches(/.*[\u4e00-\u9fa5]+/).find();
    log(f[0]);
    if (f[0] == undefined) {
        f = className("android.view.View").depth(18).find().filter(x => { return x.text().length > 6 });
        f = f.concat(className("android.view.View").depth(17).find().filter(x => { return x.text().length > 6 }));
        f = f.concat(className("android.view.View").depth(16).find().filter(x => { return x.text().length > 6 }));//过滤掉无text的控件;
        //f = f.concat(className("android.view.View").depth(19).find().filter(x => { return x.text().length > 6 }));
        f = f.concat(className("android.view.View").depth(25).find().filter(x => { return x.text().length > 6 }));
        f = f.concat(className("android.view.View").depth(21).find().filter(x => { return x.text().length > 6 }));
        f = f.concat(className("android.view.View").depth(20).find().filter(x => { return x.text().length > 6 }));
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
    //toastLog(a);
    let b = 0
    a.forEach(x => {//点击每一个“去完成”按键      
        x.click();
        sleep(500);
        if (textContains("看6篇可得").findOne(2000)) {
            back();
            sleep(500);
        }
            assure_back("看看赚");

        //检查是否跳转了页面
        b++;
    });
    log("点击次数：" + b);
};

let a, b, c, d, e, f, g, count1, count2, h;
//====================================
//wz();
//sp();
//sousuozhuan();
quwancheng();
