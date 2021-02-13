import React, {useState, useEffect} from 'react';
import './Home.css'
import api from '../config/axios';
import _ from 'lodash'
import {Grid, Header, Dropdown} from "semantic-ui-react";
import ProgressBar from "../components/ProgressBar";
import ProgressButton from "../components/ProgressButton";

const Home = () => {
    const [data, setData] = useState(null)
    const [barOptions, setBarOptions] = useState([])
    const [active, setActive] = useState(0);

    const handleDropDown = (value) => {
        setActive(value)
    }

    const handleButtonClick = (value) => {
        let temp = {...data}
        if (temp.bars[active] + value <= 0) {
            temp.bars[active] = 0
        } else if (temp.bars[active] + value >= data.limit) {
            temp.bars[active] = data.limit
        } else {
            temp.bars[active] += value
        }
        setData(temp)
    }

    useEffect(() => {
        // Get Data from API and set state
        api.get('/bars').then(res => {
            if (res.status === 200) {
                setData(res.data)

                // set dropdown options
                const barOptions = _.map(res.data.bars, (bar, index) => ({
                    key: index,
                    text: "#progress" + (index + 1),
                    value: index,
                }))
                setBarOptions(barOptions)

                // set default active
                if (res.data.bars.length > 0) {
                    setActive(barOptions[0].value)
                }
            }
        })
    }, [])

    return (
        <Grid textAlign='center' style={{height: '80vh'}} verticalAlign='middle'>
            <Grid.Column className='app-form'>
                {data ?
                    <div>
                        <h1>Progress Bar Demo</h1>
                        {
                            data.bars.map((bar, index) => (
                                <ProgressBar key={index} value={bar}/>
                            ))
                        }
                        <Header>
                            <Header as='h3' floated='left'>
                                <Dropdown
                                    options={barOptions}
                                    value={active}
                                    onChange={(e, {value}) => handleDropDown(value)}
                                />
                            </Header>
                            {
                                data.buttons.map((button, index) => (
                                    <ProgressButton key={index} value={button} handleButtonClick={handleButtonClick}/>
                                ))
                            }
                        </Header>
                    </div>
                    : null}
            </Grid.Column>
        </Grid>
    )
}

export default Home
