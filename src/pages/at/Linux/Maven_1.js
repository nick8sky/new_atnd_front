import React, {Component} from 'react';
import Markdown from 'react-markdown';


class Maven_1 extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>


                <Markdown source={" ### Maven常见问题\n" +
                "\n" +
                "1、idea中dependencies中总是有红色波浪线（缺少dependency）问题\n" +
                "\n" +
                "这是IDEA的bug，解决办法是：\n" +
                "\n" +
                "对于有波浪线的dependency，将其从pom中剪切，保存后，再粘贴回来"}/>
            </div>
        );
    }
}

export default Maven_1;