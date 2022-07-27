import { Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useState } from "react";
import { DoughnutChart } from "./charts/DoughnutChart";
import { colorMap } from "../../theme";
import { hexToRGBA } from "./helpers/helpers";

interface allTodos {
  totalHours: number,
  togglePage: React.Dispatch<React.SetStateAction<{
    home: boolean;
    today: boolean;
    week: boolean;
    month: boolean;
  }>>,
  categories: any,
  colors: string[]
}

export const Today = (props: allTodos) => {
  const [todayChartData, updateChartData] = useState({
    labels: Object.keys(props.categories),
    datasets: [
      {
        label: 'Day Report Chart',
        data: Object.values(props.categories),
        backgroundColor: props.colors.map((colorId) => {
          let rgb = hexToRGBA(colorMap[colorId]);
          return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        }),
        borderWidth: 1,
      },
    ]
  });

  useEffect(() => {
    updateChartData({
      labels: Object.keys(props.categories),
      datasets: [
        {
          label: 'Day Report Chart',
          data: Object.values(props.categories),
          backgroundColor: props.colors.map((colorId) => {
            let rgb = hexToRGBA(colorMap[colorId]);
            return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
          }),
          borderWidth: 1,
        },
      ]
    });
  }, [props.categories, props.colors])

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