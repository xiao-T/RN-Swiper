/**
 * react-native swiper 
 * created 2017-02-16
 * @author xiaoT<270199332@qq.com>
 * eg: <Swiper thumbs={ this.state.thumbs } />
 * @param {Array} thumbs *必填的 轮播图的数据，包括图片uri 或者 title
 * thumbs = [{
 * 	   uri: 'https://img.alicdn.com/simba/img/TB1bTybOpXXXXc6aFXXSutbFXXX.jpg',
 *     title: '书房一定要有腔调'
 * }]
 * @param {Boolean} autoplay 是否自动播放 默认：true
 * @param {Number} delay 自动播放时间间隔 单位:ms; 默认：4000ms
 * @param {Boolean} hasTitle 是否显示标题 默认：false
 * 如果需要显示标题的，在thumbs中要传值给title
 */

'use strict';

import React, { Component, PropTypes } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	ScrollView
} from 'react-native';


const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
	swiper: {
		flexDirection: 'row'
	},
	swiperItem: {
		width: width,
		height: width * 3 / 8
	},
	title: {
		position: 'absolute',
		left: 0,
		bottom: 0,
		color: '#fff',
		backgroundColor: 'rgba(0, 0, 0, .6)',
		width: width,
		padding: 4
	},
	pagination: {
		flexDirection: 'row',
		position: 'absolute',
		right: 16,
		bottom: 8,
	},
	dot: {
		backgroundColor: '#a2a5a5',
		width: 6,
		height: 6,
		borderRadius: 6,
		marginLeft: 6
	},
	active: {
		backgroundColor: '#fff'
	}
})

export default class Swiper extends Component {
	static propTypes = {
		thumbs: PropTypes.array.isRequired,
		autoplay: PropTypes.bool,
		delay: PropTypes.number,
		hasTitle: PropTypes.bool
	}
	/**
	 * default props
	 * @type {Object}
	 */
	static defaultProps = {
		autoplay: true,
		delay: 4000,
		hasTitle: false
	}
	constructor(props) {
		super(props);
		this.state = {
			_index: 0
		};
		this._scrollView = null;
		this._timer = null;
	}
	/**
	 * 生成随机数
	 * @return {String} 随机数
	 */
	randomStr(){
		return ( Math.random() * (+ new Date()) ).toString(36);
	}
	/**
	 * 自动 轮播
	 * @return {undefined} 
	 */
	autoplay(){
		let { delay, thumbs } = this.props;
		let { _index } = this.state;

		this._timer = setTimeout( ()=>{
			_index++;
			if( _index === thumbs.length ){
				_index = 0
			}
			this.setState({
				_index: _index
			}, ()=>{
				this._scrollView.scrollTo({
					x: width * _index,
					// animated: false
				})
				this.autoplay();
			})
		}, delay)
	}
	/**
	 * 渲染Swiper
	 * @return {Array} Swiper Virtual Dom
	 */
	renderThumb(){
		let { hasTitle, thumbs } = this.props;

		return thumbs.map( (item)=>{
			return(<View key={ this.randomStr() }>
				<Image style={ styles.swiperItem } source={ item } />
				{ hasTitle && <Text style={ styles.title }>{ item.title }</Text> }
			</View>)
		})
	}
	/**
	 * 渲染分页器			
	 * @return {Array} 分页器的 Virtual Dom
	 */
	renderPagination(){
		let style = [ styles.dot ];
		let { _index } = this.state;

		return this.props.thumbs.map( (item, index)=>{
			if( _index === index ){
				style = [ styles.dot, styles.active ];
			} else {
				style = [ styles.dot ];
			}
			return( <View style={ style } key={ this.randomStr() }></View> );
		})
	}
	/**
	 * 开始拖拽 屏蔽定时器
	 * @return {undefined} 
	 */
	handleBeginDrag(){
		this._timer && clearTimeout( this._timer );
	}
	/**
	 * 拖拽结束 开启定时器
	 * @return {undefined} 
	 */
	handleDragEnd(){
		let { autoplay } = this.props;
		autoplay && this.autoplay();
	}
	/**
	 * 拖拽滚动结束 计算当前是第几页
	 * 重置 state._index
	 * @param  {Object} e event
	 */
	handleScrollEnd(e){
		let offSetX = e.nativeEvent.contentOffset.x;
		let { _index } = this.state; 

		if( ( offSetX / width ) !== _index ){
			this.setState({
				_index: offSetX / width
			})
		}
	}
	componentDidMount() {
		let { _scrollView } = this.refs;
		let { autoplay } = this.props;

		// swiper 初始化
		this._scrollView = _scrollView;
		autoplay && this.autoplay();
		
	}
	/**
	 * 清除定时器
	 * @return {undefined} 
	 */
	componentWillUnmount() {
		this._timer && clearTimeout( this._timer );
	}
	render(){
		
		return(<View style={ styles.swiper }>
			<ScrollView 
				ref="_scrollView" 
				onScrollBeginDrag={ this.handleBeginDrag.bind(this) } 
				onScrollEndDrag={ this.handleDragEnd.bind(this) } 
				onMomentumScrollEnd={ this.handleScrollEnd.bind(this) } 
				pagingEnabled={true} 
				horizontal={ true } 
				showsHorizontalScrollIndicator={false}>
				{ this.renderThumb && this.renderThumb() }
			</ScrollView>
			<View style={ styles.pagination }>
				{ this.renderPagination && this.renderPagination() }
			</View>
		</View>)
	}
}