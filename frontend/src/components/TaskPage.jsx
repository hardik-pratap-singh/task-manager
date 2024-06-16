import React, { useState, useEffect, useRef } from 'react'
import { TbPlaylistAdd } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

const TaskPage = () => {
    const ref = useRef(null);
    const secondref = useRef(null);
    const ref2 = useRef(null);


    const [task, setTask] = useState({
        title: "",
        desc: "",
        status: "Pending"
    })

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setTask({ ...task, [name]: value });
    }


    console.log(task);

    const handleClick = async (e) => {

        e.preventDefault();
        // here we will make an API call

        const response = await fetch('http://localhost:5000/tasks/addTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "token" : localStorage.getItem('token')
            },
            body: JSON.stringify({
                title: task.title,
                description: task.desc,
                status: task.status
            })
        })
        const data = await response.json();
        ref.current.click();
        // setAllTasks(data) ; 
        let tasks = [];

        // tasks.push(data) ;
        for (let i = 0; i < AllTasks.length; i++) {
            tasks.push(AllTasks[i]);
        }
        tasks.push(data.data);
        setAllTasks(tasks);
        setTask({
            title: "",
            desc: "",
            status: ""
        })
    }

    const handleDelete = async (task) => {
        const id = task._id;
        const response = await fetch(`http://localhost:5000/tasks/deleteTask/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "token" : localStorage.getItem('token')
            }
        })
        const data = await response.json();

        let tasks = [];
        for (let i = 0; i < AllTasks.length; i++) {
            if (AllTasks[i]._id != id)
                tasks.push(AllTasks[i]);
        }
        setAllTasks(tasks);

        console.log(data);
    }


    const [taskId, setTaskId] = useState(null);
    const openModal = (task) => {
        setTaskId(task._id);
        console.log(task);
        setTask({
            title: task.title,
            desc: task.description,
            status: task.status
        });

        secondref.current.click();
    }

    const handleUpdate = async (task) => {
        // e.preventDefault();
        // here we will make an API call
        // const id = task._id ; 
        const response = await fetch(`http://localhost:5000/tasks/updateTask/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "token" : localStorage.getItem('token')
            },
            body: JSON.stringify({
                title: task.title,
                description: task.desc,
                status: task.status
            })
        })
        const data = await response.json();

        ref2.current.click();

        let tasks = [];
        for (let i = 0; i < AllTasks.length; i++) {
            if (AllTasks[i]._id == taskId) {
                AllTasks[i].title = task.title;
                AllTasks[i].description = task.desc;
                AllTasks[i].status = task.status;

            }
            tasks.push(AllTasks[i]);
        }
        setAllTasks(tasks);

        setTask({
            title: "",
            desc: "",
            status: ""
        })
    }

    const [AllTasks, setAllTasks] = useState([]);
    useEffect(() => {
        const getTask = async () => {
            const response = await fetch("http://localhost:5000/tasks/getTask" , {
                headers: {
                    'Content-Type': 'application/json',
                    "token" : localStorage.getItem('token')
                },
            })
            const data = await response.json();

            console.log(data);
            setAllTasks(data);
            return data;
        }

        getTask();
    }, [])

    const handleFilterCompleted = async () => {
        const response = await fetch("http://localhost:5000/tasks/getCompletedTasks" , {
            headers: {
                'Content-Type': 'application/json',
                "token" : localStorage.getItem('token')
            },
        })
        const data = await response.json();
        setAllTasks(data);
    }

    const handleFilterPending = async () => {
        const response = await fetch("http://localhost:5000/tasks/getPendingTasks" , {
            headers: {
                'Content-Type': 'application/json',
                "token" : localStorage.getItem('token')
            },
        })
        const data = await response.json();
        setAllTasks(data);
    }

    const handleFilterShowAll = async () => {
        const response = await fetch("http://localhost:5000/tasks/getTask" , {
            headers: {
                'Content-Type': 'application/json',
                "token" : localStorage.getItem('token')
            },
        })
        const data = await response.json();
        setAllTasks(data);
    }



    const [searchkey, setSearchKey] = useState("");
    const handleSearchChange = async (e) => {
        setSearchKey(e.target.value);
        // console.log(searchkey) ; 
        // let searchkey = e.target.value

    }
    useEffect(() => {
        console.log("here", searchkey)
        if (searchkey.length === 0) {
            const getData = async () => {
                const response = await fetch(`http://localhost:5000/tasks/getTask`, {
                    headers: {
                        'Content-Type': 'application/json',
                        "token" : localStorage.getItem('token')
                    },
                })
                const data = await response.json();
                setAllTasks(data);
            }
            getData();
        }
        else {

            const getData = async () => {
                const response = await fetch(`http://localhost:5000/tasks/search/${searchkey}` , {
                    headers: {
                        'Content-Type': 'application/json',
                        "token" : localStorage.getItem('token')
                    },
                })
                const data = await response.json();
                setAllTasks(data);
            }
            getData();
        }
    }, [searchkey])

    const handleSearch = async (searchkey) => {
        const response = await fetch(`http://localhost:5000/tasks/search/${searchkey}` , {
            headers: {
                'Content-Type': 'application/json',
                "token" : localStorage.getItem('token')
            },
        })
        const data = await response.json();
        setAllTasks(data);
    }

    // console.log(searchkey) ;

    return (
        <div className='container'>
            <br />
            <br />
            <div className="d-flex justify-content-around my-4" style={{ alignItems: "center" }}>
                <div className="btn-group" style={{ width: "fit-content", height: "2.5rem", marginLeft: "-30px" }}>
                    <button type="button" className="font-weight-bold btn btn-primary">Filter</button>
                    <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul className="dropdown-menu" style={{ widht: "10rem" }}>
                        <li><button onClick={handleFilterCompleted} style={{ border: "none", backgroundColor: "white", marginLeft: "3px" }}>Completed Tasks</button></li>
                        <li><button onClick={handleFilterPending} style={{ border: "none", backgroundColor: "white", marginTop: "3px", marginLeft: "3px" }}>Pending Tasks</button></li>
                        <li><button onClick={handleFilterShowAll} style={{ border: "none", backgroundColor: "white", marginTop: "3px", marginLeft: "3px" }}>Show All Tasks</button></li>
                    </ul>
                </div>


                

                <div className="search d-flex justify-content-between" style={{ display: "flex", width: "18rem" }} >
                    <input className="form-control me-2" style={{ width: "20rem", marginLeft: "-41px" }} name="searchkey" onChange={handleSearchChange} value={searchkey} type="search" placeholder="Search By Title" aria-label="Search" />
                    <button onClick={() => handleSearch(searchkey)} className="btn btn-outline-success" type="submit">Search</button>
                </div>

                <div className="add">
                    {/* First Modal For Adding Task */}
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <TbPlaylistAdd style={{ "width": "2rem", "height": "2rem" }} />
                    </button>

                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add Task Here</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label for="title" className="form-label">Title</label>
                                        <textarea name="title" onChange={handleChange} value={task.title} className="form-control" id="title" rows="1"></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label for="desc" className="form-label">Description</label>
                                        <textarea name="desc" onChange={handleChange} value={task.desc} className="form-control" id="desc" rows="3"></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label for="status1" className="form-label">Status</label>
                                        <div className="form-check">
                                            <input checked={task.status === "Completed"} name="status" onChange={handleChange} value="Completed" className="form-check-input" type="radio" id="status" />
                                            <label className="form-check-label" for="status">
                                                Completed  </label>
                                        </div>
                                        <div className="form-check">
                                            <input checked={task.status === "Pending"} name="status" onChange={handleChange} value="Pending" className="form-check-input" type="radio" id="status" />
                                            <label className="form-check-label" for="status">
                                                Pending
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button ref={ref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onClick={handleClick} type="button" className="btn btn-primary">Add Task</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Second Modal For Updating Tasks */}
                    <button ref={secondref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#example2Modal">
                        Click Me
                    </button>

                    <div className="modal fade" id="example2Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Update Task Here</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label for="title" className="form-label">Title</label>
                                        <textarea name="title" onChange={handleChange} value={task.title} className="form-control" id="title" rows="1"></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label for="desc" className="form-label">Description</label>
                                        <textarea name="desc" onChange={handleChange} value={task.desc} className="form-control" id="desc" rows="3"></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label for="status1" className="form-label">Status</label>
                                        <div className="form-check">
                                            <input checked={task.status === "Completed"} name="status" onChange={handleChange} value="Completed" className="form-check-input" type="radio" id="status" />
                                            <label className="form-check-label" for="status">
                                                Completed  </label>
                                        </div>
                                        <div className="form-check">
                                            <input checked={task.status === "Pending"} name="status" onChange={handleChange} value="Pending" className="form-check-input" type="radio" id="status" />
                                            <label className="form-check-label" for="status">
                                                Pending
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button ref={ref2} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onClick={() => handleUpdate(task)} type="button" className="btn btn-primary">Update Task</button>
                                </div>


                            </div>
                        </div>
                    </div>


                </div>

            </div>

            <br /><br /><br /><br />

            {
                AllTasks.length === 0
                    ?
                    <>
                        <center>
                        <h5>No Tasks Found :(</h5>
                        </center>
                    </>
                    :
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Status</th>
                                <th scope="col">Update</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                AllTasks.map((task) => {
                                    return (<>
                                        <tr>
                                            <td>{task.title}</td>
                                            <td>{task.description}</td>
                                            <td><button type="button" className={`btn btn-${task.status === "Completed" ? "success" : "warning"}`} value={task.status === "Completed" ? "Completed" : "Pending"}>{task.status === "Completed" ? "Completed" : "Pending"}</button></td>
                                            <td><button onClick={() => openModal(task)} type="button" className={`btn btn-secondary`} ><FaEdit /></button></td>
                                            <td><button onClick={() => handleDelete(task)} type="button" className={`btn btn-danger`} ><AiFillDelete /></button></td>
                                        </tr>
                                    </>)
                                })
                            }
                            <tr>

                            </tr>
                            {/* <tr>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td><button type="button" className="btn btn-success">Completed</button></td>
                    </tr>
                    <tr>
                        <td>Mark</td>
                        <td>Otto</td>
                    </tr> */}

                        </tbody>
                    </table>
            }


        </div>
    )
}

export default TaskPage