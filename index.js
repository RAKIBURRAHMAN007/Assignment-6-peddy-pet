
// fetch category btn
const loadCategory = async () => {
    const url=`https://openapi.programming-hero.com/api/peddy/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.categories);
   

};
//  fetch category btn data 
const categoryBtnDataLoad = async (category) => {
    const url=`https://openapi.programming-hero.com/api/peddy/category/${category}`;
    const res = await fetch(url);
    const data = await res.json();
    categoryBtnDataDisplay(data);

}






// Function to reset all category buttons
const resetCategoryButtons = () => {
    const buttons = document.querySelectorAll('#category-btn-container button');
    buttons.forEach(button => {
        button.classList.remove('rounded-full', 'bg-[#0E7A81]', 'bg-opacity-15', 'border-[#0E7A81]'); 
        button.classList.add('bg-white'); 
    });
};

// showing category button
const displayCategory = (categories) => {
    const categorieContainer = document.getElementById('category-btn-container');
    categorieContainer.innerHTML = ''; 

    for (let data of categories) {
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button id="btn-${data.id}" class="btn h-[75px] w-40 bg-white border"> 
            <img src="${data.category_icon}" /> ${data.category}
        </button>`;
        categorieContainer.append(buttonContainer);
    }

    for (let data of categories) {
        document.getElementById(`btn-${data.id}`).addEventListener('click', () => {
            resetCategoryButtons(); 
            const currentButton = document.getElementById(`btn-${data.id}`);
            currentButton.classList.add('rounded-full', 'bg-[#0E7A81]', 'bg-opacity-15', 'border-[#0E7A81]' ); 
            
            categoryBtnDataLoad(data.category);
        });
    }
};



// display data by catergory btn
const categoryBtnDataDisplay = (data) => {
  
   const spin = document.getElementById('spiner');
   const allCardContainer=document.getElementById('all-card-container');
 
   
   allCardContainer.innerHTML = `
    <div class="m-auto lg:ml-96 md:ml-64">
      <div  id="spiner" class="loader block"></div>

    </div>
     
     
   `;

   
   
    if(data.data.length !== 0){
       
        console.log(data)
        allCardContainer.classList.add('grid');
        setTimeout( () => {
            
            displayAllPets(data.data);
            spin.classList.add('hidden'); 
           
        }, 3000); 
    }
    else{

        setTimeout( () => {
            
            displayBird();
            spin.classList.add('hidden');
            
        }, 3000); 
       

    }
    
  

};

const displayBird =() =>{
    const allCardContainer = document.getElementById('all-card-container');
    allCardContainer.innerHTML = '';
    allCardContainer.classList.remove('grid')
    const bird=document.createElement('div');
    bird.innerHTML=`
     <div  class="text-center w-full h-96">
          <div id="bird" class="h-full bg-gray-300 rounded border md:pr-3 pt-2 md:pl-2 lg:pl-2 gap-3 pb-2 ">
            <div class="flex justify-center pt-3 ">
              <img class="" src="images/error.webp" alt="">
            </div>
            <h1 class="font-bold  text-2xl m-7">No Information Available</h1>
            <p class="text-xs md:text-base lg:text-base">We apologize for the inconvenience, but it seems that there are currently no available pets in this category. Please check back later, as our listings are frequently updated with new furry friends looking for a loving home.</p>
  
          </div>
         </div>
         `;

         
         allCardContainer.append(bird);
         
       
         
    
};
let allPets = [];

const loadAllPets = async () => {
    const spinner = document.getElementById('spiner');
    const allCardContainer = document.getElementById('all-card-container');

    setTimeout(async () => {
        const url = 'https://openapi.programming-hero.com/api/peddy/pets';
        const res = await fetch(url);
        const data = await res.json();

        allPets = data.pets; 
        console.log('Pets loaded:', allPets); 
        displayAllPets(allPets); 
        spinner.classList.add('hidden'); 
        
        document.getElementById('sort-button').addEventListener('click',function(event){
             event.preventDefault();
             sorted(allPets)  ; 
            
        })
        
        spinner.classList.add('hidden'); 
    }, ); 
};

const sorted = (pets) =>{
    const allCardContainer=document.getElementById('all-card-container');
    allCardContainer.classList.add('grid');
    const sorted= pets.sort((a, b) => b.price - a.price);
    displayAllPets(sorted)
    console.log('hello')


}







// showing all pets
const displayAllPets = (pets) => {

    const allCardContainer=document.getElementById('all-card-container');
    allCardContainer.innerHTML = '';

    for(let pet of pets){
        

        const petCard = document.createElement('div');
        petCard.innerHTML=`
        <div class="card bg-base-100  shadow-xl">
          <figure class="px-5 pt-5 ">
             <img class="w-full h-[180px] bg-cover rounded-md"
            src="${pet.image}"
            
            class="rounded-xl" />
          </figure>
          <div class="card-body ">
             <h2 class="card-title">${pet.pet_name}</h2>
             <div class="flex gap-1 items-center">
                <img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=52624&format=png&color=000000" />
                <h1>Breed: ${pet.breed || 'Not available'}</h1>
             </div>
             <div class="flex gap-1 items-center">
                <img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=84997&format=png&color=000000" />
                <h1>Birth: ${pet.date_of_birth || 'Not available'}</h1>
             </div>
             <div class="flex gap-1 items-center">
                <img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=11780&format=png&color=000000" />
                <h1>Gender: ${pet.gender || 'Not available'}</h1>
             </div>
              <div class="flex gap-1 items-center">
                <img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=85843&format=png&color=000000" />
                <h1>Price: ${pet.price || 'Not available '}</h1>
             </div>
             <hr>
             <div class=" flex gap-[2px] justify-between">
             
             <button id="like-${pet.petId}"  class="btn bg-white rounded-xl border text-[#0E7A81] border-[#0E7A81]"><img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=U6uSXVbuA1xU&format=png&color=000000" /></button>
             <button id="adoptBtn-${pet.petId}" class="btn bg-white rounded-xl border text-[#0E7A81] border-[#0E7A81]">Adopt</button>
             <button  id="details-${pet.petId}" class="btn btn-primary bg-white rounded-xl border text-[#0E7A81] border-[#0E7A81]">Details</button>
              </div>
            </div>
            
        </div>
        
        
        `;
        
        allCardContainer.append(petCard)
    }
    for (let pet of pets) {
        const likeButton = document.getElementById(`like-${pet.petId}`);
        const detailsButton=document.getElementById(`details-${pet.petId}`);
        const adoptBtn = document.getElementById(`adoptBtn-${pet.petId}`);
        likeButton.addEventListener('click', () => {
            addToLike(pet);
        });
        detailsButton.addEventListener('click', () => {
            showPetDetails(pet);
            my_modal_1.showModal();
          

        })
        adoptBtn.addEventListener('click', () => {
        
            
            showAdoptBtn(pet);
            my_modal_2.showModal();
            setTimeout( () => {
                
                const modalContainer=document.getElementById('adopt-modal');
                modalContainer.innerHTML = '';
                modalContainer.classList.remove('hidden') 
        
            }, 3000); 
            adoptBtn.style.backgroundColor='white';
            // adoptBtn.style.color='white';
            adoptBtn.style.opacity='35%';
            adoptBtn.classList.add('disabled');
           
            
         
            
            

        })
        
    }

};

; 




// press like and add to like section
const addToLike = (pet) => {
    const likeContainer= document.getElementById('like-container');
    const likeImgDiv= document.createElement('div');
    likeImgDiv.innerHTML=`
     <img class="rounded " src="${pet.image}" />
    
    `;
    likeContainer.append(likeImgDiv);

};
// adopt modal
const showAdoptBtn = (pet) => {
    const modalDiv = document.createElement('div');

    modalDiv.innerHTML = `
       <dialog id="my_modal_2" class="modal">
       <div class="modal-box">
          <div class="flex justify-center">
             <img class="" src="https://img.icons8.com/?size=100&id=q6BlPrJZmxHV&format=png&color=000000" />
          </div>
          <br>
          <div class="flex justify-center m-auto">
              <h2 class="text-2xl font-bold">Adoption Process Is Start For Your Pet</h2> 
          </div>
          <br>
          <div id="countDown" class="">
          </div>       
          <div class="modal-action w-full">
          </div>
       </div>
     </dialog>
    `;

    const modalContainer = document.getElementById('adopt-modal');
    modalContainer.innerHTML = '';
    modalContainer.append(modalDiv); 

    
    const countContainer = document.getElementById('countDown');
    
    
    let count = 3;
    const countdownInterval = setInterval(() => {
        countContainer.innerHTML = ''; 
        const h = document.createElement('div');
        h.innerText = count; 
        h.className = 'text-6xl font-bold text-center';
        countContainer.append(h);

        count--; 
        if (count < 1) {
            clearInterval(countdownInterval); 
         
        }
    }, 900); 
};


// press detail button and show modal 
const showPetDetails = (pet) => {
    const modalDiv = document.createElement('div');
  
    console.log(pet.image)
    modalDiv.innerHTML=`
       <dialog id="my_modal_1" class="modal">
       <div class="modal-box">
        
         
          <img class="rounded w-full" src="${pet.image}" /><br>
          <h2 class="card-title">${pet.pet_name}</h2> <br>

            <div class="grid grid-cols-2 ">
             
             <div class="flex gap-1 items-center">
                <img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=52624&format=png&color=000000" />
                <h1>Breed: ${pet.breed || 'Not available'}</h1>
             </div>
             <div class="flex gap-1 items-center">
                <img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=84997&format=png&color=000000" />
                <h1>Birth: ${pet.date_of_birth || 'Not available'}</h1>
             </div>
             <div class="flex gap-1 items-center">
                <img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=11780&format=png&color=000000" />
                <h1>Gender: ${pet.gender || 'Not available'}</h1>
             </div>
              <div class="flex gap-1 items-center">
                <img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=85843&format=png&color=000000" />
                <h1>Price: ${pet.price || 'Not available '}</h1>
             </div>
             <div class="flex gap-1 items-center">
                <img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=I2wEX3nUgKP1&format=png&color=000000" />
                <h1>Vaccinated Status: ${pet.vaccinated_status || 'Not available '}</h1>
             </div>  <br><br>
             
             <hr><hr> 
             
             
            </div><br>
            <div class="w-full">
               <h1 class="font-bold items-start">Deatils Information</h1>
               <br>
               <p>${pet.pet_details}</p>
            </div>
            
            
         <div class="modal-action w-full">
           <form class="w-full" method="dialog">
             <!-- if there is a button in form, it will close the modal -->
             <button class="btn  bg-white rounded-xl border text-[#0E7A81] border-[#0E7A81] w-full">Cancel</button>
           </form>
         </div>
       </div>
     </dialog>
    `
   
    const modalContainer=document.getElementById('modal');
    modalContainer.innerHTML = '';
    modalContainer.append(modalDiv);
   
    

};



loadCategory();
loadAllPets();