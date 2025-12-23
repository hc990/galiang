![tailwind-nextjs-banner](/public/static/images/twitter-card.png)

# Based on Tailwind Nextjs Prisma Axios blog demo code


## Installation

```bash
yarn
```

Please note, that if you are using Windows, you may need to run:

```bash
set PWD="$(pwd)"
```

## Development

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Edit the layout in `app` or content in `data`. With live reloading, the pages auto-updates as you edit them.


`tailwind.config.js` and `css/tailwind.css` - tailwind configuration and stylesheet which can be modified to change the overall look and feel of the site.



`next.config.js` - configuration related to Next.js. You need to adapt the Content Security Policy if you want to load scripts, images etc. from other domains.

# Database : MongoDB


sudo docker run -d -p 192.168.2.214:3000:3000  --mount type=bind,source=/volume2/library/books,target=/Users/huangchong/SynologyDrive/books/ --mount type=bind,source=/volume2/library/thumbnail,target=/usr/src/app/public/thumbnail -it huangchong/galiang

docker exec -it  62dd709df25e  sh 
 

sudo docker run -d  --mount type=bind,source=/volume2/library/books,target=/app/data     -it deploygl
<!-- sudo docker tag galiang/latest hwangzong/galiang -->
docker push huangchong/galiang:latest

sudo docker build -t hwangzong/galiang:latest .
sudo docker build -t huangchong/galiang:latest .

db.books.createIndexes([{'createAt':1,'name':1,'extend':1}],{ unique: true })


export IDF_TOOLS_PATH=/Users/huangchong/Documents/workspaces/esp-idf
export IDF_PYTHON_ENV_PATH=/Users/huangchong/.virtualenvs/esp-idf




# **芋小鱼·潮汕糖水品牌手册**  
**——游进碗里的潮汕甜味**  

---

## **一、品牌核心**  
1. **品牌名称故事**  
   - **“芋”**：代表潮汕糖水的经典食材（芋头、芋泥、芋圆），象征扎实的工艺根基  
   - **“小鱼”**：灵感来自潮汕“鱼米之乡”的地域文化，寓意糖水如鱼儿般游入现代生活  

2. **品牌Slogan**  
   - 主标语：**“芋见潮汕，甜味冒泡”**  
   - 辅助标语：**“小鱼叼来的古早甜”**（用于产品包装）  

3. **品牌人格**  
   - **像一位懂潮汕的邻家小妹妹**：活泼不失传统，会用糖水讲故事  

---

## **二、视觉识别系统**  
1. **Logo设计**  
   - **图形**：  
     - 主视觉：一只圆润的小鱼衔着芋圆（鱼身融入潮汕传统波浪纹）  
     - 辅助图形：简化版“芋小鱼”头像（用于社交媒体表情包）  
   - **字体**：圆润手写体“芋小鱼”+衬线字体“潮汕糖水”（平衡童趣与厚重感）  

2. **色彩体系**  
   - **主色**：  
     - **糖水琥珀色**：温暖治愈，强化品牌记忆点  
     （Pantone 722C）
   - **辅助色**：  
     - 姜薯奶白（Pantone 7401C）  

3. **IP形象延伸**  
   - **“芋小鱼”家族**：  
     - 主角：叼着糖水碗的蓝色小鱼（原型参考潮汕海域常见“黄鳍鲷”）  
     - 配角：芋圆仔（腮红圆球）、姜薯爷爷（白胡子食材拟人）  

---

## **三、产品体系与命名**  
1. **经典系列｜小鱼家的传家甜**  
   - 小鱼大满贯 → **“小鱼沉芋记”**  
   - 海石花四果汤 → **“海底捞甜”**  
   - 老药桔冻 → **“小鱼止咳糖”**（突出功能性）  

2. **创新系列｜小鱼吐泡泡**  
   - 芋泥麻薯奶茶 → **“芋泥泡泡浴”**  
   - 单丛茶冻撞奶 → **“潮茶小鱼缸”**  

3. **儿童系列｜小鱼幼儿园**  
   - 迷你糖水套餐 → **“小鱼宝宝碗”**（附赠小鱼贴纸）  

---

## **四、品牌语言风格**  
1. **文案原则**：**“用童话说传统”**  
   - 示例：  
     - **“这颗芋圆是小鱼从1980年代潮汕游来的”（怀旧版）**  
     - **“喝碗糖水，今日甜度：鱼跃龙门！”（节日版）**  

2. **禁忌**：  
   - 避免使用“网红”“打卡”等快餐词汇，改用**“小鱼推荐”“祖传甜味地图”**等说法  

---

## **五、文化传播设计**  
1. **线下体验**  
   - 门店门头：LED灯箱做成“小鱼吐泡泡”造型，泡泡里展示糖水名  
   - 餐具：定制小鱼尾造型汤匙+波浪纹碗  

2. **线上传播**  
   - 短视频栏目：**《小鱼糖水铺日记》**  
     - 每集用动画小鱼讲解一道糖水的潮汕冷知识（如“鸭母捻为什么叫鸭母？”）  
   - 互动活动：**“帮小鱼找家乡味”**（用户上传自家糖水，最佳复刻者获赠IP周边）  

3. **联名方向**  
   - 与潮汕本土动画《厝角头》合作推出“小鱼游古厝”限定包装  

---

## **六、品牌规范**  
1. **VI应用示例**  
   - **正确示范**：  
     - 包装上小鱼IP必须搭配潮汕方言短句（如“食甜生财”）  
     - 紫色占比不低于60%（强化品牌色记忆）  
   - **错误示范**：  
     - IP形象脱离潮汕元素（如给小鱼加皇冠/潮鞋等违和装饰）  

2. **延伸物料**  
   - 小鱼形集章卡（集满换“潮汕甜味博士”证书）  
   - 外卖保温袋设计成“小鱼游回大海”插画  

---

**手册封底标语**  
*“小鱼说：游过潮汕的甜，才懂人间值得”*  

--- 

如需深化可提供以下内容：  
1. 完整IP形象三视图+表情包设计脚本  
2. 门店空间设计效果图（如“小鱼游动”动线规划）  
3. 方言文案库（如“食甜”系列祝福语）


finished!!!
