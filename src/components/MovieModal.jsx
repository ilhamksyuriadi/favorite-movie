import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { 
    Row,
    Col
 } from 'react-bootstrap';
import './MovieModal.scss';

export default class MovieModal extends React.Component{

    render() {
        return(
            <div>
                <Modal size="xl" show={this.props.modal} onHide={this.props.onHideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.movie.Title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col className="pic-wrapper" md={3}>
                                <span>
                                    <img className="temp-movie-pic" src="https://picsum.photos/200" alt=""/>
                                </span>
                            </Col>
                            <Col md={9}>
                                <Row>
                                    <p>
                                        <span className="bold-text">Plot: </span>
                                        {this.props.movie.Plot}
                                    </p>
                                </Row>
                                <Row>
                                    <p>
                                        <span className="bold-text">Actors: </span>
                                        {this.props.movie.Actors}
                                    </p>
                                </Row>
                                <Row>
                                    <p>
                                        <span className="bold-text">Genre: </span>
                                        {this.props.movie.Genre}
                                    </p>
                                </Row>
                                <Row>
                                    <p>
                                        <span className="bold-text">Rating: </span>
                                        {this.props.movie.imdbRating}
                                    </p>
                                </Row>
                                <Row>
                                    <p>
                                        <span className="bold-text">Writer: </span>
                                        {this.props.movie.Writer}
                                    </p>
                                </Row>
                                <Row>
                                    <p>
                                        <span className="bold-text">Director: </span>
                                        {this.props.movie.Director}
                                    </p>
                                </Row>
                                <Row>
                                    <p>
                                        <span className="bold-text">Production: </span>
                                        {this.props.movie.Production}
                                    </p>
                                </Row>
                                <Row>
                                    <p>
                                        <span className="bold-text">Released: </span>
                                        {this.props.movie.Released}
                                    </p>
                                </Row>
                                <Row>
                                    <p>
                                        <span className="bold-text">Year: </span>
                                        {this.props.movie.Year}
                                    </p>
                                </Row>
                                <Row>
                                    <p>
                                        <span className="bold-text">Duration: </span>
                                        {this.props.movie.Runtime}
                                    </p>
                                </Row>
                                <Row>
                                    <p>
                                        <span className="bold-text">Rated: </span>
                                        {this.props.movie.Rated}
                                    </p>
                                </Row>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}