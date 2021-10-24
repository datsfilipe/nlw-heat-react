import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"

import { Home } from './pages/Home'
import { Profile } from './pages/Profile'

export function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home" component={Home} />
        <Route path='/:login'>
          <Profile />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
