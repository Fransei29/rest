document.getElementById('fetchDogs').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/dogs');
        const dogs = await response.json();
        const dogList = document.getElementById('dogList');
        dogList.innerHTML = '';
        dogs.forEach(dog => {
            const li = document.createElement('li');
            li.textContent = `${dog.name}`;
            dogList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching dogs:', error);
    }
});

document.getElementById('fetchDogById').addEventListener('click', async () => {
    const dogId = document.getElementById('dogId').value;
    if (!dogId) {
        alert('Please enter a dog ID');
        return;
    }
    try {
        const response = await fetch(`http://localhost:3000/dogs/${dogId}`);
        if (response.status === 404) {
            document.getElementById('dogInfo').textContent = 'Dog not found';
            return;
        }
        const dog = await response.json();
        document.getElementById('dogInfo').textContent = `Name: ${dog.name}`;
    } catch (error) {
        console.error('Error fetching dog:', error);
    }
});

document.getElementById('addDog').addEventListener('click', async () => {
    const name = document.getElementById('dogName').value;
    const age = document.getElementById('dogAge').value;
    if (!name || !age) {
        alert('Please enter both name and age');
        return;
    }
    try {
        const response = await fetch('http://localhost:3000/dog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, age })
        });
        if (response.ok) {
            alert('Dog added successfully');
        }
    } catch (error) {
        console.error('Error adding dog:', error);
    }
});

document.getElementById('updateDog').addEventListener('click', async () => {
    const id = document.getElementById('updateDogId').value;
    const name = document.getElementById('updateDogName').value;
    const age = document.getElementById('updateDogAge').value;
    if (!id || !name || !age) {
        alert('Please enter ID, name, and age');
        return;
    }
    try {
        const response = await fetch(`http://localhost:3000/dog/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, age })
        });
        if (response.ok) {
            alert('Dog updated successfully');
        }
    } catch (error) {
        console.error('Error updating dog:', error);
    }
});

document.getElementById('deleteDog').addEventListener('click', async () => {
    const id = document.getElementById('deleteDogId').value;
    if (!id) {
        alert('Please enter a dog ID');
        return;
    }
    try {
        const response = await fetch(`http://localhost:3000/dog/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            alert('Dog deleted successfully');
        }
    } catch (error) {
        console.error('Error deleting dog:', error);
    }
});
