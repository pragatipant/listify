import React, { useState } from "react"; 
import "bootstrap/dist/css/bootstrap.css"; 
import Container from "react-bootstrap/Container"; 
import Row from "react-bootstrap/Row"; 
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"; 
import InputGroup from "react-bootstrap/InputGroup"; 
import FormControl from "react-bootstrap/FormControl"; 
import ListGroup from "react-bootstrap/ListGroup";
import Calendar from 'react-calendar';

const ListComponent = (props) => { 
    const [input, setInput] = useState('');
    const [list, setList] = useState([]);
    const [showCal, setShowCal] = useState(false);
    const [calDate, setCalDate] = useState(new Date());

    const addTask = () => { 
        if (input !== "") { 
            const taskToAdd = { 
                id: Math.random(),
                value: input, 
                date: calDate,
            };
            setList([...list, taskToAdd]);
            setInput('');
            setCalDate(new Date());
        } 
    } 

    const deleteTask = (id) => {
        const filteredList = list.filter((item) => item.id !== id); 
        setList(filteredList); 
    } 

    const editTask = (index) => { 
        /* add here */
    } 

    return(
            <Container> 
                <Row 
                    style={{ 
                        display: "flex", 
                        justifyContent: "center", 
                        alignItems: "center", 
                        fontSize: "3rem", 
                        fontWeight: "bolder",}}> 
                    Listify 
                </Row> 
                <Row 
                    style={{ 
                        display: "flex", 
                        justifyContent: "center", 
                        alignItems: "center", 
                        fontSize: "1rem", 
                        fontWeight: "bolder",}}> 
                    The better way to organize. 
                </Row> 
                <hr /> 
                <Row> 
                    <Col md={{ span: 5, offset: 4 }}> 
                        <InputGroup className="mb-3"> 
                            <FormControl 
                                placeholder="Add your to do items here!"
                                size="lg"
                                value={input} 
                                onChange={(item) => setInput(item.target.value)} 
                                aria-label="add something"
                                aria-describedby="basic-addon2"
                            />
                            <Button 
                                variant="info"
                                className="btn-lg"
                                onClick={() => setShowCal(!showCal)}>
                                {calDate.toDateString().toString()}
                            </Button>  
                            <Button 
                                variant="dark"
                                className="btn-lg"
                                onClick={() => addTask()}> 
                                ADD 
                            </Button>  
                            {showCal && <Calendar minDate={new Date()} onChange={setCalDate} value={calDate}/>}
                        </InputGroup> 
                    </Col> 
                </Row> 
                <Row> 
                    <Col md={{ span: 5, offset: 4 }}> 
                        <ListGroup> 
                            {list.map((item, id) => { 
                                return ( 
                                    <div key = {id} > 
                                        <ListGroup.Item 
                                            variant="dark"
                                            action 
                                            style={{display:"flex", justifyContent:'space-between'}}> 
                                            {item.value + "\n Due: " + item.date}
                                            <span> 
                                                <Button style={{marginRight:"10px"}} 
                                                    variant = "light"
                                                    onClick={() => deleteTask(item.id)}> 
                                                    Delete 
                                                </Button> 
                                                <Button variant = "light"
                                                    onClick={() => editTask(id)}> 
                                                    Edit 
                                                </Button> 
                                            </span> 
                                        </ListGroup.Item> 
                                    </div> 
                                ); 
                            })} 
                        </ListGroup> 
                    </Col> 
                </Row> 
            </Container> 
        ) 
} 

export default ListComponent; 
