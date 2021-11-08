import React from 'react'
import { withRouter } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import './index.scss'



function NavHeader({ children, history, onLeftClick }) {
    const goBack = () => history.go(-1) // 默认返回上一个页面
    return (<NavBar
        className='navheader'
        mode="light"
        icon={<i className='iconfont icon-back'></i>}
        onLeftClick={onLeftClick || goBack}>{children}</NavBar>)
}
NavHeader.propTypes = {
    children: PropTypes.string.isRequired,
    onLeftClick: PropTypes.func
}
export default withRouter(NavHeader)

