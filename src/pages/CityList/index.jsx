import React, { Component } from 'react'
import { NavBar, Toast } from 'antd-mobile'
import { List, AutoSizer } from 'react-virtualized'  // 导入virtualized中的list组件，处理长列表的渲染
import http from '../../utils/http'
import { getCurrentCity } from '../../utils/index'
import NavHeader from '../../components/NavHeader'
import './index.scss'

const TITLE_HEIGHT = 38
const ITEM_HEIGHT = 50
// 格式化title
const formatCityIndex = (letter) => {
    switch (letter) {
        case '#':
            return '当前定位'
        case 'hot':
            return '热门城市'
        default:
            return letter.toUpperCase()
    }
}
export default class CityList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cityList: [],
            cityListIndex: [],
            activeIndex: 2
        }
        this.cityListComponent = React.createRef()
    }

    async componentDidMount() {
        await this.getCityList()
        // 预先计算列表的高度, 从而精确跳转
        this.cityListComponent.current.measureAllRows()
    }
    // 获取城市列表数据并格式化
    async getCityList() {
        const result = await http.get('/area/city', {
            params: {
                level: 1
            }
        })
        const cityList = {}
        result.data.body.forEach(item => {
            const first = item.short.substr(0, 1)
            if (cityList[first]) {
                cityList[first].push(item)
            } else {
                cityList[first] = [item]
            }
        })
        // 列表索引
        const cityListIndex = Object.keys(cityList).sort()
        // 热门城市
        const hotData = await http.get('/area/hot')
        cityList.hot = hotData.data.body
        cityListIndex.unshift('hot')
        // 当前城市
        const curcity = await getCurrentCity()
        cityList['#'] = [curcity]
        cityListIndex.unshift('#')

        this.setState({
            cityList,
            cityListIndex
        })
    }
    // 每行数据的渲染函数
    rowRenderer = ({
        key,
        index, // 索引值
        isScrolling, // 当前项是否正在滚动中
        isVisible, // 当前项是否显示
        style, // 一定要有这个属性。指定每一行所在的位置
    }) => {
        const { cityList, cityListIndex } = this.state
        return (
            <div key={key} style={style} className='rowItem'>
                <div className='title'>{formatCityIndex(cityListIndex[index])}</div>
                <div className='itemBox'>
                    {
                        cityList[cityListIndex[index]].map(item => {
                            return <div className='item' key={item.value} onClick={() => this.changeCity(item)}>{item.label}</div>
                        })
                    }
                </div>
            </div>
        );
    }
    // 改变城市
    changeCity = ({ label, value }) => {
        const hasDataCity = ['北京', '上海', '广州', '深圳']
        if (hasDataCity.includes(label)) {
            localStorage.setItem('currentCity', JSON.stringify({ label, value }))
            this.props.history.go(-1)
        } else {
            Toast.info('暂无该城市数据', 1, false)
        }
    }
    // 动态计算每行的高度
    getRowHeight = ({ index }) => {
        const { cityList, cityListIndex } = this.state
        return TITLE_HEIGHT + ITEM_HEIGHT * cityList[cityListIndex[index]].length
    }
    // 渲染列表右侧的索引
    renderCityIndex = () => {
        const { cityListIndex, activeIndex } = this.state
        return cityListIndex.map((item, index) => {
            return <li
                // 点击索引跳转到列表的某行
                onClick={() => this.cityListComponent.current.scrollToRow(index)}
                key={item}
                className={activeIndex === index ? 'active-index' : ''}>{item === 'hot' ? '热' : item.toUpperCase()}</li>
        })
    }
    onRowsRendered = ({ startIndex }) => {
        // console.log(startIndex)
        if (startIndex !== this.state.activeIndex) {
            this.setState({
                activeIndex: startIndex
            })
        }
    }
    render() {
        return (
            <div className='cityListBox'>
                <NavHeader>城市列表</NavHeader>
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            width={width}
                            height={height}
                            rowCount={this.state.cityListIndex.length}
                            rowHeight={this.getRowHeight}
                            rowRenderer={this.rowRenderer}
                            onRowsRendered={this.onRowsRendered}
                            ref={this.cityListComponent}
                            // 点击索引对应项的首行在最顶端
                            scrollToAlignment='start'
                        />
                    )}
                </AutoSizer>

                <div className="cityIndex">
                    <ul>
                        {this.renderCityIndex()}
                    </ul>
                </div>
            </div>
        )
    }
}
