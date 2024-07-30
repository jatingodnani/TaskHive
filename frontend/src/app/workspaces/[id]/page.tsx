"use client"
import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { FiAlignLeft } from "react-icons/fi";
import Taskbutton from "@/components/Taskbutton";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../redux/lib/hooks";
import { useParams, useRouter } from "next/navigation";
import { checkAuth } from "@/redux/features/userSlice";
import { FaSpinner } from "react-icons/fa";
type Task = {
    id: string;
    title: string;
    description: string;
    priority: string;
    deadline: string;
    column: string;
    createdAt: string;
};

const initialTasks: Task[] = [{
    id: "677655899",
    title: 'Sample Task',
    description: 'This is a sample task description.',
    priority: 'Medium',
    deadline: '2024-07-30',
    column: 'todo',
    createdAt: '2024-07-15T10:00:00Z'
}];

const columns = ["todo", "inprogress", "review", "done"];

function App() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const dispatch = useAppDispatch();
const {id}=useParams();
// useEffect(()=>{
// async function fetchtasks=()=>{
//     try{
//         const response=await fetch(`http://localhost:8000/:workspaceId/${id}/taska`,{
//             credentials:"include"
//         })
//         if(!response.ok){
//             throw new Error("Failed to fetch tasks")
//         }
//         const data=await response.json();
//         setTasks(data.tasks)
//     }catch{
//         console.error("Error fetching tasks")
//     }
// }
// fetchtasks();
// },[tasks]);
// console.log(tasks)
    const router = useRouter();
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
  
    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setTasks(tasks.map((task) =>
                task.id === active.id ? { ...task, column: over.id } : task
            ));
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="p-6 w-full">
                <div className="w-full bg-white flex flex-wrap  justify-center rounded-md p-4">
                    {columns.map((column) => (
                        <Column
                            key={column}
                            id={column}
                            tasks={tasks.filter((task) => task.column === column)}
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
            {tasks.map((task) => (
                <Draggable key={task.id} id={task.id}>
                    <TaskCard task={task} />
                </Draggable>
            ))}
            <Taskbutton colid={id} />
        </div>
    );
}
function TaskCard({ task }: { task: Task }) {
    const priorityColors = {
        Low: 'bg-green-500',
        Medium: 'bg-yellow-500',
        Urgent: 'bg-red-500'
    };

    const getTimeAgo = (dateString: string) => {
        const now = new Date();
        const past = new Date(dateString);
        const diffTime = Math.abs(now.getTime() - past.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">{task.title}</h2>
            <p className="text-sm text-gray-600 mb-3">{task.description}</p>
            <div className="flex justify-between items-center">
                <span className={`text-xs font-bold px-2 py-1 rounded-full text-white ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                    {task.priority}
                </span>
                <span className="text-xs text-gray-500">
                    {getTimeAgo(task.createdAt)}
                </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
                Deadline: {new Date(task.deadline).toLocaleDateString()}
            </p>
        </div>
    );
}

function Draggable({ id, children }) {
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
