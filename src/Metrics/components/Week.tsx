import { Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';


export const Week = () => {
  return (
    <Card>
      <CardContent>
      <CardHeader
          title={
            <Typography sx={{fontSize: 12}} color="text.secondary">
              This Weeks's Report
            </Typography>
          }
          subheader={
            <Typography fontWeight='bold' variant="h5">
              38.45 hrs
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