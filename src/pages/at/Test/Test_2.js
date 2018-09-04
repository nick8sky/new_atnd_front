import React, { Component } from 'react';
import Markdown  from 'react-markdown';
import 'whatwg-fetch'

const info ='red';
class Test_2 extends Component {
    constructor(props) {
        super(props)


        this.state = {
            markdownSrc: info
        }
    }




    render() {


        return (

                <Markdown className ="red_font"  source={this.state.markdownSrc}/>

        );
    }
}

export default Test_2;