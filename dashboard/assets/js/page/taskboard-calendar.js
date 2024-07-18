$(function () {
    if (window.location.pathname == "/Profile/Schedule") {
        let currentAI;
        let updateCalled = 0;
        let searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has('currentAIName') === true) {
            currentAI = searchParams.get('currentAIName');
        }

        var dateObj = new Date();
        var year = dateObj.getUTCFullYear();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var month = ("0" + month).slice(-2); //months from 1-12 add a 0
        var day = dateObj.getUTCDate();
        var day = ("0" + day).slice(-2);
        var currentHours = dateObj.getHours();
        var currentHours = ("0" + currentHours).slice(-2);
        var currentMinutes = dateObj.getMinutes();
        var currentMinutes = ("0" + currentMinutes).slice(-2);
        var currentSeconds = dateObj.getSeconds();
        var currentSeconds = ("0" + currentSeconds).slice(-2);
        var formattedDate = year + "-" + month + "-" + day + "T" + currentHours + ":" + currentMinutes + ":" + currentSeconds;

        enableDrag();

        function enableDrag() {
            $('#external-events .fc-event').each(function () {
                $(this).data('event', {
                    title: $.trim($(this).text()), // use the element's text as the event title
                    stick: true // maintain when user navigates (see docs on the renderEvent method)
                });
                // make the event draggable using jQuery UI
                $(this).draggable({
                    zIndex: 999,
                    revert: true,      // will cause the event to go back to its
                    revertDuration: 0  //  original position after the drag
                });
            });
        }

        $(".save-event").on('click', function () {
            var categoryName = $('#addNewEvent form').find("input[name='category-name']").val();
            var categoryColor = $('#addNewEvent form').find("select[name='category-color']").val();

            switch (categoryColor) {
                case "general":
                    eventClass = 'bg-primary';
                    break;
                case "important":
                    eventClass = 'bg-warning';
                    break;
            }

            if (categoryName !== null && categoryName.length != 0) {
                $('#event-list').append('<div class="fc-event bg-' + categoryColor + '" data-class="bg-' + categoryColor + '">' + categoryName + '</div>');
                $('#addNewEvent form').find("input[name='category-name']").val("");
                $('#addNewEvent form').find("select[name='category-color']").val("");
                enableDrag();
            }
        });

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) { dd = '0' + dd }
        if (mm < 10) { mm = '0' + mm }

        var current = yyyy + '-' + mm + '-';
        var calendar = $('#calendar');

        // Add direct event to calendar
        var newEvent = function (start, end) {
            $('#addEventModal input[name="event-name"]').val("");
            $('#addEventModal select[name="event-bg"]')[0].selectedIndex = 0;
            $('#addEventModal input[name="event-start-date"]')[0].value = moment(start).format('YYYY-MM-DD hh:mm');
            $('#addEventModal input[name="event-end-date"]')[0].value = moment(end).format('YYYY-MM-DD hh:mm');
            $('#addEventModal').modal('show');
            $('#addEventModal .save-btn').unbind();
            $('#addEventModal .save-btn').on('click', function () {
                var saveBtn = $('#addEventModal .save-btn');
                var title = $('#addEventModal input[name="event-name"]').val();
                var classes = 'bg-' + $('#addEventModal select[name="event-bg"]').val();
                var eventType = $('#addEventModal select[name="event-bg"]').val();
                var startDate = $('#addEventModal input[name="event-start-date"]').val();
                var endDate = $('#addEventModal input[name="event-end-date"]').val();
                var taskDetails = $('#addEventModal textarea[name="event-details"]').val();

                saveBtn[0].disabled = true;

                if ((startDate != null && startDate != "") && start != startDate) {
                    start = startDate;
                }

                if (title != null && title != "") {
                    var eventData = {
                        title: title,
                        start: start,
                        end: endDate,
                        eventType: eventType,
                        AdditionInput: taskDetails,
                        className: classes
                    };

                    calendar.fullCalendar('renderEvent', eventData, true);
                    $('#addEventModal').modal('hide');
                    saveBtn[0].disabled = false;

                    eventData.start = moment(start).format('YYYY-MM-DD hh:mm');
                    eventData.end = moment(endDate).format('YYYY-MM-DD hh:mm');
                    SaveEventData(eventData);
                    location.reload();
                }
                else {
                    alert("Title can't be blank. Please try again.")
                }
            });
        }

        function GetAiTaskData(aiTaskData) {
            var aiCalTaskData = [];
            var eventData = [];

            if (aiTaskData.length > 0 && aiTaskData[0]?.eventName === null) {
                for (var task = 0; task < aiTaskData.length; task++) {
                    aiCalTaskData.push(
                        {
                            _id: aiTaskData[task].title + aiTaskData[task].assignedAIName + aiTaskData[task].start,
                            title: aiTaskData[task].title,
                            assignedAIName: aiTaskData[task].assignedAIName,
                            eventType: aiTaskData[task].eventType,
                            subTasks: aiTaskData[task].subTasks,
                            start: aiTaskData[task].start,
                            end: aiTaskData[task].end,
                            repeat: aiTaskData[task].repeat,
                            repeatDates: aiTaskData[task].repeatDates,
                            additionInput: aiTaskData[task].additionInput,
                            className: aiTaskData[task].className,
                            isComplete: aiTaskData[task].isComplete
                        }
                    );
                }
            } else {
                if (aiTaskData.length > 0) {
                    for (var eventCount = 0; eventCount < aiTaskData.length; eventCount++) {
                        var getType = aiTaskData[eventCount].eventType.split('-');
                        var eventType = getType[1];
                        var eventClass = 'bg-primary';

                        switch (eventType) {
                            case "general":
                                eventClass = 'bg-primary';
                                break;
                            case "important":
                                eventClass = 'bg-warning';
                                break;
                        }

                        eventData.push(
                            {
                                _id: aiTaskData[eventCount].eventID,
                                title: aiTaskData[eventCount].eventName,
                                start: aiTaskData[eventCount].setDate,
                                end: aiTaskData[eventCount].endDate,
                                className: eventClass,
                                eventType: eventType,
                                additionInput: aiTaskData[eventCount].eventDetails
                            }
                        );

                        $(".event_list")[0].innerHTML = "";
                        const newEventListDiv = document.createElement("div");
                        const newContent = document.createTextNode(aiTaskData[eventCount].eventName + " " + moment(aiTaskData[eventCount].setDate).format('YYYY-MM-DD hh:mm'));
                        newEventListDiv.classList.add("fc-event");
                        newEventListDiv.classList.add(eventClass);
                        newEventListDiv.appendChild(newContent);
                        $(".event_list")[0].append(newEventListDiv);
                    }
                }
            }

            //initialize the calendar
            calendar.fullCalendar(
                {
                    header: {
                        left: 'title',
                        center: '',
                        right: 'month, agendaWeek, agendaDay, prev, next'
                    },

                    editable: true,
                    droppable: true,
                    eventLimit: true,
                    selectable: true,
                    events: eventData,
                    //events: aiCalTaskData,

                    drop: function (date, jsEvent) {
                        var originalEventObject = $(this).data('eventObject');
                        var $categoryClass = $(this).attr('data-class');
                        var copiedEventObject = $.extend({}, originalEventObject);

                        copiedEventObject.start = date;
                        if ($categoryClass)
                            copiedEventObject['className'] = [$categoryClass];
                        calendar.fullCalendar('renderEvent', copiedEventObject, true);
                        // is the "remove after drop" checkbox checked?

                        if ($('#drop-remove').is(':checked')) {
                            // if so, remove the element from the "Draggable Events" list
                            $(this).remove();
                        }
                    },

                    select: function (start, end, allDay) {
                        newEvent(start, end);
                    },

                    eventClick: function (calEvent, jsEvent, view) {
                        var eventModal = $('#taskEditModal');
                        var userEventModal = $('#eventEditModal');

                        if (calEvent.assignedAIName !== undefined) {
                            eventModal.modal('show');
                            eventModal.find('input[name="edit-event-name"]').val(calEvent.title);
                            eventModal.find('input[name="edit-assigned-ai-name"]').val(calEvent.assignedAIName);
                            eventModal.find('select[name="edit-event-type"]').val(calEvent.eventType);
                            eventModal.find('input[name="edit-task-start-date"]').val(calEvent.start._i);
                            eventModal.find('label[name="edit-selected-days"]')[0].textContent = calEvent.repeatDates;
                            eventModal.find('textarea[name="edit-task-details"]')[0].textContent = calEvent.additionInput;
                        } else {
                            userEventModal.modal('show');
                            userEventModal.find('input[name="edit-event-name"]').val(calEvent.title);
                            userEventModal.find('select[name="edit-event-type"]').val(calEvent.eventType);
                            userEventModal.find('textarea[name="edit-task-details"]')[0].textContent = calEvent.additionInput;
                            userEventModal.find('input[name="edit-task-start-date"]').val(calEvent.start._i);
                            userEventModal.find('input[name="edit-task-end-date"]').val(calEvent.end._i);
                        }

                        eventModal.find('.save-btn').click(function () {
                            var title = $('#taskEditModal input[name="edit-event-name"]').val();
                            var assignedAi = $('#taskEditModal input[name="edit-assigned-ai-name"]').val();
                            var taskType = $('#taskEditModal select[name="edit-event-type"]').val();
                            var startDate = $('#taskEditModal input[name="edit-task-start-date"]').val();
                            var endDate = $('#taskEditModal input[name="edit-task-end-date"]').val();
                            var taskDetails = $('#taskEditModal textarea[name="edit-task-details"]').val();
                            var repeat = $('#taskEditModal input[name="edit-repeat"]').val();
                            var daysToRepeat = $('#taskEditModal label[name="edit-selected-days"]').text();
                            var classes = 'bg-primary';

                            switch (taskType) {
                                case "general":
                                    classes = 'bg-primary';
                                    break;
                                case "general-custom":
                                    classes = 'bg-info';
                                    break;
                                case "api":
                                    classes = 'bg-warning';
                                    break;
                                case "api-custom":
                                    classes = 'bg-danger';
                                    break;
                            }

                            var currentTask = {
                                Title: title,
                                AssignedAIName: assignedAi,
                                TaskType: taskType,
                                Start: startDate,
                                End: endDate,
                                Repeat: repeat,
                                RepeatDates: daysToRepeat,
                                AdditionInput: taskDetails,
                                ClassName: classes,
                                IsComplete: calEvent.IsComplete
                            };

                            calEvent.title = eventModal.find("input[name='edit-event-name']").val();
                            calendar.fullCalendar('updateEvent', calEvent);

                            if (updateCalled === 0) {
                                UpdateAssignedTask(currentTask);
                                updateCalled++;
                            }

                            location.reload();
                        });
                        userEventModal.find('.save-btn').click(function () {
                            var eventID = calEvent._id;
                            var eventTitle = $('#eventEditModal input[name="edit-event-name"]').val();
                            var eventTypes = $('#eventEditModal select[name="edit-event-type"]').val();
                            var eStartDate = $('#eventEditModal input[name="edit-task-start-date"]').val();
                            var eEndDate = $('#eventEditModal input[name="edit-task-end-date"]').val();
                            var eventDetails = $('#eventEditModal textarea[name="edit-task-details"]').val();
                            var eClasses = 'bg-primary';

                            switch (eventTypes) {
                                case "general":
                                    eClasses = 'bg-primary';
                                    break;
                                case "important":
                                    eClasses = 'bg-warning';
                                    break;
                            }

                            var currentEvent = {
                                EventID: eventID,
                                Title: eventTitle,
                                EventType: eventTypes,
                                Start: eStartDate,
                                End: eEndDate,
                                AdditionInput: eventDetails,
                                ClassName: eClasses
                            };

                            calEvent.title = eventModal.find("input[name='edit-event-name']").val();
                            calendar.fullCalendar('updateEvent', currentEvent);

                            if (updateCalled === 0) {
                                UpdateUserEvent(currentEvent, "Edit");
                                //UpdateAssignedTask(currentEvent);
                                updateCalled++;
                            }

                            location.reload();
                        });
                    }
                });
            updateCalled = 0;
        }

        function ErrorFunc(response) {
            window.location.replace("../Profile/Index");
        }

        function SaveEventData(eventData) {
            var newTaskFormated = {
                EventName: eventData.title,
                EventType: eventData.className,
                EventDetails: eventData.AdditionInput,
                SetDate: eventData.start,
                EndDate: eventData.end
            }

            var vform = $('#__AjaxAntiForgeryForm');
            var token = $('input[name="__RequestVerificationToken"]', vform).val();

            $.ajax({
                url: '/Profile/SaveEventData',
                type: "POST",
                data: {
                    __RequestVerificationToken: token,
                    eventData: newTaskFormated
                },
                error: function (error) {
                    console.log(`Error ${error}`);
                    ErrorFunc
                }
            });
        }

        aiTaskData = $.ajax({
            url: '/Profile/GetAiTasks',
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: {
                aiName: currentAI = currentAI == null ? "all" : currentAI
            },
            //success: GetAiTaskData,
            error: ErrorFunc
        });

        userEventData = $.ajax({
            url: '/Profile/GetCalendarEvents',
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: GetAiTaskData,
            error: ErrorFunc
        });

        function UpdateUserEvent(userSelectedEvent, actionTyp) {
            var vform = $('#__AjaxAntiForgeryForm');
            var token = $('input[name="__RequestVerificationToken"]', vform).val();

            var adjustedTaskData = {
                EventID: userSelectedEvent.EventID,
                EventName: userSelectedEvent.Title,
                EventType: userSelectedEvent.EventType,
                EventDetails: userSelectedEvent.AdditionInput,
                SetDate: userSelectedEvent.Start,
                EndDate: userSelectedEvent.End
            }

            taskData = $.ajax({
                url: '/Profile/ModEventData',
                type: "POST",
                data: {
                    __RequestVerificationToken: token,
                    userEvent: adjustedTaskData,
                    actionType: actionTyp
                },
                error: console.log("Error 500")
            });
        }
    }
});