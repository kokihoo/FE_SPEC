# 不依赖 GitHub Action时，在本机一键把文档站发布到github-pages
set -e # 任一步失败就退出

push_addr=`git remote get-url --push origin` # 作为推送地址
commit_info=`git describe --all --always --long` # 拼进提交说明
dist_path=docs/.vitepress/dist # 构建生成的静态文件目录
push_branch=github-pages # 推送的分支

npm run docs:build # 构建 生成静态文件到docs/.vitpress/dist

cd $dist_path

git init
git add -A
git commit -m "docs: deploy, ${commit_info}"
git push -f $push_addr HEAD:$push_branch

cd -
rm -rf $dist_path
