import { Link } from 'react-router-dom';

const Navigation = () => {
  interface NavigationItemProps {
    title: string;
    link: string;
  }

  const NavigationItem = ({ title, link }: NavigationItemProps) => {
    return (
      <div style={navigationItemStyle}>
        <div style={{width: '1em', height: '1em', backgroundColor: 'blue'}}> </div>
        <Link to={link}>{title}</Link>
      </div>
    )
  }

  const navigationItemStyle: React.CSSProperties = {
    width: '100%',
    height: '2em',
    fontWeight: '900',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0 0 0 1em', // top, right, bottom, left
    gap: '1em',
    // justifyContent: 'center',

  }

  const navigationStyle: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '1em',
  }

  return (
    <div style={navigationStyle}>
      <NavigationItem title={'Today'} link='/' />
      <NavigationItem title={'Diary View'} link='/DiaryView' />
      <NavigationItem title={'All Diaries'} link='/AllDiaries' />
      <NavigationItem title={'Calendar'} link='/Calendar' />
      <NavigationItem title={'Testing'} link='/Testing' />
      <NavigationItem title={'Settings'} link='/Settings' />
    </div>
  )
}

export default Navigation