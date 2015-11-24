/**
 * New node file
 */
(function() {
	//$("#assignbutton_id").on('click',modelOpen);
}());

$(document).on('mouseenter', ".iffyTip", function () {
    var $this = $(this);
    if (this.offsetWidth < this.scrollWidth && !$this.attr('title')) {
        $this.tooltip({
            title: $this.text(),
            placement: "bottom"
        });
        $this.tooltip('show');
    }
}); 

function showTaskDetails(id){
	$('#detail_task_id').val(id);
	$('#task_detail_form').submit();
	
}
function assignTask(){
	
	var asignData={
			taskId:$('#taskList_select').val(),
			userId:$('#userList_select').val(),
	}
	if($('#taskList_select').val()!=0){
	$.ajax({
        type: 'post',
        data:asignData,
        url: '/task/assigntask' 
    }).done(function( response ) {
    	 if (response.msg=="success") {
    		 /*$('#task_table').bootstrapTable({
                 data: msg
             })*/
    		 $("#taskList_select option[value='"+$('#taskList_select').val()+"']").remove();
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
	
}
/*function modelOpen(){ 
	$('#alert_title').text('Success');
	$('#model_content').text('Task assigned successfully!!!');
	 $("#myModal2").modal('show');
}*/
function closeModel(){
	$("#myModal2").modal('hide');
}

function getActiveUser(authToken,taskId){
	
	$('#authToken').val(authToken);
	$('#taskId').val(taskId);
	$('#get-running-task').submit();
}