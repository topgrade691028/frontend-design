jQuery(document).ready(function () {
    $(".create_new_holiday_hours").click(function () {
        $("#holiday_times_list").prepend('<div class="addtime-box"><div class="add-time-tile text-gray">Holiday 3</div><div class="addtimeBox groupImeBox"><span class="removeTimebox"><img src="images/icons/close-black.svg" alt="Close"></span><div class="timeRow"><div class="time_col"><div class="addtimeBoxInner"><label>Date</label><div class="select-date orders-date"><input class="flatpickr flatpickr-input" type="text" placeholder="Select Date.." readonly="readonly"></div></div></div><div class="time_col closeCol"><a href="javescript:void(0)" class="closeALlBtn active"><span><img src="images/icons/check-black.svg"></span> Closed All Day</a></div><div class="time_col closeDayCol day-disenable"><div class="addtimeBoxInner"><label>Opening Time</label><div class="timesetup selectOpt"><select name="timeSet" class="timeSet"><option value="09:00 PM">09:00 PM</option><option value="10:00 PM">10:00 PM</option><option value="11:00 PM">11:00 PM</option><option value="12:00 PM">12:00 PM</option></select></div></div></div><div class="time_col closeDayCol day-disenable"><div class="addtimeBoxInner"><label>Closing Time</label><div class="timesetup selectOpt"><select name="timeSet" id="timeSet"><option value="06:00 PM">06:00 PM</option><option value="07:00 PM">07:00 PM</option><option value="08:00 PM">08:00 PM</option><option value="09:00 PM">09:00 PM</option><option value="10:00 PM">10:00 PM</option></select></div></div></div></div></div></div>');
        resetClickAction();
        enableSubmit();
    });

    $('.confirmDeleteHolidayHours').click(function () {
        jQuery(".confirm_delete_holiday_hours").hide();
        jQuery(".addtime-box.remove_data").remove();
        enableSubmit();
    });
    $('.noDeleteHolidayHours').click(function () {
        jQuery(".confirm_delete_holiday_hours").hide();
        jQuery(".addtime-box").removeClass("remove_data");
    });
    $(".btn-submit").click(function(){
        showNotification();
    });
    resetClickAction();
});

function resetClickAction() {
    $('.removeTimebox').click(function () {
        $(this).parent().parent().addClass("remove_data");
        jQuery(".confirm_delete_holiday_hours").show();
    });

    jQuery(".closeALlBtn").click(function () {
        jQuery(this).toggleClass("active");
        enableSubmit();
    });

    jQuery(".closeALlBtn").click(function () {
        jQuery(this).parent().siblings(".closeDayCol").toggleClass("day-disenable");
    });

    $(".flatpickr-input").on('change', function (e) {
        enableSubmit();
    });
    $(".timeSet").on('change', function (e) {
        enableSubmit();
    });
    flatpickr($('.flatpickr'), {
        defaultDate: "today"
    });
}

function enableSubmit() {
    $(".btn-submit").removeClass('inactive');
}