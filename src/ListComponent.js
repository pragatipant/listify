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
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const ListComponent = (props) => { 
    const [input, setInput] = useState('');
    const [list, setList] = useState([]);
    const [showCal, setShowCal] = useState(false);
    const [calDate, setCalDate] = useState(new Date());
    const [done, complete] = useState(true);

    const addTask = () => { 
        if (input !== "") { 
            const taskToAdd = { 
                id: Math.random(),
                title: input,
                date: calDate,
                details: ''
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

    const editTask = (index) => { 
        let updatedList = [...list]; 
        const editedItemTitle = prompt('Edit the list item title:'); 
        const editedItemDetails = prompt('Edit the list item details:'); 
        if (editedItemTitle !== null && editedItemTitle.trim() !== '') { 
            updatedList[index].title= editedItemTitle 
            updatedList[index].details= editedItemDetails 
            setList(updatedList); 
        } 
    }

    const handleChange = (id)=>{
        const filteredList = list.filter((item) => item.id !== id);
            console.log(id)
            if(id ==="done")
            {
                if(done===true){
                    console.log(id)
              }

            }
            setList(filteredList); 
       
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
                                            {item.title} 
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
                                                <Button variant = "light"
                                                    onClick={() => editTask(id)}> 
                                                    Edit 
                                                </Button> 
                                              <input type = "checkbox" value={done} onChange={()=>handleChange("done")} /> done
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
