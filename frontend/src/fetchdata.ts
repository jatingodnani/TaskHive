async function Adduser(data, setadduser) {
    try {
        const reqoptions = {
            type: "POST",
            header: {
                "Content-Type": "application/json"
            },
            body: data
        }

        const response = await fetch("http://localhost:8000/taskhive/task", reqoptions);
        const task = await response.json();
        setadduser(prev => [...prev, task]);
    } catch (error) {
        console.log(error);
    }

}

  