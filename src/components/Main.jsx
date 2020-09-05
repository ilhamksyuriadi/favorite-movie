import React from 'react';
import MovieList from './MovieList';
import FavoriteMovie from './FavoriteMovie';
import Home from './Home';
import './Main.scss'
import { 
    BrowserRouter, 
    Route, 
    Switch, 
    NavLink,
} from 'react-router-dom';
import { 
    Button,     
    Row,
    Col,
    Container
} from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from '../store';

export default class Main extends React.Component {
    render() {
        return(
            <Provider store={store}>
                <Container>
                    <Row className="title justify-content-between align-items-center py-2">
                        <Col className="d-flex">
                            <img src={`../assets/multimedia.png`} alt="logo"/>
                            <h1>Movie List App</h1>
                        </Col>
                    </Row>
                    <BrowserRouter>
                        <Row>
                            <Col>
                                <NavLink to="/movielist">
                                    <Button variant="info" size="sm" block>Search Movie</Button>
                                </NavLink>
                            </Col>
                            <Col>
                                <NavLink to="/favoritemovie">
                                    <Button variant="warning" size="sm" block>Favorite Movie</Button>
                                </NavLink>
                            </Col>
                        </Row>
                        <Row>
                            <Col><div className="separator"></div></Col>
                        </Row>
                        <Switch>
                            <Route exact path='/' component={Home}></Route>
                            <Route exact path='/movielist' component={MovieList}></Route>
                            <Route exact path='/favoritemovie' component={FavoriteMovie}></Route>
                        </Switch>
                    </BrowserRouter>
                </Container>
            </Provider>
        )
    }
}