import React, { useState } from "react"; 
import "bootstrap/dist/css/bootstrap.css"; 
import Container from "react-bootstrap/Container"; 
import Row from "react-bootstrap/Row"; 
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"; 
import InputGroup from "react-bootstrap/InputGroup"; 
import FormControl from "react-bootstrap/FormControl"; 
import FormLabel from "react-bootstrap/FormLabel"; 
import ListGroup from "react-bootstrap/ListGroup"; 
import Calendar from 'react-calendar';
import Popup from 'reactjs-popup';
import Modal from 'react-modal';
import 'reactjs-popup/dist/index.css';
import Dropdown from 'react-bootstrap/Dropdown';


const ListComponent = (props) => { 
    const [input, setInput] = useState('');
    const [list, setList] = useState([]);
    const [showCal, setShowCal] = useState(false);
    const [calDate, setCalDate] = useState(new Date());
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentTaskPointer, setCurrentTaskPointer] = useState('');
    const [currentTaskTitleChangePointer, setCurrentTaskTitleChangePointer] = useState('');
    const [currentTaskDetailsChangePointer, setCurrentTaskDetailsChangePointer] = useState('');

    const addTask = () => { 
        if (input !== "") { 
            const taskToAdd = { 
                id: Math.random(),
                title: input,
                date: calDate,
                details: '',
                completed: false,
            };
            setList([...list, taskToAdd]);
            setInput('');
            setShowCal(false);
            setCalDate(new Date());
        } 
    } 

    const deleteTask = (id) => {
        const filteredList = list.filter((item) => item.id !== id); 
        setList(filteredList); 
    } 

    const editTask = () => {
        let updatedList = [...list];
        if (currentTaskPointer !== '') {    // update current task title and details
            updatedList[currentTaskPointer].title = currentTaskTitleChangePointer;
            updatedList[currentTaskPointer].details = currentTaskDetailsChangePointer;
            setList(updatedList);
        }
    }

    const updateIfCompleted = (index)=>{
        let updatedList = [...list]; 
         
        updatedList[index].completed=true; 
        setList(updatedList);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    function openModal(id) {
        setCurrentTaskPointer(id);  // can only edit one task at a time
                                    // so add a tracker for what task that is
        setModalIsOpen(true);
    }


    function closeModal() {
        setModalIsOpen(false);
        editTask();
    }

    const filterTasks = (filterBy) => { 
        // how do I sort the listgroup???
        switch(filterBy) {
            case "dateCreated":
                // filter by date itmes were created
                break;
            case "title":
                // filter alphabetically based on title
                break;
            case "details":
                // filter alphabetically based on details
                break;
            case "dueDate":
                // filter on the due date of the item
                break;
            default:
              // filter by date itmes were created...as it already does
          }
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
                                aria-label="add-item"
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
                        <InputGroup className="mb-3">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Order By
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/dateCreated" onSelect={() => filterTasks("dateCreated")}>Date Created</Dropdown.Item>
                                    <Dropdown.Item href="#/title" onSelect={() => filterTasks("title")}>Title</Dropdown.Item>
                                    <Dropdown.Item href="#/details" onSelect={() => filterTasks("details")}>Details</Dropdown.Item>
                                    <Dropdown.Item href="#/dueDate" onSelect={() => filterTasks("dueDate")}>Due Date</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
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
                                                <span style={item.completed ? {textDecoration:"line-through"} : null} >
                                                    {item.title}
                                                </span>
                                            <span> 
                                                <Popup trigger={
                                                    <Button style={{marginRight:"10px"}}
                                                        variant = "light"> 
                                                        View 
                                                    </Button> 
                                                    } position="right center">
                                                        <div><b>Title:</b> {item.title}</div>
                                                        <div><b>Details:</b> {item.details}</div>
                                                        <div><b>Due Date:</b> {item.date.toDateString().toString()}</div>
                                                </Popup>
                                                
                                                <Button style={{marginRight:"10px"}} 
                                                    variant = "light"
                                                    onClick={() => deleteTask(item.id)}> 
                                                    Delete 
                                                </Button>
                                                <Button style={{marginRight:"10px"}}
                                                    variant = "light"
                                                    onClick={() => openModal(id)}> 
                                                    Edit 
                                                </Button> 
                                                <Button variant = {item.completed ? "dark" : "light"}
                                                    onClick={() => updateIfCompleted(id)}>
                                                    Done
                                                </Button> 
                                            </span> 
                                        </ListGroup.Item> 
                                    </div> 
                                ); 
                            })} 
                        </ListGroup> 
                    </Col> 
                </Row>
                <Row>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Editing Modal"
                    >
                        <FormLabel>New Task Title</FormLabel>
                        <FormControl 
                                placeholder="Add new title"
                                size="md"
                                onChange={(title) => setCurrentTaskTitleChangePointer(title.target.value)} 
                                aria-label="edit-item-title"
                                aria-describedby="basic-addon2"
                            />
                            <br/>
                            <FormLabel>New Task Details</FormLabel>
                             <FormControl 
                                placeholder="Add new details"
                                size="md"
                                onChange={(details) => setCurrentTaskDetailsChangePointer(details.target.value)} 
                                aria-label="edit-item-details"
                                aria-describedby="basic-addon2"
                            />
                        <br/>
                        <Button onClick={closeModal}>Save</Button>
                    </Modal>
                </Row>
            </Container> 

        ) 
} 

export default ListComponent; 
