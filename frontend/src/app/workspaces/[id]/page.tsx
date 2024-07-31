"use client"
import React, { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { FiAlignLeft } from "react-icons/fi";
import Taskbutton from "@/components/Taskbutton";
import { useAppDispatch, useAppSelector } from "../../../redux/lib/hooks";
import { useParams, useRouter } from "next/navigation";
import { checkAuth } from "@/redux/features/userSlice";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";


type Task = {
    _id: string;
    title: string;
    description: string;
    priority: string;
    deadline: string;
    columns: string;
    createdAt: string;
    status: string;
};
interface TaskUpdate {
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
    deadline?: string; 
    assignedTo?: string;
    columns?: string;
  }
  
let handleTaskUpdate = async (taskId: string, updates: TaskUpdate): Promise<void> => {
    console.log(updates)
    try {
      const response = await fetch(`http://localhost:8000/taskhive/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(updates),
        credentials:"include"
      });
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
  
      const updatedTask = await response.json();
      console.log('Task updated successfully:', updatedTask);
    } catch (error) {
      console.error(error);
    }
  };
const columns = ["todo", "inprogress", "review", "done"];

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const router = useRouter();

    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await fetch(`http://localhost:8000/taskhive/workspaces/${id}/tasks`, {
                    credentials: "include"
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch tasks");
                }
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks", error);
            }
        }
        fetchTasks();
    }, [id]);

    const { isAuthenticated, user, loading, error } = useAppSelector(
        (state) => state.user
    );

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated === false) {
            router.push("/auth");
        }
    }, [isAuthenticated, router]);

    const handleDragEnd =async (event: any) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            console.log(over.id)
            setTasks(tasks.map((task) =>
                task._id === active.id ? { ...task, columns: over.id } : task
            ));
            console.log(tasks)
           const task= tasks.find((task) => task._id === active.id);
           console.log(task);
           if (task) {
            try {
               
                 await handleTaskUpdate(task._id,task);
                 toast.success("Task updated successfully")
            } catch (err) {
              console.error(err);
            }
          }
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="p-6 w-full">
                <div className="w-full bg-white flex flex-wrap justify-center rounded-md p-4">
                    {columns.map((column) => (
                        <Column
                            key={column}
                            id={column}
                            tasks={tasks?.filter((task) => task.columns === column)}
                            
                        />
                    ))}
                </div>
            </div>
        </DndContext>
    );
}

function Column({ id, tasks }: { id: string; tasks: Task[] }) {
    const { setNodeRef, isOver } = useDroppable({
        id,
    });

    return (
        <div ref={setNodeRef} className="w-full md:w-1/4 p-4">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-xl tracking-[0.08rem] ">{id.replace(/^\w/, (c) => c.toUpperCase())}</h3>
                <FiAlignLeft className="text-gray-500" size={20} />
            </div>
            {tasks?.map((task) => (
                <Draggable key={task._id} id={task._id}>
                    <TaskCard task={task} />
                </Draggable>
            ))}
            <Taskbutton colid={id} />
        </div>
    );
}





const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
    const priorityColors = {
        Low: 'bg-green-500',
        Medium: 'bg-yellow-500',
        High: 'bg-orange-500',
        Urgent: 'bg-red-500'
    };

    const getTimeAgo = (dateString: string) => {
        const now = new Date();
        const past = new Date(dateString);
        const diffTime = Math.abs(now.getTime() - past.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
    };

    const handleDelete =async (id:string) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                const response = await fetch(`http://localhost:8000/taskhive/tasks/${id}`, {
                  method: 'DELETE',
                  credentials: "include"
                });
            
                if (!response.ok) {
                  throw new Error('Failed to delete task');
                }
            
                console.log('Task deleted successfully');
              } catch (error) {
                console.error(error);
              }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 relative">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">{task.title}</h2>
            <p className="text-sm text-gray-600 mb-3">{task.description}</p>
            <div className="flex justify-between items-center">
                <span className={`text-xs font-bold px-2 py-1 rounded-full text-white ${priorityColors[task.priority]}`}>
                    {task.priority}
                </span>
                <span className="text-xs text-gray-500">
                    {getTimeAgo(task.createdAt)}
                </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
                Deadline: {new Date(task.deadline).toLocaleDateString()}
            </p>
            <MdDelete
              size={40}
                onClick={()=>handleDelete(task._id)}
                className="absolute top-2 right-2 text-red-500 px-2 py-1 rounded-md transition-colors duration-200"
            />
                
            
        </div>
    );
};

function Draggable({ id, children }: { id: string, children: React.ReactNode }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    });
    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
            marginBottom: "10px",
        }
        : { marginBottom: "10px" };

    return (
        <div
            ref={setNodeRef}
            style={{
                ...style,
                padding: "10px",
                cursor: "grab",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#fff",
            }}
            {...listeners}
            {...attributes}
        >
            {children}
        </div>
    );
}

export default App;