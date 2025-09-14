import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Skeleton,
  Box,
  Button,
  CardActions,
  IconButton
} from "@mui/material";
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

function ReviewCard({name}) {
  return (
    <>
     <Card>
      <CardContent>
        <CardActions disableSpacing>
        <IconButton aria-label="rating">
          <StarPurple500Icon />
        </IconButton>
        <IconButton aria-label="rating">
          <StarPurple500Icon />
        </IconButton>
        <IconButton aria-label="rating">
          <StarPurple500Icon />
        </IconButton>
        <IconButton aria-label="rating">
          <StarPurple500Icon />
        </IconButton>
        <IconButton aria-label="rating">
          <StarPurple500Icon />
        </IconButton>
        </CardActions>

<Box sx={{display: "flex", alignItems: "center"}}>
<Typography>{name}</Typography>
<IconButton aria-label="check">
          <CheckCircleRoundedIcon />
        </IconButton>
</Box>
<Typography>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam consequat.
</Typography>
        
    </CardContent>
    </Card>
    </>
  )
}

export default ReviewCard;