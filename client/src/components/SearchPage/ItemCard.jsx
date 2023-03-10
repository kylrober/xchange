import React from 'react';

import { styled } from '@mui/system';
import { Box, Avatar } from '@mui/material/';

const avatarSX = {
  marginBottom:'10px',
  boxShadow: `-8px -8px 12px rgba(232,242,255,0.8),
  8px 8px 12px rgba(0,0,0,0.25),
  inset -2px -2px 5px rgba(255,255,255,0.6),
  inset 2px 2px 4px rgba(0,0,0,0.3)`,
  marginTop: '5px',
  width: '75px',
  height: '75px',
  // border: '4px solid #CAF0F8',
  marginRight: '10px',
  marginLeft: '-8px',
}
const Box1 = styled('div')({
  justifyContent: 'center',
  alignContent: 'center',
  display: 'flex',
  bgcolor: '#CAF0F8',
  height: '10vh',

  borderRadius: '20px',
  width: '90%'
})

const Box2 = styled('div')({
  flexGrow: 1,
  alignContent: 'center',
  backgroundColor: '#00B4D8',
  borderRadius: '20px',
  paddingLeft: '20px',
  paddingTop: '18px',
  background: '#CAF0F8',
  boxShadow: `inset 2px 2px 3px #a4c2c9,
  inset -2px -2px 3px #f0ffff`,
  fontSize:'smaller'

})


const ItemCard = ({ item, changeView, user }) => {

const itemClick = (event) => {
  console.log('this item i want is ', item);
  console.log('this is the user I WANT ', user);
  // changeView('ItemDetails', {});
  changeView('ItemDetails', {currentUserId: user.id, currentItemId: item.id, changeview: changeView});
}


return (

  <Box1>
    <Box onClick={itemClick} sx={{
      display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center',
    }}>
      <Avatar src={item.thumbnail_url} sx={avatarSX}/>
    </Box>
    <Box2>
      <div> {item.name}</div>
      <div> Condition: {item.item_condition}</div>
      <div> Description: {item.description}</div>
    </Box2>

  </Box1>

);
}

export default ItemCard;