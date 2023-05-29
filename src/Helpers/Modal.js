import { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class ModalDelete extends Component {

    state = {
        show: this.props.show
    }
    componentDidUpdate(prevProps) {
        if (prevProps.show !== this.props.show) {
            this.setState({
                show: this.props.show
            });
        }
    }


    handleClose = () => {
        this.props.onCancel(false);
    }

    handleSubmit = () => {
        this.props.onDelete(this.props.id);
    }

    render() {
        return (
            <Modal
                show={this.state.show}
                onHide={this.handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={this.handleSubmit}>Yes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ModalDelete;