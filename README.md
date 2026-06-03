如何更新本地代码
在终端打 git pull origin main 按回车

如何提交代码
点击左边第三个图标，添加带 M 的文件，添加后在消息栏写我做的内容，Ctrl+回车
再在终端打 git push origin main 按回车

如何启动目录，如果没有终端，就要新建终端
如果有终端，在终点里面打 npm run dev 鼠标点下边
项目启动后打开 local host 的 url

如何终止项目
在终端按 ctrl+C

## TODO

- [x] upgrade to nextjs 13
- [x] upgrade to nextjs 14
- [x] todo page, style todo form
- [x] update, delete todo with animation
- [x] delete transaction
- [ ] add statistic card on home page
- [x] user github sign up
- [x] user resume page
- [x] contact page list
- [x] contact form
- [ ] project dashboard page
- [ ] experience dashboard page
- [ ] resume public url
- [ ] background image change randomly


# Build the image
docker build -t nextjs-app .

# Run the container
docker run -p 3000:3000 nextjs-app