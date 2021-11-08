import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { TabBar } from 'antd-mobile'; // 引入tabbar
import './index.css'
import Index from '../Index'
import List from '../List'
import News from '../News'
import Profile from '../Profile'

const tabItems = [
    {
        title: '主页',
        icon: 'icon-ind',
        path: '/home',
    },
    {
        title: '找房',
        icon: 'icon-findHouse',
        path: '/home/list',
    },
    {
        title: '咨询',
        icon: 'icon-infom',
        path: '/home/news',
    },
    {
        title: '我的',
        icon: 'icon-my',
        path: '/home/profile',
    }
]
export default class Home extends Component {
    state = {
        selectedTab: this.props.location.pathname,
    };
    // 当点击导航栏时路由切换对应的tabbar项高亮显示
    componentDidUpdate(preProps) {
        if (preProps.location.pathname !== this.props.location.pathname) {
            this.setState({
                selectedTab: this.props.location.pathname
            })
        }
    }
    render() {
        return (
            <>
                <div className="container">
                    <Route path='/home' exact component={Index}></Route>
                    <Route path='/home/list' component={List}></Route>
                    <Route path='/home/news' component={News}></Route>
                    <Route path='/home/profile' component={Profile}></Route>
                </div>

                <div style={{ position: 'fixed', width: '100%', bottom: 0 }}>

                    <TabBar
                        tintColor="orange"
                        barTintColor="white"
                        noRenderContent={true}
                    >
                        {
                            tabItems.map(item => {
                                return (
                                    <TabBar.Item
                                        title={item.title}
                                        key={item.icon}
                                        icon={
                                            <i className={'iconfont ' + item.icon}></i>
                                        }
                                        selectedIcon={
                                            <i className={'iconfont ' + item.icon}></i>
                                        }
                                        selected={this.state.selectedTab === item.path}
                                        onPress={() => {
                                            this.setState({
                                                selectedTab: item.path,
                                            });
                                            this.props.history.push(item.path)
                                        }}
                                    />
                                )
                            })
                        }
                    </TabBar>
                </div>
            </>

        );
    }
}
