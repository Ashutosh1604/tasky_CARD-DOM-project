//parent division of cards
const taskContainer = document.querySelector(".task_container");
console.log(taskContainer);

//Array of objects to store the data to pass on the data to localStorage
let globalStore = [];

//function to create a card and insert values
const generateNewCard = (taskData) =>
  `

    <div class="col-sm-12 col-md-6  col-lg-4">


    <div class="card">
        <div class="card-header d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-success"><i class="fas fa-pencil-alt"></i></button>
            <button type="button" class="btn btn-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"><i class="fas fa-trash" id=${taskData.id}  onclick="deleteCard.apply(this,arguments)"></i></button>
        </div>
        <div class="card-body">
        <img src=${taskData.imageurl} class="card-img-top  " alt="...">
          <h5 class="card-title fw-bold text-primary"> ${taskData.tasktitle}</h5>
          <p class="card-text">${taskData.taskdescription}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      </div>        

    `;


    //after the page is refreshed
const loadInitilalData = () =>{

  //localStorage to get tasky card data
  const getCardData=localStorage.getItem("tasky");
  
  //convert the string to a normal object using parse as push only accept object
  const {cards}=JSON.parse(getCardData);
  
  //we are mapping to traverse inside array of object(cards) and get a individual object
  //we named individual object as cardObject
  cards.map((cardObject) => {
  taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));
  
  //update the global store
  globalStore.push(cardObject);
  }
  )
  
  };


  //to delete card
const deleteCard = (event) => {

  //event is happening on the window
  //window-object   ,   event-key
  event = window.event;
  //getting target id of the event
  const targetID = event.target.id;

  //tagname of the event
  const tagname= event.target.tagName;

  //filtering every card whose id is not equal to targetID(items not to delete)
  globalStore=globalStore.filter((cardObject) => cardObject.id !== targetID);
  //updating localStore with new globalStrore
  localStorage.setItem("tasky",JSON.stringify({cards: globalStore}));

  //if target is a button
  //parentNode is the keyword
  if(tagname == "BUTTON")
  {

    return taskContainer.removeChild(event.terget.parentNode.parentNode.parentNode) ;//button has 3 parents

  }
 else  //if target is the thrash icon
  {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode); //icon has 4 parents
  
  }

}



  
const saveChanges = () => {
  //collecting data in a object taskData
      const taskData = {
          id: `${Date.now()}`,
          imageurl: document.getElementById("imageURL").value,
          tasktitle: document.getElementById("taskTitle").value,
          tasktype: document.getElementById("taskType").value,
          taskdescription: document.getElementById("taskDescription").value
  
      };
  
  
    
   //inserting the card inside parent class
      taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData));
      
  //inserting the data inside the array globalStore
      globalStore.push(taskData);
  
      //localStorage is a keyword not user defined it is a API
      //it cannot take data directly it can only except data in string format so thats why we created globalStore array and the we convert it into string using JSON 
      //we have to give a keyword to our local storage as everyone is using it so we gave any key like (tasky) 
      //setItem can only except object(key value pair) so thats why we write card as a key and passed globalStore as an object
      localStorage.setItem("tasky",JSON.stringify({cards: globalStore}));
  
  };
  
