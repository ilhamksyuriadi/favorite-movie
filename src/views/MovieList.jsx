import React from 'react';
import './MovieList.scss';
import MovieModal from '../components/MovieModal';
import LoadingScreen from '../components/LoadingSecreen';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
    Form,
    Container,
    Button,
    InputGroup,
    ListGroup,
    Col,
    Row
} from 'react-bootstrap';
import { 
    searchMovie, 
    getMovie, 
    handleFav
} from '../actions/movieAction';

class MovieList extends React.Component {

    constructor(props){
        super(props);
        this.title = React.createRef();
        this.state = {
            modal: false,
            loading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickFav = this.handleClickFav.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleHideModal = this.handleHideModal.bind(this);
        this.setOnLoading = this.setOnLoading.bind(this);
        this.setOffLoading = this.setOffLoading.bind(this);
    }

    setOnLoading(){
        if(!this.state.loading){
            const new_state = {
                ...this.state,
                loading: true
            }
            this.setState(new_state)
        }
    }

    setOffLoading(){
        if(this.state.loading){
            const new_state = {
                ...this.state,
                loading: false
            }
            this.setState(new_state)
        }
    }

    handleClickFav(imdbID){
        this.props.handleFav(imdbID);
    }

    handleShowModal(imdbID) {
        this.setOnLoading();
        this.props.getMovie(imdbID);
        const new_state = {
            ...this.state,
            modal: true
        }
        this.setState(new_state);
        this.setOffLoading();
    }

    handleHideModal() {
        const new_state = {
            ...this.state,
            modal: false
        }
        this.setState(new_state)
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.title.current.value) {
            this.setOnLoading();
            console.log('submit clicked', this.title.current.value)
            this.props.searchMovie(this.title.current.value)
            setTimeout(() => this.setOffLoading(), 500);
        } else {
            alert("Upsss, title can't be empty")
        }
    }

    render() {
        const movie_list = this.props.movies.map((object, i)=>{
            return (
                <div obj={object.imdbID} key={i}>
                    <ListGroup.Item>
                        <Row>
                            <Col md={5}>
                                <p className="movie-title" onClick={() => this.handleShowModal(object.imdbID)}>{object.Title}</p>
                            </Col>
                            <Col md={2}>{object.Year}</Col>
                            <Col md={3}>{object.imdbID}</Col>
                            <Col md={2} className="fav-icon">
                                {
                                    object.Fav
                                    ? <img onClick={() => this.handleClickFav(object.imdbID)} src={`../assets/golden-star.png`} alt="star"></img>
                                    : <img onClick={() => this.handleClickFav(object.imdbID)} src={`../assets/star.png`} alt="star"></img>
                                }
                            </Col>
                        </Row>
                    </ListGroup.Item>
                </div>
            )
        })

        return(
            <Container>
                {
                    this.state.loading
                    ? <LoadingScreen></LoadingScreen>
                    : <span></span>
                }
                <Form onSubmit={this.handleSubmit} className="form-search">
                    <Form.Group>
                        <InputGroup>
                            <Form.Control ref={this.title} placeholder="Enter movie title, e.g. Avenger"></Form.Control>
                            <InputGroup.Append>
                                <Button className="search-button" variant="primary" type="submit">
                                    Search Movie
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                </Form>
                <ListGroup>
                    <ListGroup.Item>
                        <Row>
                            <Col md={5}><h5>Title</h5></Col>
                            <Col md={2}><h5>Year</h5></Col>
                            <Col md={3}><h5>Imdb ID</h5></Col>
                            <Col md={2}></Col>
                        </Row>
                    </ListGroup.Item>
                    {   
                        this.props.movies.length
                        ? movie_list
                        : <span></span>
                    }
                </ListGroup>
                <MovieModal
                    onHideModal = {this.handleHideModal}
                    modal = {this.state.modal}
                    movie = {this.props.current_modal}
                ></MovieModal>
            </Container>
        )
    }
}

MovieList.propTypes = {
    movies: PropTypes.array.isRequired,
    current_modal: PropTypes.object.isRequired,
    searchMovie: PropTypes.func.isRequired,
    getMovie: PropTypes.func.isRequired,
    handleFav: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    movies: state.data.movies,
    current_modal: state.data.current_modal
})

export default connect(mapStateToProps, { searchMovie, getMovie, handleFav } )(MovieList)