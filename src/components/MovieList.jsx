import React from 'react';
import './MovieList.scss';
import axios from 'axios';
import MovieModal from './MovieModal';
import LoadingScreen from './LoadingSecreen';
import { 
    Form,
    Container,
    Button,
    InputGroup,
    ListGroup,
    Col,
    Row
} from 'react-bootstrap';

export default class MovieList extends React.Component {

    constructor(props){
        super(props);
        this.title = React.createRef();
        this.movies = ['aaa', 'bbb'];
        this.state = {
            movies: [],
            modal: false,
            current_modal: {},
            loading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFav = this.handleFav.bind(this);
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

    handleFav(id,e){
        e.preventDefault()
        // alert('test',id)
    }

    handleShowModal(imdbID) {
        console.log('handleShowModal clicked', imdbID)
        this.setOnLoading()
        axios.get(`http://www.omdbapi.com/?apikey=61a7922a&i=${imdbID}`)
            .then(res => {
                console.log(res.data)
                const new_current_modal = res.data
                const new_state = {
                    ...this.state,
                    modal: true,
                    current_modal: new_current_modal
                }
                this.setState(new_state)
                console.log(this.state)
                setTimeout(() => this.setOffLoading(), 200);
            })
            .catch(err => {
                console.log(err)
                setTimeout(() => this.setOffLoading(), 200);
            })
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
            axios.get(`http://www.omdbapi.com/?apikey=61a7922a&s=${this.title.current.value}`)
                .then(res => {
                    console.log(res)
                    if (res.data.Response === "True"){
                        let raw_movies = res.data.Search;
                        let movies = [];
                        for (let i = 0; i < raw_movies.length; i++) {
                            let movie = {
                                Poster: raw_movies[i].Poster,
                                Title: raw_movies[i].Title,
                                Type: raw_movies[i].Type,
                                Year: raw_movies[i].Year,
                                imdbID: raw_movies[i].imdbID,
                                Fav: false
                            }
                            movies.push(movie);
                        }
                        const new_state = {
                            ...this.state,
                            movies: movies,
                        }
                        this.setState(new_state)
                    }else{
                        const new_state = {
                            ...this.state,
                            movies: [],
                        }
                        this.setState(new_state)
                    }
                    setTimeout(() => this.setOffLoading(), 300);
                })
                .catch(err => {
                    console.log('eerrrror', err)
                    setTimeout(() => this.setOffLoading(), 300);
                })
        } else {
            alert("Upsss, title can't be empty")
        }
    }

    render() {
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
                                    {/* { this.state.search_loading
                                        ?<Spinner size="sm" animation="border" variant="light" />
                                        :<p className="search-text">Search Movie</p>
                                    } */}
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
                        this.state.movies.length
                        ? this.state.movies.map((object, i)=>{
                            return (
                                <div obj={object.imdbID} key={i}>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={5}>
                                                <p className="movie-title" onClick={() => this.handleShowModal(object.imdbID)}>{object.Title}</p>
                                            </Col>
                                            <Col md={2}>{object.Year}</Col>
                                            <Col md={3}>{object.imdbID}</Col>
                                            <Col md={2}>
                                                {
                                                    object.Fav
                                                    ? <img src={`../assets/golden-star.png`} alt="star"></img>
                                                    : <img src={`../assets/star.png`} alt="star"></img>
                                                }
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </div>
                            )
                        })

                        : <h4>not found</h4>
                    }
                </ListGroup>
                <MovieModal
                    onHideModal = {this.handleHideModal}
                    modal = {this.state.modal}
                    movie = {this.state.current_modal}
                ></MovieModal>
            </Container>
        )
    }
}