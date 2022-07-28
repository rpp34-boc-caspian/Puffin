import { Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { StackedBarChart } from "./charts/StackedBarChart";
import { useEffect, useState } from "react";
import { buildWeekReportData } from "./helpers/helpers";

interface allTodos {
  totalHours: number,
  togglePage: React.Dispatch<React.SetStateAction<{
    home: boolean;
    today: boolean;
    week: boolean;
    month: boolean;
  }>>,
  categories: any,
  todos: any
}

export const Week = (props: allTodos) => {
  const [weekChartData, updateChartData] = useState({
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
    datasets: []
  });

  useEffect(() => {
    let newDataset: any = {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
      datasets: buildWeekReportData(props.todos)
    };
    updateChartData(newDataset)
  }, [props.todos])

  return (
    <>
      <Card>
        <CardContent>
          <CardHeader
            title={
              <Typography sx={{fontSize: 12}} color="text.secondary">
                This Week's Report
              </Typography>
            }
            subheader={
              <Typography fontWeight='bold' variant="h5">
                {props.totalHours} hrs
              </Typography>
            }
            action={
              <IconButton  onClick={()=> {
                props.togglePage({
                  home: false,
                  today: false,
                  week: true,
                  month: false
                }
              )}}>
                <InfoIcon/>
              </IconButton>
            }
          />
          <StackedBarChart data={weekChartData}/>
        </CardContent>
      </Card>
    </>
  )
}