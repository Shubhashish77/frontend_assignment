import React from 'react'
import { styled } from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';



const Container = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: var(--color-grey-100);
   gap: 2rem;
   margin: 2rem;
   border-radius: 10px;
   padding: 2rem 0;
`;

const StyledTooltip = styled.div`
  background-color: #fff;
  opacity: 0.9;
  font-weight: 800;
  padding: 10px;
  max-width: 200px;
`;

const Desc = styled.p`
  color: ${props => props.color ? props.color : ""};
`;

const Chart = ({ formatterData }) => {

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <StyledTooltip className="custom-tooltip">
                    <Desc>{`${payload[0].payload.name}`}</Desc>
                    <Desc color="#b20238" className="label">{`Open : ${payload[0].payload.open}`}</Desc>
                    <Desc color="#039fbe" className="label">{`Close : ${payload[0].payload.close}`}</Desc>
                    <Desc color="#e8d31d" className="label">{`High : ${payload[0].payload.high}`}</Desc>
                    <Desc color="#cf1578" className="label">{`Low : ${payload[0].payload.low}`}</Desc>
                    <Desc color="#ff6e40" className="label">{`Volume : ${payload[0].payload.volume}`}</Desc>
                    <Desc className="desc">{`Volume is normalized by dividing it with 100000 so its actual value is ${payload[0].payload.volume * 100000}`}</Desc>
                </StyledTooltip>
            );
        }

        return null;
    };

    return (
        <div>
            <Container>
                <ResponsiveContainer width="100%" height={500}>
                    <BarChart
                        width={500}
                        height={300}
                        data={formatterData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="open" stackId="a" fill="#b20238" />
                        <Bar dataKey="close" stackId="a" fill="#039fbe" />
                        <Bar dataKey="high" stackId="a" fill="#e8d31d" />
                        <Bar dataKey="low" stackId="a" fill="#cf1578" />
                        <Bar dataKey="volume" fill="#ff6e40" />

                    </BarChart>
                </ResponsiveContainer>


                <ResponsiveContainer width="100%" height={500}>
                    <BarChart
                        width={500}
                        height={300}
                        data={formatterData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="open" fill="#b20238" />
                        <Bar dataKey="close" fill="#039fbe" />
                        <Bar dataKey="high" fill="#e8d31d" />
                        <Bar dataKey="low" fill="#cf1578" />
                        <Bar dataKey="volume" fill="#ff6e40" />

                    </BarChart>
                </ResponsiveContainer>

            </Container>
            <Container>
                <ResponsiveContainer width="100%" height={500}>
                    <AreaChart
                        width={500}
                        height={400}
                        data={formatterData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Area type="monotone" dataKey="open" stackId="1" stroke="#b20238" fill="#b20238" />
                        <Area type="monotone" dataKey="close" stackId="1" stroke="#039fbe" fill="#039fbe" />
                        <Area type="monotone" dataKey="high" stackId="1" stroke="#e8d31d" fill="#e8d31d" />
                        <Area type="monotone" dataKey="low" stackId="1" stroke="#cf1578" fill="#cf1578" />
                        <Area type="monotone" dataKey="volume" stackId="1" stroke="#ff6e40" fill="#ff6e40" />
                    </AreaChart>
                </ResponsiveContainer>
            </Container>
        </div>
    )
}

export default Chart