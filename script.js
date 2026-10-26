const form = document.getElementById('');
const selectType = document.getElementById('');
const selectFormat = document.getElementById('');
const fileUpload = document.getElementById('');
const sumbit = document.getElementById('');
const successMessage = document.getElementById('');
//to let the user know that their stuff has been submitted 
selectType.addEventListener('change', function() { 
    selectType.classList.add('hidden');
    selectFormat.classList.add('hidden');
    fileUpload.classList.add('hidden');
    sumbit.classList.add('hidden');
    
    
})
function handleSubSelectChange() {
    if(this.value !== '') {
        selectType.classList.remove('hidden');
        selectFormat.classList.remove('hidden');
        //idk how but I need to make the fileUpload required
    } else {//value is nothing
        selectType.classList.add('hidden');
        selectFormat.classList.add('hidden');
        
    }
}
/*
have to add an event listner so that when the user
to press submit they get an rejection message 
that notifies them that they have to pick the options if  
the deseelcted one or haven't uploaded a file
also this stuff that I'm doing is kindf of a bit too sequential
so I need to fix it by making the steps perhaps all be there already
and just do a simple if statement regarding the options before the sumbit button

*/
form.addEventListener('submit', function(event) {
    event.preventDefault();
    successMessage.classList.remove('hidden');
    //I have to find some way to reset the form
    //Maybe add a "sumbit another?" button after the user submits
    selectType.classList.add('hidden');
    selectFormat.classList.add('hidden');
    fileUpload.classList.add('hidden');
    sumbit.classList.add('hidden');
})
