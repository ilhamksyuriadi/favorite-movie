import React from 'react';
import { connect } from 'react-redux';
import MovieModal from '../components/MovieModal';
import LoadingScreen from '../components/LoadingSecreen';
import PropTypes from 'prop-types';
import { getAllFavMovies, getMovie, handleFavList } from '../actions/movieAction';
import { 
    Container,
    ListGroup,
    Row,
    Col
} from 'react-bootstrap';

class FavoriteMovie extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            modal: false,
            loading: false
        };
        
        this.handleShowModal = this.handleShowModal.bind(this)
        this.handleHideModal = this.handleHideModal.bind(this)
        this.handleClickFav = this.handleClickFav.bind(this)
    }

    componentWillMount(){
        this.props.getAllFavMovies();
    }

    componentDidUpdate(prevProps){
        if (prevProps.fav_movies !== this.props.fav_movies) {
            console.log('changesssssssss')
        }
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
        console.log('handle fav clicked')
        this.props.handleFavList(imdbID);
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

    render() {
        const movie_list = this.props.fav_movies.map((object, i)=>{
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
                                <img onClick={() => this.handleClickFav(object.imdbID)} src={`../assets/golden-star.png`} alt="star"></img>                            </Col>
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
                <h1>FavoriteMovie Page</h1>
                <ListGroup>
                    {movie_list}
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

FavoriteMovie.propTypes = {
    getAllFavMovies: PropTypes.func.isRequired,
    getMovie: PropTypes.func.isRequired,
    handleFavList: PropTypes.func.isRequired,
    current_modal: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    fav_movies: state.data.fav_movies,
    current_modal: state.data.current_modal
})

export default connect(mapStateToProps, { getAllFavMovies, getMovie, handleFavList }) (FavoriteMovie)