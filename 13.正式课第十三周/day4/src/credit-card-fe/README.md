# credit-card-fe

## 启动项目
npm start
npm run jsonserver

## 构建
npm run build


## 前端路由
+ /                                    首页
+ bkrcredit                            首页
+ bkrcredit/knowledgeList              用卡知识页
+ bkrcredit/newsDetail                 新闻详情页
+ bkrcredit/personalCenter             个人中心页
+ bkrcredit/telList                    客服中心页
+ bkrcredit/orderList                  订单列表页
+ bkrcredit/orderDetail                订单详情页
+ bkrcredit/cardList                   卡片搜索页（卡片列表页）
+ bkrcredit/cardDetail                 卡片详情页
+ bkrcredit/contractDetail             用户协议
+ bkrcredit/couponList                 我的卡券
+ bkrcredit/couponDetail               卡券详情
+ bkrcredit/invalidCouponList          无效卡券详情
+ bkrcredit/activityDetail             活动详情
+ bkrcredit/toastPage                  跳转银行中间页
+ bkrcredit/topic                      主题页
+ bkrcredit/storeList                  优惠列表页
+ bkrcredit/discountDetail             优惠详情页

## 参数传递规则
页面初始化时会获取 url 上传递的参数传给后端
获取的规则是：获取 url 上 ?后面的查询字符串


## 后台统计埋点

+ 页面pv统计和用户行为统计
    - 将路由添加到src/common/constant/const.js中
+ 按钮点击事件统计
    - 调用src/common/js/eventUpload.js中的eventTj({key:value})函数并传输需要的参数