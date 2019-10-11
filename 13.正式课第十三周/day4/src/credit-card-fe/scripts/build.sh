#!/bin/bash
MOD_NAME="credit-card-fe"
# 静态资源文件夹名称
STATIC_DIRNAME="creditstatic" # 线上环境

TAR="$MOD_NAME.tar.gz"

rm -rf output

mkdir -p output/webroot/$STATIC_DIRNAME/$MOD_NAME
mkdir -p output/template/$MOD_NAME


cp dist/*.html output/template/$MOD_NAME
cp dist/*.txt output/template/$MOD_NAME
cp dist/* output/webroot/$STATIC_DIRNAME/$MOD_NAME -r
rm -rf output/webroot/$STATIC_DIRNAME/$MOD_NAME/*.html


cd output/
find ./ -name "*.git" -exec rm -rf {} \;
tar zcvf $TAR ./template ./webroot

rm -rf ./template ./webroot

echo "build end"
