import { Component } from "react";
import { Button, Col, Row, Modal, Form } from "react-bootstrap";
import ModalDelete from "./Modal";

class Task extends Component {
    state = {
        tasks: this.props.tasks,
        selectedTasks: new Set(),
        selectAll: this.props.selectAll,
        show: false,
        editTaskId: "",
        deleteTaskId: "",
        taskName: "",
        taskDesc: "",
        showTwo: false
    }

    componentDidUpdate(prevProps) {
        if (prevProps.tasks !== this.props.tasks) {
            this.setState({
                tasks: this.props.tasks
            });
            this.props.onSendTasks(this.props.tasks)
        }
    }

    selectTask = (taskid) => {
        const selectedTask = this.state.selectedTasks
        if (selectedTask.has(taskid)) {
            selectedTask.delete(taskid)
        } else {
            selectedTask.add(taskid)
        }
        const selectAll = selectedTask.size === this.state.tasks.length
        this.setState({
            selectedTask,
            selectAll
        })
        this.props.onSendSelectAll(this.state.selectAll)
        this.props.onSendSelectedTasks(this.state.selectedTasks)
    }

    editTask = () => {
        const taskId = this.state.editTaskId
        let editTask = this.state.tasks.map((e) => {
            if (e._id === taskId) {
                e.title = (this.state.taskName !== "") ? this.state.taskName : e.title
                e.desc = (this.state.taskDesc !== "") ? this.state.taskDesc : e.desc
            }
            return e
        })
        console.log(editTask)
        this.setState({
            tasks: editTask,
            show: false,
            editTaskId: "",
            taskName: "",
            taskDesc: "",
        })
    }

    render() {
        const { tasks, show } = this.state;
        const taskComp = tasks.map((el) => {
            return <Col md={4} sm={6} key={el._id} className="border border-2 p-2">
                <input type="checkbox" onChange={() => { this.selectTask(el._id) }}></input>
                <h3>Name : {el.title}</h3>
                <h5>Description : {el.desc}</h5>
                <h6>Date: {el.date}</h6>
                <Button variant="danger" onClick={() => {
                    this.setState({ showTwo: true, deleteTaskId: el._id })
                }}>Delete</Button>
                <Button variant="success" className="ms-3" onClick={() => {
                    this.setState({
                        show: true,
                        editTaskId: el._id
                    })
                }}>Edit</Button>
            </Col >
        })

        return (
            <>
                {taskComp}
                <ModalDelete show={this.state.showTwo} id={this.state.deleteTaskId} onCancel={(param) => this.setState({ showTwo: param })} onDelete={(param) => {
                    this.props.deleteTask(param)
                    this.setState({
                        deleteTaskId: "",
                        showTwo: false
                    })
                }} />
                <Row>
                    <Col>
                        <Modal
                            show={show}
                            onHide={() => {
                                this.setState({
                                    show: false,
                                    editTaskId: ""
                                })
                            }}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Task</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Control size="lg" className="mb-2" placeholder="Enter Task Name"
                                    onChange={(e) => {
                                        this.setState({
                                            taskName: e.target.value
                                        })
                                    }}
                                ></Form.Control>
                                <Form.Control size="lg" placeholder="Enter Task Description"
                                    onChange={(e) => {
                                        this.setState({
                                            taskDesc: e.target.value
                                        })
                                    }}
                                ></Form.Control>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => {
                                    this.setState({
                                        show: false,
                                        editTaskId: ""
                                    })
                                }}>
                                    Cancel
                                </Button>
                                <Button variant="primary" onClick={this.editTask}>Edit</Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
            </>
        )
    }
}

export default Task