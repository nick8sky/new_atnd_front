import React, { Component } from 'react';
import Markdown  from 'react-markdown';



class Util_1 extends Component {
    render() {


        return (
            <div>

                <Markdown source={"##\n" +
                "\n" +
                "### 初始化 npm 环境\n" +
                "\n" +
                "首先保证有 node 和 npm 环境，运行`node -v`和`npm -v`查看\n" +
                "\n" +
                "进入项目目录，运行`npm init`按照步骤填写最终生成`package.json`文件，所有使用 npm 做依赖管理的项目，根目录下都会有一个这个文件，该文件描述了项目的基本信息以及一些第三方依赖项（插件）。\n" +
                "\n" +
                " \n" +
                "\n" +
                "### 安装插件\n" +
                "\n" +
                "已知我们将使用 webpack 作为构建工具，那么就需要安装相应插件，运行 `npm install webpack webpack-dev-server --save-dev` 来安装两个插件。\n" +
                "\n" +
                "又已知我们将使用 React ，也需要安装相应插件，运行 `npm i react react-dom --save`来安装两个插件。其中`i`是`install`的简写形式。\n" +
                "\n" +
                "安装完成之后，查看`package.json`可看到多了`devDependencies`和`dependencies`两项，根目录也多了一个`node_modules`文件夹。\n" +
                "\n" +
                "### `--save` 和 `--save-dev` 的区别\n" +
                "\n" +
                "`npm i`时使用`--save`和`--save-dev`，可分别将依赖（插件）记录到`package.json`中的`dependencies`和`devDependencies`下面。\n" +
                "\n" +
                " \n" +
                "\n" +
                "\n" +
                "\n" +
                "`dependencies`下记录的是项目在运行时必须依赖的插件，常见的例如`react` `jquery`等，即及时项目打包好了、上线了，这些也是需要用的，否则程序无法正常执行。\n" +
                "\n" +
                "`devDependencies`下记录的是项目在开发过程中使用的插件，例如这里我们开发过程中需要使用`webpack`打包，或者fis3`打包，但是一旦项目打包发布、上线了之后，`webpack`和`fis3`就都没有用了，可卸磨杀驴。\n" +
                "\n" +
                " \n" +
                "\n" +
                " BillSettleProcess\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n"}/>



            </div>
        );
    }
}

export default Util_1;