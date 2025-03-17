
let title= document.getElementById('title');
let price= document.getElementById('price');
let taxes= document.getElementById('taxes');
let ads= document.getElementById('ads');
let discount= document.getElementById('discount');
let total= document.getElementById('total');
let count= document.getElementById('count');
let category= document.getElementById('category');
let Submit= document.getElementById('Submit');

//                                                                   Get Total
function get_total(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value - +discount.value )
        total.innerHTML = result ;
        total.style.background = "#040" ;
    }else {
        total.innerHTML = '';
        total.style.background = "#a00d02" ;

    }
}



//                                                                  Create Product
//                                                     create Array and Save Data in Local Storage
let data = [] ;
let temp ;
let mood = 'create' ;

if(localStorage.product != null){
    data = JSON.parse(localStorage.product);
}else{
    data = [] ;
}

function object_of_array() {

    let objectofarray = {
        title : title.value.toLowerCase() ,
        price : price.value ,
        taxes : taxes.value ,
        ads : ads.value ,
        discount : discount.value ,
        total : total.innerHTML ,
        count : count.value ,
        category : category.value.toLowerCase() ,
    }
    
    // add object to array 
    // create more objects => Count
    if(mood === 'create'){

        if(objectofarray.count > 1 ){
            for(let i =0 ; i < objectofarray.count ; i++){
                data.push(objectofarray)
            }
        }else{
            data.push(objectofarray)
        }

    }else {
        data[temp] = objectofarray ;
        mood = 'create' ;
        Submit.innerHTML = 'create';
        count.style.display = 'block';
    }

    // Create and add Array to LocalStorage
    localStorage.setItem('product' , JSON.stringify(data));
    cleardata();
    showdata();
}


//                                                                  Clear Data
function cleardata (){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value ='' ;
    category.value = '';
}



//                                        Show product = Read
function showdata(){
    let table = '';
    
    for( let i=0 ; i < data.length ; i++ ){
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].discount}</td>
                <td>${data[i].total}</td>
                <td>${data[i].category}</td>
                <td><button id="update" onclick="Update(${i})">update</button></td>
                <td><button id="delete" onclick="deletedata(${i})">delete</button></td>
            </tr>
        `;

    }
    console.log(table);

    document.getElementById('tbody').innerHTML = table ;
    get_total();
}
showdata();



//  Delete
function deletedata(i){
    data.splice(i,1);   // Delete From Array
    localStorage.product = JSON.stringify(data); // Delete From Local storage
    showdata(); // Refresh Data show
}

// Delete All
let Delete_All = document.getElementById('Delete_All');

function DeleteAll(){
    localStorage.clear();   // Delete All Data From Local Storage
    data.splice(0);         // Dalete All Data From Array
    showdata();             // Refresh Data show
}

//                        Update
function Update(i){
    title.value     = data[i].title;
    price.value     = data[i].price;
    taxes.value     = data[i].taxes;
    ads.value       = data[i].ads;
    discount.value  = data[i].discount;
    category.value  = data[i].category;

    get_total();
    count.style.display = "none";
    Submit.innerHTML = 'update';
    mood = 'update' ;
    temp = i ;
    scroll({
        top:0,
        behavior: 'smooth'
    })
}




//                                               Search
let search_mood = 'Title'; 
let search = document.getElementById('search');

function Search_mood(id){
    if(id == 'search_Title'){
        search_mood = 'Title';
        search.placeholder = 'search By Title' ;
    }else{
        search_mood = 'category';
        search.placeholder = 'search By Category' ;

    }
    search.focus();
    search.value = '';
    showdata();
}


function search_Data(value){

    let table = '';

    for(let i=0 ; i< data.length ; i++ ){
        
        if(search_mood == 'Title'){
            if(data[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td><button id="update">update</button></td>
                    <td><button id="delete" onclick="deletedata(${i})" >delete</button></td>
                </tr>
            `;
            }
        }else{
                if(data[i].category.includes(value.toLowerCase())){
                    table += `
                        <tr>
                            <td>${i+1}</td>
                            <td>${data[i].title}</td>
                            <td>${data[i].price}</td>
                            <td>${data[i].taxes}</td>
                            <td>${data[i].ads}</td>
                            <td>${data[i].discount}</td>
                            <td>${data[i].total}</td>
                            <td>${data[i].category}</td>
                            <td><button id="update">update</button></td>
                            <td><button id="delete" onclick="deletedata(${i})" >delete</button></td>
                        </tr>
                    `;
                }
        }
    }
    document.getElementById('tbody').innerHTML = table ;
}