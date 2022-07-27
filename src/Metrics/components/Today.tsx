import { Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useState } from "react";
import { DoughnutChart } from "./charts/DoughnutChart";

interface allTodos {
  totalHours: number,
  togglePage: React.Dispatch<React.SetStateAction<{
    home: boolean;
    today: boolean;
    week: boolean;
    month: boolean;
  }>>,
  categories: any
}

export const Today = (props: allTodos) => {
  const [todayChartData, updateChartData] = useState({
    labels: Object.keys(props.categories),
    datasets: [
      {
        label: '# of Votes',
        data: Object.values(props.categories),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ]
  });

  useEffect(() => {
    updateChartData({
      labels: Object.keys(props.categories),
      datasets: [
        {
          label: '# of Votes',
          data: Object.values(props.categories),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ]
    });
  }, [props.categories])

  return (
    <>
      <Card>
        <CardContent>
          <CardHeader
            title={
              <Typography sx={{fontSize: 12}} color="text.secondary">
                Today's Report
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
                  today: true,
                  week: false,
                  month: false
                }
              )}}>
                <InfoIcon/>
              </IconButton>
            }
          />
          <DoughnutChart data={todayChartData}/>
        </CardContent>
      </Card>
    </>
  )
}