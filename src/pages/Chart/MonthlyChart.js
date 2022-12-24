import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import { monthlyGroup } from "../../util/util";

const monthList = Array.from({ length: 12 }, (v, i) => i + 1);

const MonthlyChart = ({ yearBook }) => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const sortedList = monthlyGroup(yearBook);
    const data = monthList.map((month) => {
      const isMonthData = sortedList.find(
        (x) => parseInt(x.date.slice(-2)) === month
      );
      const obj = {
        name: month,
        book: !isMonthData ? 0 : isMonthData.list.length,
      };
      return obj;
    });
    console.log(sortedList);
    console.log(data);
    setMonthlyData(data);
  }, [yearBook]);

  return (
    <Container>
      <BarChartContainer>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            width="100%"
            height={200}
            data={monthlyData}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="name"
              tickSize
              dy={5}
              style={{
                fontSize: "0.7rem",
              }}
            />
            <YAxis
              width={30}
              tickFormatter={(value) => value.toFixed(1)}
              tickSize
              dx={-5}
              style={{
                fontSize: "0.7rem",
              }}
            />
            <Tooltip />
            <Bar
              dataKey="book"
              fill="#969AEC"
              radius={[2, 2, 0, 0]}
              barSize={12}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </BarChartContainer>
    </Container>
  );
};

export default MonthlyChart;

const Container = styled.div``;

const BarChartContainer = styled.div`
  margin-top: 30px;
`;
