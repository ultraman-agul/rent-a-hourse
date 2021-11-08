import React, { Component } from 'react'
import NavHeader from '../../components/NavHeader'
import './index.scss'

export default class Map extends Component {
    componentDidMount() {
        // 创建化地图实例
        const map = new window.BMapGL.Map('container')
        // 设置中心点坐标
        const point = new window.BMapGL.Point(116.404, 39.915)
        // 初始化并设置缩放级别
        map.centerAndZoom(point, 15);
    }
    render() {

        return (
            <div className="map">
                <NavHeader>找房</NavHeader>
                <div id="container">

                </div>
            </div>

        )
    }
}
