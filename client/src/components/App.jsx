import React, { useState , useEffect} from 'react';
import axios from 'axios';
import Auth from './Auth';
import Profile from './ProfilePage';
import Map1 from './SearchPage/Map';
import SearchPage from './SearchPage/index.jsx';
import Item from './ItemDetails/index.jsx';

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') ?? 'null'));
  const [view, setView] = useState({ name: 'Auth', props: { setUser } });
  // const [view, setView] = useState({ name: 'Profile', props: { setUser } });
  // const [view, setView] = useState({ name: 'SearchPage', props: { setUser } });
  // const [view, setView] = useState({ name: 'Map', props: { setUser } });
  // const [view, setView] = useState({ name: 'ItemDetails', props: { setUser } });

  const changeView = (viewName, viewProps, isCallback = false) => (
    !isCallback ? setView({ name: viewName, props: viewProps })
      : () => setView({ name: viewProps, props: viewName })
  );

  const renderView = () => {
    switch (view.name) {
      case 'Auth':
        if (!user) return <Auth props={view.props} />;
        changeView('Profile', { user, changeView });
        break;
      case 'Profile':
        return <Profile changeView={changeView} props={view.props} />;
      case 'SearchPage':
        return <SearchPage changeView={changeView} props={view.props} ß/>;
      case 'Map':
        return <Map1 changeView={changeView} props={view.props} ß/>;
      case 'ItemDetails':
        return <Item changeView={changeView} props={view.props} />;
      default:
        return null;
    }
    return null;
  };

  return renderView();
}
