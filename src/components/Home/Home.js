import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { SidePanel } from './SidePanel'
import { fetchCurrentLevel } from '../../store/reducers/currentLevel'

class Home extends Component {
  async componentDidMount() {
    const userId = this.props.currentUser

    if (userId) {
      this.props.getLevel(userId)
    }
  }

  componentDidUpdate() {
    const userId = this.props.currentUser
    this.props.getLevel(userId)
  }

  render() {
    if (!this.props.currentUser && this.props.isAuthorized === false) {
      return <Redirect to='/login' />
    }
    return (
      <div className='home'>
        <div id='skill-tree' className='card'>
          <div className='level-selector'>
            <div className='icon-background-circle'>
              <Link to='/questions/1'>
                <img
                  className='game-icon'
                  src='/icons/icon01.png'
                  alt='Level One'
                />
              </Link>
            </div>
            <Link to='/questions/1'>
              <h3>Level One</h3>
            </Link>
          </div>
          <div className='level-selector'>
            <div className='icon-background-circle'>
              <Link to='/questions/2'>
                <img
                  className='game-icon'
                  src='/icons/icon02.png'
                  alt='Level Two'
                />
              </Link>
            </div>
            <Link to='/questions/2'>
              <h3>Level Two</h3>
            </Link>
          </div>
          <div className='level-selector'>
            <div className='icon-background-circle'>
              <Link to='/questions/3'>
                <img
                  className='game-icon'
                  src='/icons/icon03.png'
                  alt='Level Three'
                />
              </Link>
            </div>
            <Link to='/questions/3'>
              <h3>Level Three</h3>
            </Link>
          </div>
          <div className='level-selector'>
            <div className='icon-background-circle'>
              <Link to='/questions/4'>
                <img
                  className='game-icon'
                  src='/icons/icon04.png'
                  alt='Level Four'
                />
              </Link>
            </div>
            <Link to='/questions/4'>
              <h3>Level Four</h3>
            </Link>
          </div>
        </div>
        <div id='side-panel'>
          <SidePanel />
        </div>
      </div>
    )
  }
}

const mapToState = state => ({
  currentUser: state.currentUser,
  isAuthorized: state.isAuthorized,
  currentLevel: state.currenLevel
})

const mapDispatchToProps = dispatch => {
  return {
    getLevel: user => dispatch(fetchCurrentLevel(user))
  }
}

export default connect(
  mapToState,
  mapDispatchToProps
)(Home)
