function showChat(){

  	// console.log('Donesds');
//	document.getElementById("chatFrame").style.display = "none";
	$("#chatFrame").toggle();
  	// console.log('Done');
  
}

function showVote(){
	$("#voteFrame").toggle();
}

function showFileSharing(){

}

function showGame(){
	// console.log("sdjkfhdjkfhdjksd")
	$("#gameFrame").toggle();
}

window.onload = function(){
	// if(window.innerWidth <= 800){
	// 	document.getElementById("gameFrame").style.height="400px";
	// }
	// else {
	// 	document.getElementById("gameFrame").style.height="444px";
	// }
}