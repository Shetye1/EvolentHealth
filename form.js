"use strict";
/**created by Pratiksha Shetye
* on 25 Feb 2020
**/
var TABLE_TBODY_CLEAR='tr><td colspan="7" class="text-center">No Contact Added</td></tr>';
var TABLE_LIST=[];// To store all table data
$(document).ready(function(){
      $("#contactTable tbody").html(TABLE_TBODY_CLEAR);
});


//Add Button Click event
$("#addButton").click(function(){
    $("span.error").text("");//remove error message
    $(".borderError").removeClass("borderError");
    //initalize parameter
    var RegMOB = /^[1-9]{1}[0-9]{9}$/;
    var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let valid = true;
  
  /* name validation */ 
  if($("#first_name").val() == "")
  {
    $("#first_name_error").text("Please provide your first name.");
    $("#first_name").addClass("borderError");
    valid = false;
  }
  if($("#last_name").val() == "")
  {
    $("#last_name_error").text("Please provide your last name.");
    $("#last_name").addClass("borderError");
    valid = false;
  }
  /* mobile validation */
  if($("#mobile").val()== "")
  {
    $("#mobile-error").text("Please provide your mobile no.");
    $("#mobile").addClass("borderError");
    valid = false;
  }
  else if(!RegMOB.test($("#mobile").val()))
  {
    document.getElementById("mobile-error").innerHTML = "Please enter a valid mobile no.";
    $("#mobile").addClass("borderError");
    valid = false;
  }

  /* email validation */
  if($("#email").val() == "")
  {
    $("#email-error").text("Please provide your email id.");
    $("#email").addClass("borderError");
    valid = false;
  }
  else if(!emailReg.test($("#email").val()))
  {
    $("#email-error").text("Please enter a valid email id.");
    $("#email").addClass("borderError");
    valid = false;
  }
  //check for error message
  if(valid){
        let formData={
            first_name:$("#first_name").val(),
            last_name:$("#last_name").val(),
            mobile:$("#mobile").val(),
            email:$("#email").val(),
            status:"Active"
          };    
          let dataId= $("#addButton").attr("data-id");
          if(dataId || dataId==0){
            TABLE_LIST[dataId]=formData;     
          }
          else{
             TABLE_LIST.push(formData); 
          }
          contactAddToTable();// Add contact to Table         
          formClear();// Clear form fields
  }
});

    // Add contact to <table>
function contactAddToTable() {
      $("#contactTable tbody").html("");
      // Append product to the table
      for (let i =0; i<TABLE_LIST.length; i++) {
             $("#contactTable tbody").append(
          "<tr>" +
            "<td>" + TABLE_LIST[i].first_name + "</td>" +
            "<td>" + TABLE_LIST[i].last_name + "</td>" +
            "<td>" + TABLE_LIST[i].email + "</td>" +
            "<td>" + TABLE_LIST[i].mobile + "</td>" +
            "<td>" +
              "<button type='button' " +
                      "onclick='contactEdit(this,"+i+");' " +
                      "class='btn btn-warning btn-xs'>" +
                      "<span class='glyphicon glyphicon-pencil' />" +
              "</button>" +
            "</td>" +
            "<td>" + TABLE_LIST[i].status +
              "<button class='btn-link btn' type='button' onclick='updateStatus("+i+");'>(change)</button>"+
            "</td>" +
            "<td>" +
              "<button type='button' " +
                      "onclick='contactDelete(this,"+i+");' " +
                      "class='btn btn-danger btn-xs'>" +
                      "<span class='glyphicon glyphicon-remove' />" +
              "</button>" +
            "</td>" +
          "</tr>"
          );
      }
}

//edit contact
function contactEdit(ctl, index){
    $("#first_name").val(TABLE_LIST[index].first_name);
    $("#last_name").val(TABLE_LIST[index].last_name);
    $("#mobile").val(TABLE_LIST[index].mobile);
    $("#email").val(TABLE_LIST[index].email);
    $("#addButton").attr("data-id",index);
}

// contact status update in <table>
function updateStatus(index) {
  if(TABLE_LIST[index].status=="Active")
      TABLE_LIST[index].status="Inactive";
  else
      TABLE_LIST[index].status="Active";
  contactAddToTable();
}

// Delete contact from <table>
function contactDelete(ctl,index) {
  $(ctl).parents("tr").remove();
  TABLE_LIST.slice(index,1);
  if($("#contactTable tbody").html()=="")
     $("#contactTable tbody").html(TABLE_TBODY_CLEAR);
}

// Clear form fields
function formClear() {
 $("#first_name").val("");
 $("#last_name").val("");
 $("#mobile").val("");
 $("#email").val("");
 $("#addButton").attr("data-id",null);
}
