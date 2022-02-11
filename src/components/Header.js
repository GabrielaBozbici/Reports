import Logo from '../assets/LogoB.svg'

import '../styles/Header.scss'

const Header = ({user}) => {
  return (
    <div className='header'>
      <div className="left-side">
        <img src={Logo} alt="logo" />
   
      </div>
      <div className="right-side">
        <div className='name-logo'>
          <p>{user? `${user.firstName[0]}${user.lastName[0]}` : ''}</p>
        </div>
       <p className='name'>{user? `${user.firstName} ${user.lastName}` : ''}</p>
      </div>
    </div>
  )
}

export default Header