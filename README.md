# RN-Swiper 
Swiper Component For React Native   
***
## DEMO

```
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Swiper from './components/common/swiper';

export default class SwiperDemo extends Component {
    constructor(){
        super();
        this.state = {
            thumbs: [{
                uri: 'https://img.alicdn.com/simba/img/TB1bTybOpXXXXc6aFXXSutbFXXX.jpg',
                title: '书房一定要有腔调'
            },{
                uri: 'https://img.alicdn.com/tps/TB1lI3hPpXXXXceXFXXXXXXXXXX-520-280.jpg',
                title: '颜值越高责任越大'
            },{
                uri: 'https://ossgw.alicdn.com/creatives-assets/19f00da6-a5e5-42b8-bb17-a7ade8f7aa01.png',
                title: '最新人气单品'
            },{
                uri: 'https://img.alicdn.com/tps/TB1lI3hPpXXXXceXFXXXXXXXXXX-520-280.jpg',
                title: '颜值越高责任越大'
            }]
        }
    }
    render(){
        return(<View>
            <Swiper thumbs={ this.state.thumbs } />
        </View>)
    }
}

AppRegistry.registerComponent('SwiperDemo', () => SwiperDemo);
```  
***
## OPTION

| Parameter | Type | Default | Description |   
|-----------|------|--------|----------|
| thumbs | Array | | *Required |
| autoplay | Boolean | true |
| delay | Number | 4000 |----------|
| hasTitle | Boolean | false | |



