
 function validate(){
    var userName = $("#userName").val();
	var email = $("#email").val();
	var password = $("#password").val();
	var retypepassword = $("#retypepassword").val();
	var regexEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
     
    if (userName == "") {
		$("#errUserName").text("User Name is required. ");
		$("#errUserName").focus();
		return false;
	}
    
    if (email == "") {
		$("#errEmail").text("Email is required. ");
		$("#errEmail").focus();
		return false;
	}
    if (email.trim() != "") {
		if (regexEmail.test(email.trim()) == false) {
			$("#errEmail").text("Please enter a valid email id.");
			return false;
		}
	}
    if (password == "") {
		$("#errPassword").text("Password is required");
		$("#errPassword").focus();
		return false;
	}
    if (retypepassword == "") {
    
		$("#errRetypePassword").text("Please retype password.");
		$("#errRetypePassword").focus();
		return false;
	}
    
   
	if (retypepassword != password) {
    
		$("#errRetypePassword").text("Please enter correct password.");
		$("#errRetypePassword").focus();
		return false;
	}
    return true;
 }
 
 function removeMessage(id){
	
	$("#"+id).text("");
}