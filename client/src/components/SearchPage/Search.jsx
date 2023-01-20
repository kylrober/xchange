import React, { useState, useEffect } from 'react';
import {
  Container, Button, IconButton, AddIcon, Avatar, Box, Typography, Select, FormControl, MenuItem, InputLabel
} from '@mui/material';
import axios from 'axios';
import HomeIcon from '@mui/icons-material/Home';
import ItemCard from './ItemCard.jsx';
import List from './List.jsx';
import MapIcon from '@mui/icons-material/Map';

export default function Search({ changeView, user }) {
  const [category, setCategory] = React.useState('');
  const [condition, setCondition] = React.useState('');
  const handleChange = (event) => {
    setCategory(event.target.value);
    // console.log(category);
  };

  const handleChange2 = (event) => {
    setCondition(event.target.value);
    console.log(condition);
    // console.log(condition);
  };

  const mapClick = (event) => {
    changeView('Map', {});
  }

  const homeClick = (event) => {
    changeView('Profile', {});
  }
  // const [allItems, setAllItems] = useState([]);
  // const [allUsers, setAllUsers] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:8080/devices')
  //     .then((response) => {
  //       // setAllItems(response);
  //     }).catch((error) => {
  //       console.log(error);
  //     });

  // //   axios.get('http://localhost:8080/users')
  // //     .then((response) => {
  // //       setAllUsers(response);
  // //     }).catch((error) => {
  // //       console.log(error);
  // //     });
  // }, []);

  return (
    <Container id="search">
      <Box id="topButtons">
        <IconButton id="homeButton" onClick={homeClick} >
          <HomeIcon />
        </IconButton>

        <IconButton id="mapButton" onClick={mapClick}>
          <MapIcon />
        </IconButton>
      </Box>

      <Box id="filter-box">
        <Typography id="filterTitle" variant="h4" sx={{ marginBottom: '.5em' }}>Filter Items</Typography>
        <FormControl fullWidth>
          {/* <InputLabel id="label">Category</InputLabel>
          <Select
            sx={{
              marginBottom: '1em',
            }}
            value={category}
            labelId="category-select-label"
            id="category-select"
            label="Category"
            onChange={handleChange}
          >
            <MenuItem value="phones">Phones</MenuItem>
            <MenuItem value="computers">Computers</MenuItem>
            <MenuItem value="consoles">Consoles</MenuItem>
          </Select> */}
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Condition</InputLabel>
          <Select
            value={condition}
            labelId="condition-select-label"
            id="condition-select"
            label="Condition"
            onChange={handleChange2}
            sx={{
              marginBottom: '.5em',
            }}
          >
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Open Box">Open Box</MenuItem>
            <MenuItem value="Like New">Like New</MenuItem>
            <MenuItem value="Good">Good</MenuItem>
            <MenuItem value="Fair">Fair</MenuItem>
            <MenuItem value="Broken">Broken</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box id="results">
        <List user={user} changeView={changeView} condition={condition} />
      </Box>
    </Container>
  );
}