import React, { useState, useEffect } from 'react';
import { Box, Container, Avatar } from '@mui/material/';
import PendingTrades from './PendingTrades';
import ItemsForTrade from './ItemsForTrade';
import BookmarkedItems from './BookmarkedItems'
import AddItem from './AddItem';
import { styled } from '@mui/system';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

const PictureContainer = styled('div')({
  backgroundColor: '#0077B6',
  paddingTop: 0,
  paddingLeft: 0,
  paddingRight: 0,
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column' ,
  alignContent:'center',
  flexWrap: 'wrap',
});

const Box1 = styled('div')({
  backgroundColor: '#0077B6',
  alignContent: 'center',
  flexWrap: 'wrap',
  display: 'flex',
  flexDirection: 'column' ,
  justifyContent: 'center',
  marginBottom: '20px'
});
const Box2 = styled('div')({
  backgroundColor: '#0077B6',
  alignContent: 'center',
  flexWrap: 'wrap',
  display: 'flex',
  flexDirection: 'column' ,
  justifyContent: 'center',
  textAlign: 'center',
  color: '#CAF0F8',
  marginTop: '10px'

});
const avatarSX = {
  marginBottom:'10px',
  boxShadow: `16px 16px 50px #00507a,
  -16px -16px 50px #009ef2`,
  marginTop: '15px',
  width: '200px',
  height: '200px',
  border: '7px solid #0077B6',

}

function Profile({user, changeView, props}) {
  const [addItem, setAddItem] = useState(false);

  const [userName, setUserName] = useState('')
  const [userImage, setUserImage] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [itemsData, setItemsData] = useState([])
// props.changeView
  useEffect(() => {
    // console.log('CURRENT USER', user)
      setUserName(user.name)
      setUserImage(user.thumbnail_url || 'https://pixabay.com/get/g1afe26f7edde7491e900b71f291b611f87cf6ae6829e31d2af7f30b0631e698b892d6bba3cfaedb1feb22d49b5fd43ce2ddd8f048c3806efe8a8ee2a9d0347c2c1d6696b5dd38af33fbc4ba7fdccd4f7_640.png')
      setUserDescription(user.description)
    },[user])

  //GET ITEMS FOR CURRENT USER

  useEffect(() => {
    axios.get(`/items/user/${user.id}`).then((res) => {
      setItemsData(res.data);
    });
  }, [addItem]);

  const handleSearch = () => {
   changeView('Search', {})
  }

  return (
    <>
      {!addItem
          && (
          <PictureContainer >
                   <SearchIcon onClick={handleSearch}sx={{
    boxShadow: `-5px -5px 10px #00507a,
    5px 5px 10px #009ef2`,
  borderRadius: '2000px',
  backgroundColor: '#0077B6',
  border: 'none',
  color: '#CAF0F8',
  marginTop: '15px',
  marginLeft: '10px',
  zIndex: 1000,
  width: '30px',
  height: '30px',
  padding: '10px'
}}/>
            <Box1>
              <Avatar sx={avatarSX} src={userImage}/>
              <Box2>
              <div>Hello {userName}</div>
              <div>"{userDescription}"</div>
              </Box2>
            </Box1>

            <ItemsForTrade changeView={changeView} user={user} itemsData={itemsData} setAddItem={setAddItem} addItem={addItem}  />
            <PendingTrades  changeView={changeView} userData={user} />
            <BookmarkedItems user={user} userData={user} changeView={changeView}/>
          </PictureContainer>
          )}
      {addItem
          && (
            <AddItem user={user} setAddItem={setAddItem} addItem={addItem} />
          )}
    </>

  );
}
export default Profile