jQuery(document).ready(function() {
    $(".create_new_pickup_times").click(function(){
	    $("#particular_day_list").append('<div class="addtimeBox groupImeBox"><span class="removeTimebox"><img src="images/icons/close-black.svg" alt="Close"></span><div class="timeRow"><div class="time_col"><div class="addtimeBoxInner"><label>Minutes</label><div class="timesetup"><div class="minus-time time-add-remove"><img src="images/icons/minus-black.svg" alt="minus"></div><div class="time_inp"><input type="number" class="inputMins" placeholder="00"> <span>mins.</span></div><div class="plus-time time-add-remove"><img src="images/icons/plus-black.svg" alt="Plus"></div></div></div></div><div class="time_col"><div class="addtimeBoxInner"><label>Day</label><div class="timesetup selectOpt"><select name="daySet" class="daySet"><option value="Sunday">Sunday</option><option value="Monday">Monday</option><option value="Tuesday">Tuesday</option><option value="Wednesday">Wednesday</option><option value="Thursday">Thursday</option><option value="Friday">Friday</option><option value="Saturday">Saturday</option></select></div></div></div><div class="time_col"><div class="addtimeBoxInner"><label>Start Time</label><div class="timesetup selectOpt"><select name="daySet" class="daySet"><option value="05:00 PM">05:00 PM</option><option value="06:00 PM">06:00 PM</option><option value="07:00 PM">07:00 PM</option><option value="08:00 PM">08:00 PM</option><option value="09:00 PM">09:00 PM</option><option value="10:00 PM">10:00 PM</option><option value="11:00 PM">11:00 PM</option><option value="12:00 PM">12:00 PM</option></select></div></div></div><div class="time_col"><div class="addtimeBoxInner"><label>End Time</label><div class="timesetup selectOpt"><select name="daySet" class="daySet"><option value="05:00 PM">05:00 PM</option><option value="06:00 PM">06:00 PM</option><option value="07:00 PM">07:00 PM</option><option value="08:00 PM">08:00 PM</option><option value="09:00 PM">09:00 PM</option><option value="10:00 PM">10:00 PM</option><option value="11:00 PM">11:00 PM</option><option value="12:00 PM">12:00 PM</option></select></div></div></div></div></div>');
        resetClickAction();
        enableSubmit();
    });
    
    $('.confirmDeletePickupTimes').click(function(){
        jQuery(".confirm_delete_pickup_times").hide();
        jQuery(".addtimeBox.remove_data").remove();
        enableSubmit();
   });
    $('.noDeletePickupTimes').click(function(){
        jQuery(".confirm_delete_pickup_times").hide();
        jQuery(".addtimeBox").removeClass("remove_data");
   });
   $(".btn-submit").click(function(e){
        showNotification();
   });
   resetClickAction();
});

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function resetClickAction(){
    $('.removeTimebox').click(function(){
        $(this).parent().addClass("remove_data");
        jQuery(".confirm_delete_pickup_times").show();
    });

    $(".inputMins").on('input', function(e){
        enableSubmit();
    });
    $(".daySet").on('change', function(e){
        enableSubmit();
    });

    $(".plus-time").click(function(e){
        var curVal = $(this).prev().find("input").val();
        if(curVal == '') curVal = 0;
        curVal++;
        $(this).prev().find("input").val(pad(curVal, 2));
        enableSubmit();
    });

    $(".minus-time").click(function(e){
        var curVal = $(this).next().find("input").val();
        if(curVal == '') curVal = 0;
        if(curVal > 0) curVal --;
        $(this).next().find("input").val(pad(curVal, 2));
        enableSubmit();
    });
}

function enableSubmit(){
    $(".btn-submit").removeClass('inactive');
}