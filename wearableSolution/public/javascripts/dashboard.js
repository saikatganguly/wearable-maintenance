/**
 * New node file
 */
(function() {
	//$("#assignbutton_id").on('click',modelOpen);
}());

function showTaskDetails(id){
	$('#detail_task_id').val(id);
	$('#task_detail_form').submit();
	
}
function assignTask(){
	
	var asignData={
			taskId:$('#taskList_select').val(),
			userId:$('#userList_select').val(),
	}
	$.ajax({
        type: 'post',
        data:asignData,
        url: '/task/assigntask' 
    }).done(function( response ) {
    	 if (response.msg=="success") {
    		 $('#alert_title').text('Success');
    		 $('#model_content').text('Task assigned successfully!!!');
    		 $("#myModal2").modal('show');
	        }
	        else {
	        	$('#alert_title').text('Failure');
	        	$('#model_content').css('color','red');
	        	$('#model_content').text('Task Not assigned successfully!!!');
	    		 $("#myModal2").modal('show');
	            //alert('Error: ' + response.msg);

	        }
    });
	
}
/*function modelOpen(){ 
	$('#alert_title').text('Success');
	$('#model_content').text('Task assigned successfully!!!');
	 $("#myModal2").modal('show');
}*/
function closeModel(){
	$("#myModal2").modal('hide');
}