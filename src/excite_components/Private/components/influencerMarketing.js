import React, { Component } from 'react'
import {PlusCircleOutlined} from '@ant-design/icons'
import Sidebar from './sidebar'

export default class InfluencerMarketing extends Component {
    render() {
        return (
            <div>
                <Sidebar />
                <div className="main">
                    
                    <div className="campaign-buttons">
                        <div>
                            <button className="create-client-button"> 
                            Create
                            </button>
                        </div>

                        <div>
                            <button className="create-client-button">
                                Create Trend
                            </button>
                        </div>

                    </div>
                    
                </div>
            </div>
        )
    }
}
