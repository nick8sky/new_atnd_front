import React, { Component } from 'react';
import Markdown  from 'react-markdown';
import 'whatwg-fetch'


class Test_1 extends Component {

      get() {
        var result = fetch('http://localhost:3000/posts', {
            credentials: 'include',
            headers: {
                'Accept': 'application/json, text/plain, */*'
            }
        });
        return result;
    }


    render() {


        return (
            <div><div>
                <h3>1、如何使用表达式 ？</h3>
                { 3+2 >4 ? <p>&#123; &#125;  中返回的两个 &lt;p&gt; 也要用 &lt;div&gt; 包裹 </p> : <div> <p>false 1</p> <p>false 2</p> </div> } </div>
                <Markdown source={" ```\n" +
                "return ( <div> \n" +
                "\t<p>段落1</p> { true\n" +
                "\t\t\t?<p>true</p> \n" +
                "\t\t\t:<div> <p>false 1</p> \n" +
                "\t\t\t</div>\n" +
                "\t</div> \n" +
                ")\n" +
                "```"}/>
                <hr/>
                <h3>2、点击事件 ？</h3>
                <Markdown source={"```\n" +
                "<button onClick={this.get}>\n" +
                "    激活按钮\n" +
                "</button>\n" +
                "```"}/>
                <button onClick={this.get}>
                    激活按钮
                </button>
                <hr/>
                <h3>3、mock数据 ？</h3>
                <Markdown source={"ref :https://blog.csdn.net/liqianglai/article/details/53488091\n" +
                "\n" +
                "安装 `npm install --save-dev json-server`\n" +
                "\n" +
                "在项目根目录下，新建一个 JSON 文件`db.json`\n" +
                "\n" +
                "```\n" +
                "{\n" +
                "  \"posts\": [\n" +
                "    { \"id\": 1, \"title\": \"json-server\", \"author\": \"typicode\" }\n" +
                "  ],\n" +
                "  \"comments\": [\n" +
                "    { \"id\": 1, \"body\": \"some comment\", \"postId\": 1 }\n" +
                "  ],\n" +
                "  \"profile\": { \"name\": \"typicode\" }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "打开 `package.json`，在 `scripts` 字段添加一行\n" +
                "\n" +
                "```\n" +
                "\"scripts\": {\n" +
                "  \"server\": \"json-server db.json\", // 新加行\n" +
                "```\n" +
                "\n" +
                "启动服务 `npm run server`\n" +
                "\n" +
                "\n" +
                "\n" +
                "获取数据\n" +
                "\n" +
                "```\n" +
                "   get() {\n" +
                "        var result = fetch('http://localhost:3000/posts', {\n" +
                "            credentials: 'include',\n" +
                "            headers: {\n" +
                "                'Accept': 'application/json, text/plain, */*'\n" +
                "            }\n" +
                "        });\n" +
                "        return result;\n" +
                "    }\n" +
                "```\n" +
                "\n"}/>




            </div>
        );
    }
}

export default Test_1;