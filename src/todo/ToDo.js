import { Component } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import IdGenerator from "../IdGenerator/IdGenerator";
import css from './todo.module.css'

class ToDo extends Component {

    state = {
        taskName: "",
        tasks: []
    }

    handleChange = (e) => {
        this.setState({
            taskName: e.target.value
        })
    }

    add = () => {

        const nameValue = this.state.taskName.trim()

        if (!nameValue) {
            return
        }

        const newTask = {
            title: nameValue,
            _id: IdGenerator()
        }


        const tasks = [...this.state.tasks, newTask]

        this.setState({
            taskName: "",
            tasks
        })
    }
    render() {
        const { taskName, tasks } = this.state

        const taskComp = tasks.map((el) => {
            return <Col key={el._id} className={css.taskName}>
                Name : {el.title}
            </Col>
        })

        return (
            <Container>
                <Row>
                    <h1 className={css.center}>To Do List </h1>
                </Row>
                <Row>
                    <Col>
                        <Form.Control size="lg" className={css.input} type="text" placeholder="Enter Task Name" onChange={this.handleChange} value={this.state.taskName}></Form.Control>
                        <Button className={css.btn} onClick={this.add}>Add</Button>
                    </Col>
                </Row>
                <Row>
                    {taskComp}
                </Row>
            </Container >
        )
    }
}

export default ToDo