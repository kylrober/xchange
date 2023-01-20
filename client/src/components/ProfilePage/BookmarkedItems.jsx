import React, { useState, useEffect } from 'react';
import { Button, Container, Box } from '@mui/material/';
// eslint-disable-next-line import/no-extraneous-dependencies
import AddIcon from '@mui/icons-material/Add';
import ItemEntry from './ItemEntry';
import {styled} from '@mui/system'
import axios from 'axios';

const Box1 = styled('div')({
  backgroundColor: '#0077B6',
  alignContent: 'center',
  flexWrap: 'wrap',
  display: 'flex',
  flexDirection: 'column' ,
  justifyContent: 'flex-start',
  boxShadow: `-5px -5px 10px #00507a,
  5px 5px 10px #009ef2`,
  borderRadius: '30px',
  marginBottom: '35px',
  paddingBottom: '20px',
  width: '100%',
  marginTop: '18px'
});
const Box2 = styled('div')({
  backgroundColor: '#CAF0F8',
  alignContent: 'flex-end',
  flexWrap: 'wrap',
  display: 'flex',
  justifyContent: 'center',


});
const Title = styled('div')({
  textAlign: 'center',
  fontSize: 'larger',
  marginTop:'10px'

})
const AddButton = styled('button')({
  width: '80px',
  height: '25px',
  boxShadow: `5px 5px 10px #9ab6bc,
  -5px -5px 10px #faffff`,
  borderRadius: '10px',
  backgroundColor: '#CAF0F8',
  border: 'none',
  color: '#CAF0F8',
  marginTop: '15px'
})
const buttonSX = {
  "&:hover": {
    boxShadow: `-1px -1px 5px rgba(210,243,255,0.6),
    1px 1px 5px rgba(0,0,0,0.3)`
  },
};

function BookmarkedItems ({user, changeView}) {

  const [bookmarkedForUser, setBookmarkedForUser] = useState([]);

  console.log('props in bookmarked items ', user.id);

  const getBookmarkedItems = () => {
    console.log('clicked, fetching data');
    axios.get('http://localhost:8080/bookmarks', {
      params: {
        id: user.id,
      },
    }
    )
      .then((result) => {
        console.log('BOOKMARKED ITEMS ARE ', result.data);
        setBookmarkedForUser(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getBookmarkedItems();
  }, [user.id])
  // useEffect(() => {
  //   getBookmarkedItems();
  // }, [])


  return (
      <Box1 >
        <Title sx={{color: '#CAF0F8',}}>Bookmarked Items</Title>
        {bookmarkedForUser.map((item, key) => <ItemEntry user={user} item={item} key={key} changeView={changeView}/>)
        }
        <Box2>
        </Box2>
      </Box1>
  );
}
export default BookmarkedItems;