import React, { Component } from 'react'
<<<<<<< HEAD
<<<<<<< HEAD
import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile';
import http from '../../utils/http';
import { getCurrentCity } from '../../utils/index'
import './index.scss'
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'

// 导航菜单
const navs = [
    {
        id: 1,
        img: Nav1,
        title: '整租',
        path: '/home/list',
    },
    {
        id: 2,
        img: Nav2,
        title: '合租',
        path: '/home/list',
    },
    {
        id: 3,
        img: Nav3,
        title: '地图找房',
        path: '/home/map',
    },
    {
        id: 4,
        img: Nav4,
        title: '去出租',
        path: '/home/irent',
    },
]

export default class Index extends Component {
    state = {
        swiperData: [],  // 轮播图
        groupsData: [],  // 租房小组
        news: [],  //  最新资讯
        currentCity: '广州'  // 当前城市
    }

    componentDidMount() {
        this.getSwiperData()
        this.getGroups()
        this.getNews()
        // 获取当前城市
        getCurrentCity().then(data => {
            this.setState({
                currentCity: data.label
            })
        })
    }
    // 获取轮播图图片
    async getSwiperData() {
        const data = await http.get('/home/swiper')
        console.log(data)
        this.setState({
            swiperData: data.data.body
        })
    }
    // 渲染轮播图结构
    renderSwiper = () => {
        return (
            this.state.swiperData.map(item => (
                <a
                    key={item.id}
                    href="http://www.baidu.com"
                    style={{ display: 'inline-block', width: '100%', height: 212 }}
                >
                    <img
                        src={`http://localhost:8080${item.imgSrc}`}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top' }}
                    />
                </a>
            ))
        )
    }
    // 渲染导航菜单
    renderNavs = () => {
        return (
            navs.map(item => {
                return (
                    <Flex.Item key={item.id} onClick={() => { this.props.history.push(item.path) }}>
                        <img src={item.img} alt="" />
                        <h2>{item.title}</h2>
                    </Flex.Item>
                )
            })
        )
    }
    // 获取租房小组数据
    async getGroups() {
        const data = await http.get('/home/groups', {
            params: {
                area: '88cff55c-aaa4-e2e0'
            }
        })
        console.log(data)
        this.setState({
            groupsData: data.data.body
        })
    }
    // 获取最新咨询数据
    async getNews() {
        const data = await http.get('/home/news', {
            params: {
                area: '88cff55c-aaa4-e2e0'
            }
        })
        this.setState({
            news: data.data.body
        })
    }
    // 渲染最新资讯
    renderNews = () => {
        return (
            this.state.news.map(item => {
                return (
                    <div className="news-container" key={item.id}>
                        <Flex>
                            <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
                            <Flex className="desc" direction='column' justify='between'>
                                <div className="news-title">
                                    <h3>{item.title}</h3>
                                </div>
                                <Flex justify='between'>
                                    <div className="from">{item.from}</div>
                                    <div className="ago">{item.date}</div>
                                </Flex>
                            </Flex>
                        </Flex>
                    </div>
                )
            })

        )
    }
    render() {
        return (
            <div>
                {/* 轮播图 */}
                {
                    // 异步获取到图片后才能轮播
                    this.state.swiperData.length && <Carousel autoplay infinite autoplayInterval={5000}
                    >
                        {
                            this.renderSwiper()
                        }
                    </Carousel>
                }
                {/* 顶部搜索 */}
                <Flex className='search-box' justify='between'>
                    <Flex className='search'>
                        <div className='location' onClick={() => this.props.history.push('/citylist')}>
                            <span>{this.state.currentCity}</span>
                            <i className='iconfont icon-arrow'></i>
                        </div>
                        <div className='form' onClick={() => this.props.history.push('/search')}>
                            <i className='iconfont icon-seach'></i>
                            <span>请输入小区或地址</span>
                        </div>
                    </Flex>
                    <i className='iconfont icon-map' onClick={() => this.props.history.push('/map')}></i>
                </Flex>

                {/* 导航栏 */}
                <Flex className='nav'>
                    {this.renderNavs()}
                </Flex>
                {/* 租房小组 */}
                <div className='groups'>
                    <div className="group-titles">
                        <Flex>
                            <Flex.Item>
                                <h2>租房小组</h2>
                            </Flex.Item>
                            <Flex.Item>
                                <div className="more">
                                    更多
                                </div>
                            </Flex.Item>
                        </Flex>
                    </div>
                    <Grid
                        data={this.state.groupsData}
                        activeStyle
                        columnNum={2}
                        square={false}
                        hasLine={false}
                        renderItem={
                            (item) => (
                                <Flex className='group-item' justify={'around'}>
                                    <div className='desc'>
                                        <p className='group-title'>{item.title}</p>
                                        <p className='info'>{item.desc}</p>
                                    </div>
                                    <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
                                </Flex>
                            )
                        } />
                </div>
                {/* 最新资讯 */}
                <WingBlank size='md'>
                    <div className="news-titles">
                        <h3>最新咨询</h3>
                    </div>
                    {this.renderNews()}
                </WingBlank>

=======

export default class Index extends Component {
    render() {
        return (
            <div>
                主页
>>>>>>> parent of 0df6d0e (添加后端文件)
=======

export default class Index extends Component {
    render() {
        return (
            <div>
                主页
>>>>>>> parent of 0df6d0e (添加后端文件)
            </div>
        )
    }
}
