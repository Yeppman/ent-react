import React, { Component } from 'react'
import { CrownOutlined, DollarCircleTwoTone,UserOutlined, MenuFoldOutlined } from '@ant-design/icons';

import Nav from './nav'
import Sidebar from './sidebar'
import Section from './section'

export default class Main extends Component {
    render() {
        return (
            <>
    <Sidebar />
    <div class="main">

            <Nav />

        <div class="info-boxes">

            <div class="info-card info-card-1">
                <span>Account Type</span>
                <span className="box-icon"><UserOutlined  style={{ fontSize: '26px' }} /></span>
            </div>

            <div class="info-card info-card-2">
                <span>Impressions</span>
                <span className="box-icon"><CrownOutlined  style={{ fontSize: '26px' }} /></span>

            </div>

            <div class="info-card info-card-3">
                <span>Products</span>
                <span className="box-icon"><MenuFoldOutlined style={{ fontSize: '26px'}}/></span>
            </div>
            
            <div class="info-card info-card-4">
                <span>QuotesS</span>
                <span className="box-icon"><DollarCircleTwoTone  style={{ fontSize: '26px'}} /></span>
            </div>
       
        </div>

        <div>
            <div class="section-box">
            <Section />
            </div>
        </div>

    </div>
            </>
        )
    }
}
