import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { SITE_COOKIES, COOKIES } from '../../utils/cookies';

interface IPrivateRouterProps {
  component: React.ElementType
}

const PrivateRouter = ({ component: Component, ...rest }: IPrivateRouterProps) => (
  <Route
    {...rest}
    render={(props) =>
      COOKIES.get(SITE_COOKIES.ACCESSTOKEN) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
)

PrivateRouter.defaultProps = {
  location: null,
}

PrivateRouter.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
}

export default PrivateRouter
