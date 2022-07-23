import { Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';


export const Month = () => {
  return (
    <Card>
      <CardContent>
      <CardHeader
          title={
            <Typography sx={{fontSize: 12}} color="text.secondary">
              This Month's Report
            </Typography>
          }
          subheader={
            <Typography fontWeight='bold' variant="h5">
              89.33 hrs
            </Typography>
          }
          action={
            <IconButton>
              <InfoIcon/>
            </IconButton>
          }
        />
      </CardContent>
    </Card>
  )
}