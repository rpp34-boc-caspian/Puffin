import { Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useState } from "react";
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
  colors: string[],
  chart: Function,
  title: string
}

export const TodayMonth = (props: allTodos) => {
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
                {props.title}
              </Typography>
            }
            subheader={
              <Typography fontWeight='bold' variant="h5">
                {props.totalHours} hrs
              </Typography>
            }
            action={
              <IconButton  onClick={()=> {
                if(props.title === 'Today\'s Report') {
                  props.togglePage({
                    home: false,
                    today: true,
                    week: false,
                    month: false
                  })
                }
                if (props.title === 'This Month\'s Report') {
                  props.togglePage({
                    home: false,
                    today: false,
                    week: false,
                    month: true
                  })
                }
              }}>
                <InfoIcon/>
              </IconButton>
            }
          />
          {props.chart(todayChartData)}
        </CardContent>
      </Card>
    </>
  )
}