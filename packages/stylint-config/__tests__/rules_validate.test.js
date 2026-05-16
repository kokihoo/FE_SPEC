const assert = require('assert');
const stylint = require('stylint');
const path = require('path');


// 关键字describe 描述测试套件，意味着进入jest的执行环境了
// 每个it都是执行jest的小单元 每个it都是jest
describe('test rules.test.js', () => {
    it('validate default', async() => {
        // 1. 获取默认的文档路径 ./fixtures/index.css
        const filePaths = [path.join(__dirname, './fixtures/index.css')];
        // 2. 通过stylint获取结果 同步方式获取
        const result = await stylint.lint({
            configFile: path.join(__dirname, '../index.js'),
            files: filePaths,
            fix: false,
        })

        console.log('===============>',result.errors);

    })
})