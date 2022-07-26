import { Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

interface allTodos {
  totalHours: number,
  togglePage: React.Dispatch<React.SetStateAction<{
    home: boolean;
    today: boolean;
    week: boolean;
    month: boolean;
}>>
}

export const Week = (props: allTodos) => {
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
        </CardContent>
      </Card>
    </>
  )
}