import { Component } from "react";
import { Button, Col, Container, Form, Row, FormCheck } from "react-bootstrap";
import IdGenerator from '../Helpers/IdGenerator'
import Task from "../Helpers/Task";
import ModalDelete from "../Helpers/Modal";

class ToDo extends Component {

    state = {
        taskName: "",
        taskDesc: "",
        tasks: [],
        selectedTasks: new Set(),
        selectAll: false,
        showTwo: false
    }


    handleChangeName = (e) => {
        this.setState({
            taskName: e.target.value
        })
    }

    handleChangeDesc = (e) => {
        this.setState({
            taskDesc: e.target.value
        })
    }


    add = () => {
        const nameValue = this.state.taskName.trim()
        const descValue = this.state.taskDesc.trim()
        if (!nameValue && !descValue) {
            return
        }
        const newTask = {
            title: nameValue,
            desc: descValue,
            _id: IdGenerator(),
            date: new Date().toDateString()
        }
        const tasks = [...this.state.tasks, newTask]
        this.setState({
            taskName: "",
            taskDesc: "",
            tasks: tasks
        })
    }

    deleteSelected = () => {
        const selectedTasks = this.state.selectedTasks
        const tasks = this.state.tasks
        const newTasks = tasks.filter((task) => !selectedTasks.has(task._id))

        this.setState({
            selectedTasks: [],
            tasks: newTasks,
            selectAll: false
        })
    }


    deleteTask = (id) => {
        const newTasks = this.state.tasks.filter((el) => el._id !== id)
        this.setState({
            tasks: newTasks,
        })
    }

    selectAll = () => {
        this.setState({
            selectedTasks: (this.state.selectedTasks.size === this.state.tasks.length) ? new Set() : new Set(this.state.tasks.map((el) => el._id)),
            selectAll: (this.state.selectedTasks.size === this.state.tasks.length)
        })
    }

    render() {

        const { taskName, taskDesc, tasks, selectedTasks, selectAll } = this.state
        return (
            <Container>
                <Row>
                    <h1>To Do List </h1>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Control size="lg" className="mb-2" placeholder="Enter Task Name" onChange={this.handleChangeName} value={taskName}></Form.Control>
                        <Form.Control size="lg" placeholder="Enter Task Description" onChange={this.handleChangeDesc} value={taskDesc}></Form.Control>
                        <Button onClick={this.add} className="mt-2" disabled={!taskName.length || !taskDesc.length}>Add</Button>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6} md={3} className="d-flex align-items-center justify-content-between ">
                        <Button variant="danger" onClick={() => { this.setState({ showTwo: true }) }} disabled={!selectedTasks.size}>Delete Selected</Button>
                        <FormCheck type="checkbox" label="Select All" disabled={!tasks.length} onChange={this.selectAll} checked={selectAll}></FormCheck>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Task tasks={tasks} deleteTask={this.deleteTask} selectAll={selectAll}
                        onSendSelectedTasks={
                            (param) => {
                                this.setState({
                                    selectedTasks: param
                                })
                            }
                        }
                        onSendTasks={
                            (param) => {
                                this.setState({
                                    tasks: param
                                })
                            }
                        }
                        onSendSelectAll={
                            (param) => {
                                this.setState({
                                    selectAll: param
                                })
                            }
                        }
                    />
                </Row>
                <ModalDelete show={this.state.showTwo} onCancel={(param) => this.setState({ showTwo: param })} onDelete={(param) => {
                    this.deleteSelected()
                    this.setState({
                        showTwo: false
                    })
                }} />
            </Container >
        )
    }
}

export default ToDo