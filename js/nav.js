
/* nav */ 
function openNav() {
document.getElementsByClassName('col-1')[0].style.display ='block';

    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
	document.getElementsByClassName('col-1')[0].style.display ='none';
    document.getElementById("mySidenav").style.width = "0";
}



function toggle(){
	nav =document.getElementsByClassName('col-1')[0];
	if (nav.style.display == 'block'){
		closeNav();

	}
	else {
		openNav()
	}

}

/*____________________ */

